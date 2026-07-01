const SITE_URL = "https://mawajez.com";
const API_URL = `${SITE_URL}/api`;
const PREFERENCES_KEY = "mawajez:preferences";
const SETTINGS_KEY = "mawajez:extensionSettings";
const INDEXED_LANGUAGES = ["en", "ar", "es", "fr", "de", "it", "pt", "ru", "zh-CN", "ja", "ko", "hi", "tr", "id", "vi"];
const CATEGORIES = ["World", "Business", "Tech", "Sports", "Entertainment", "Health", "Science"];
const api = globalThis.chrome || globalThis.browser;

const DEFAULT_PREFERENCES = {
  completed: true,
  newsLanguage: "en",
  categories: CATEGORIES,
  mission: "daily-briefing",
  media: {
    articles: true,
    videos: true,
    gallery: true,
    downloads: true,
  },
};

const DEFAULT_SETTINGS = {
  notificationsEnabled: false,
  refreshMinutes: 15,
};

function storageGet(area, keys) {
  return new Promise((resolve) => api.storage[area].get(keys, resolve));
}

function storageSet(area, value) {
  return new Promise((resolve) => api.storage[area].set(value, resolve));
}

function mergePreferences(saved = {}) {
  return {
    ...DEFAULT_PREFERENCES,
    ...saved,
    categories: Array.isArray(saved.categories) && saved.categories.length ? saved.categories : DEFAULT_PREFERENCES.categories,
    media: { ...DEFAULT_PREFERENCES.media, ...(saved.media || {}) },
    completed: true,
  };
}

function storyId(item) {
  return String(item?.id || item?.mawajezUrl || item?.url || item?.title || "");
}

function storyUrl(item) {
  return item.mawajezUrl || item.url || SITE_URL;
}

function matchesPreferences(item, preferences) {
  return preferences.categories.includes(item.category);
}

async function loadPreferences() {
  const data = await storageGet("sync", [PREFERENCES_KEY, SETTINGS_KEY, "lang"]);
  const preferences = mergePreferences(data[PREFERENCES_KEY] || { newsLanguage: data.lang });
  const settings = { ...DEFAULT_SETTINGS, ...(data[SETTINGS_KEY] || {}) };
  return { preferences, settings };
}

async function fetchFeed(kind, lang) {
  const response = await fetch(`${API_URL}/${kind}-${lang}.json`, { cache: "no-store" });
  if (!response.ok) throw new Error(`${kind}-${lang} unavailable`);
  const items = await response.json();
  return items.map((item) => ({ ...item, kind: kind === "videos" ? "Video" : "Article" }));
}

function setBadge(count) {
  if (!api.action?.setBadgeText) return;
  const text = count > 0 ? String(Math.min(count, 99)) : "";
  api.action.setBadgeText({ text });
  api.action.setBadgeBackgroundColor?.({ color: "#ff7a2f" });
}

async function createNewsNotification(item, newCount, preferences) {
  if (!api.notifications?.create) return;

  const id = `mawajez-${Date.now()}-${Math.abs(storyId(item).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0))}`;
  const { notificationLinks = {} } = await storageGet("local", ["notificationLinks"]);

  await storageSet("local", {
    notificationLinks: {
      ...notificationLinks,
      [id]: storyUrl(item),
    },
  });

  api.notifications.create(id, {
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: item.title || "New Mawajez story",
    message: item.sourceName || item.source || "Mawajez public feed",
    contextMessage: `${newCount} new ${preferences.newsLanguage} item${newCount === 1 ? "" : "s"} in your preferences`,
    buttons: [{ title: "Open story" }, { title: "Open Mawajez" }],
    priority: 1,
  });
}

async function refreshFeeds(options = {}) {
  const { preferences, settings } = await loadPreferences();
  const lang = INDEXED_LANGUAGES.includes(preferences.newsLanguage) ? preferences.newsLanguage : "en";
  const { feedCache = {}, seenStoryIds = {} } = await storageGet("local", ["feedCache", "seenStoryIds"]);
  const nextCache = { ...feedCache };
  const fetchedItems = [];

  if (preferences.media.articles) {
    try {
      const items = await fetchFeed("articles", lang);
      nextCache[`articles-${lang}`] = { savedAt: Date.now(), items };
      fetchedItems.push(...items);
    } catch {
      fetchedItems.push(...(feedCache[`articles-${lang}`]?.items || []).map((item) => ({ ...item, kind: "Article" })));
    }
  }

  if (preferences.media.videos) {
    try {
      const items = await fetchFeed("videos", lang);
      nextCache[`videos-${lang}`] = { savedAt: Date.now(), items };
      fetchedItems.push(...items);
    } catch {
      fetchedItems.push(...(feedCache[`videos-${lang}`]?.items || []).map((item) => ({ ...item, kind: "Video" })));
    }
  }

  const preferenceItems = fetchedItems.filter((item) => matchesPreferences(item, preferences));
  const seenKey = `${lang}:preference-feed`;
  const previousSeen = new Set(seenStoryIds[seenKey] || []);
  const newItems = preferenceItems
    .filter((item) => !previousSeen.has(storyId(item)))
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
  const nextSeen = [...new Set([...preferenceItems.map(storyId), ...previousSeen])].slice(0, 500);

  await storageSet("local", {
    feedCache: nextCache,
    lastRefresh: Date.now(),
    seenStoryIds: {
      ...seenStoryIds,
      [seenKey]: nextSeen,
    },
  });

  const shouldNotify = options.notify !== false && settings.notificationsEnabled && previousSeen.size > 0 && newItems.length > 0;
  setBadge(previousSeen.size > 0 ? newItems.length : 0);

  if (shouldNotify) {
    await createNewsNotification(newItems[0], newItems.length, preferences);
  }

  return { ok: true, count: preferenceItems.length, newCount: previousSeen.size > 0 ? newItems.length : 0, lang };
}

async function saveLink(info) {
  const { favorites = [] } = await storageGet("local", ["favorites"]);
  const url = info.linkUrl || info.pageUrl;
  if (!url) return;

  const id = `manual-${url}`;
  if (favorites.some((item) => item.id === id || item.url === url)) return;

  await storageSet("local", {
    favorites: [
      {
        id,
        title: info.selectionText || url,
        url,
        mawajezUrl: url,
        sourceName: new URL(url).hostname.replace(/^www\./, ""),
        category: "World",
        kind: "Saved",
        savedAt: Date.now(),
      },
      ...favorites,
    ].slice(0, 250),
  });
}

async function scheduleRefresh(settings = DEFAULT_SETTINGS) {
  if (!api.alarms?.create) return;
  await api.alarms.clear?.("refresh-feeds");
  api.alarms.create("refresh-feeds", { periodInMinutes: Number(settings.refreshMinutes) || 15 });
}

async function ensureDefaults() {
  const data = await storageGet("sync", [PREFERENCES_KEY, SETTINGS_KEY, "lang"]);
  const next = {};

  if (!data[PREFERENCES_KEY]) next[PREFERENCES_KEY] = DEFAULT_PREFERENCES;
  if (!data[SETTINGS_KEY]) next[SETTINGS_KEY] = DEFAULT_SETTINGS;
  if (!data.lang) next.lang = DEFAULT_PREFERENCES.newsLanguage;

  if (Object.keys(next).length) await storageSet("sync", next);
  await storageSet("local", { lang: data.lang || DEFAULT_PREFERENCES.newsLanguage });
  return {
    preferences: mergePreferences(data[PREFERENCES_KEY] || DEFAULT_PREFERENCES),
    settings: { ...DEFAULT_SETTINGS, ...(data[SETTINGS_KEY] || {}) },
  };
}

api.runtime.onInstalled.addListener(async () => {
  const { settings } = await ensureDefaults();

  api.contextMenus.create({
    id: "save-to-mawajez",
    title: "Save to Mawajez",
    contexts: ["link", "page", "selection"],
  });

  if (api.sidePanel?.setPanelBehavior) {
    api.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});
  }

  await scheduleRefresh(settings);
  refreshFeeds({ notify: false });
});

api.runtime.onStartup.addListener(async () => {
  const { settings } = await ensureDefaults();
  await scheduleRefresh(settings);
  refreshFeeds({ notify: true });
});

api.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refresh-feeds") refreshFeeds({ notify: true });
});

api.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "save-to-mawajez") saveLink(info);
});

api.notifications?.onClicked?.addListener(async (notificationId) => {
  const { notificationLinks = {} } = await storageGet("local", ["notificationLinks"]);
  api.tabs.create({ url: notificationLinks[notificationId] || SITE_URL });
  api.notifications.clear(notificationId);
});

api.notifications?.onButtonClicked?.addListener(async (notificationId, buttonIndex) => {
  const { notificationLinks = {} } = await storageGet("local", ["notificationLinks"]);
  api.tabs.create({ url: buttonIndex === 0 ? notificationLinks[notificationId] || SITE_URL : SITE_URL });
  api.notifications.clear(notificationId);
});

api.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "refreshFeeds") {
    refreshFeeds({ notify: message.notify !== false })
      .then(sendResponse)
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.type === "settingsChanged" || message?.type === "preferencesChanged") {
    loadPreferences()
      .then(({ settings }) => scheduleRefresh(settings))
      .then(() => refreshFeeds({ notify: false }))
      .then(sendResponse)
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  return false;
});
