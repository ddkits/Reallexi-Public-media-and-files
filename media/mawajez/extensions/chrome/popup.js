const SITE_URL = "https://mawajez.com";
const API_URL = `${SITE_URL}/api`;
const PREFERENCES_KEY = "mawajez:preferences";
const SETTINGS_KEY = "mawajez:extensionSettings";
const CATEGORIES = ["All", "World", "Business", "Tech", "Sports", "Entertainment", "Health", "Science"];
const INTEREST_CATEGORIES = CATEGORIES.filter((category) => category !== "All");
const LANGUAGES = [
  ["en", "English"],
  ["ar", "Arabic"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["de", "German"],
  ["it", "Italian"],
  ["pt", "Portuguese"],
  ["ru", "Russian"],
  ["zh-CN", "Chinese Simplified"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["hi", "Hindi"],
  ["tr", "Turkish"],
  ["id", "Indonesian"],
  ["vi", "Vietnamese"],
];
const api = globalThis.chrome || globalThis.browser;

const DEFAULT_PREFERENCES = {
  completed: true,
  newsLanguage: "en",
  categories: INTEREST_CATEGORIES,
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

const state = {
  preferences: { ...DEFAULT_PREFERENCES, media: { ...DEFAULT_PREFERENCES.media } },
  settings: { ...DEFAULT_SETTINGS },
  category: "All",
  query: "",
  favoritesOnly: false,
  items: [],
  favorites: [],
  lastRefresh: 0,
};

const $ = (selector) => document.querySelector(selector);
const feedEl = $("#feed");
const statusEl = $("#headlineCount");
const lastRefreshEl = $("#lastRefresh");
const template = $("#storyTemplate");

function storageGet(area, keys) {
  return new Promise((resolve) => api.storage[area].get(keys, resolve));
}

function storageSet(area, value) {
  return new Promise((resolve) => api.storage[area].set(value, resolve));
}

function storageSessionGet(keys) {
  if (!api.storage.session) return Promise.resolve({});
  return new Promise((resolve) => api.storage.session.get(keys, resolve));
}

function storageSessionSet(value) {
  if (!api.storage.session) return Promise.resolve();
  return new Promise((resolve) => api.storage.session.set(value, resolve));
}

function sendMessage(message) {
  return new Promise((resolve) => {
    if (!api.runtime?.sendMessage) {
      resolve({ ok: false });
      return;
    }
    api.runtime.sendMessage(message, (response) => resolve(response || { ok: false }));
  });
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

function timeAgo(ts) {
  if (!ts) return "";
  const minutes = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function formatRefresh(ts) {
  if (!ts) return "Not synced yet";
  return `Synced ${timeAgo(ts)}`;
}

function cacheItems(feedCache = {}) {
  const lang = state.preferences.newsLanguage;
  const articles = state.preferences.media.articles ? feedCache[`articles-${lang}`]?.items || [] : [];
  const videos = state.preferences.media.videos ? feedCache[`videos-${lang}`]?.items || [] : [];
  return [
    ...articles.map((item) => ({ ...item, kind: "Article" })),
    ...videos.map((item) => ({ ...item, kind: "Video" })),
  ].sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
}

async function savePreferences(nextPatch) {
  state.preferences = mergePreferences({
    ...state.preferences,
    ...nextPatch,
    media: { ...state.preferences.media, ...(nextPatch.media || {}) },
    updatedAt: Date.now(),
  });
  await storageSet("sync", {
    [PREFERENCES_KEY]: state.preferences,
    lang: state.preferences.newsLanguage,
  });
  await storageSet("local", { lang: state.preferences.newsLanguage });
  await sendMessage({ type: "preferencesChanged" });
}

async function saveSettings(nextPatch) {
  state.settings = { ...state.settings, ...nextPatch, updatedAt: Date.now() };
  await storageSet("sync", { [SETTINGS_KEY]: state.settings });
  await sendMessage({ type: "settingsChanged" });
}

async function loadState() {
  const [syncState, localState, sessionState] = await Promise.all([
    storageGet("sync", [PREFERENCES_KEY, SETTINGS_KEY, "lang"]),
    storageGet("local", ["favorites", "feedCache", "lastRefresh"]),
    storageSessionGet(["category", "query", "favoritesOnly", "settingsOpen"]),
  ]);

  state.preferences = mergePreferences(syncState[PREFERENCES_KEY] || { newsLanguage: syncState.lang });
  state.settings = { ...DEFAULT_SETTINGS, ...(syncState[SETTINGS_KEY] || {}) };
  state.favorites = localState.favorites || [];
  state.items = cacheItems(localState.feedCache || {});
  state.lastRefresh = localState.lastRefresh || 0;
  state.category = sessionState.category || "All";
  state.query = sessionState.query || "";
  state.favoritesOnly = Boolean(sessionState.favoritesOnly);

  $("#search").value = state.query;
  $("#favoritesOnly").className = state.favoritesOnly ? "active" : "";
  $("#settingsPanel").hidden = !sessionState.settingsOpen;
  $("#settingsToggle").className = sessionState.settingsOpen ? "active" : "";
}

function renderLanguages() {
  const select = $("#language");
  select.textContent = "";
  LANGUAGES.forEach(([id, label]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = label;
    select.appendChild(option);
  });
  select.value = state.preferences.newsLanguage;
}

function renderCategoryFilter() {
  const root = $("#categoryFilter");
  root.textContent = "";

  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = state.category === category ? "active" : "";
    button.addEventListener("click", async () => {
      state.category = category;
      await storageSessionSet({ category });
      renderCategoryFilter();
      renderFeed();
    });
    root.appendChild(button);
  });
}

function renderPreferenceCategories() {
  const root = $("#preferenceCategories");
  root.textContent = "";
  const selected = new Set(state.preferences.categories);

  INTEREST_CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = selected.has(category) ? "active" : "";
    button.addEventListener("click", async () => {
      const next = new Set(state.preferences.categories);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      await savePreferences({ categories: next.size ? [...next] : [category] });
      renderPreferenceCategories();
      renderFeed();
      await syncNow({ quiet: true });
    });
    root.appendChild(button);
  });
}

function renderSettings() {
  $("#mission").value = state.preferences.mission;
  $("#refreshMinutes").value = String(state.settings.refreshMinutes);
  $("#articlesToggle").checked = Boolean(state.preferences.media.articles);
  $("#videosToggle").checked = Boolean(state.preferences.media.videos);
  $("#notificationsToggle").checked = Boolean(state.settings.notificationsEnabled);
  renderPreferenceCategories();
}

function matches(item) {
  const selectedCategories = new Set(state.preferences.categories);
  const favoriteIds = new Set(state.favorites.map(storyId));
  const isFavorite = favoriteIds.has(storyId(item));

  if (state.favoritesOnly && !isFavorite) return false;
  if (!state.favoritesOnly && !selectedCategories.has(item.category)) return false;
  if (!state.favoritesOnly && state.category !== "All" && item.category !== state.category) return false;

  const query = state.query.trim().toLowerCase();
  if (!query) return true;

  return [item.title, item.excerpt, item.sourceName, item.source, item.category, item.kind]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function renderFeed() {
  feedEl.textContent = "";
  const lang = state.preferences.newsLanguage;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  lastRefreshEl.textContent = formatRefresh(state.lastRefresh);

  const favoriteIds = new Set(state.favorites.map(storyId));
  const limit = document.body.dataset.view === "sidepanel" ? 80 : 35;
  const sourceItems = state.favoritesOnly ? state.favorites : state.items;
  const items = sourceItems.filter(matches).slice(0, limit);
  statusEl.textContent = state.favoritesOnly ? `${items.length} saved stories` : `${sourceItems.filter(matches).length} matched stories`;

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = state.favoritesOnly
      ? "No saved stories yet. Press Save on any story or use the browser context menu."
      : state.items.length
        ? "No stories match these preferences."
        : "No cached stories yet. Press Sync to refresh Mawajez feeds.";
    feedEl.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const link = node.querySelector(".story-link");
    const fav = node.querySelector(".fav");
    const id = storyId(item);
    const saved = favoriteIds.has(id);

    link.href = item.mawajezUrl || item.url;
    node.querySelector(".source").textContent = item.sourceName || item.source || "Mawajez";
    node.querySelector(".kind").textContent = item.kind || "Article";
    node.querySelector(".title").textContent = item.title || "Untitled story";
    node.querySelector(".meta").textContent = [item.category, timeAgo(item.publishedAt)].filter(Boolean).join(" - ");
    fav.textContent = saved ? "Saved" : "Save";
    fav.className = saved ? "fav active" : "fav";
    fav.addEventListener("click", async () => {
      const currentFavoriteIds = new Set(state.favorites.map(storyId));
      state.favorites = currentFavoriteIds.has(id)
        ? state.favorites.filter((favorite) => storyId(favorite) !== id)
        : [{ ...item, id, savedAt: Date.now() }, ...state.favorites].slice(0, 250);
      await storageSet("local", { favorites: state.favorites });
      renderFeed();
    });

    feedEl.appendChild(node);
  });
}

async function readFreshCache() {
  const { feedCache = {}, lastRefresh = 0 } = await storageGet("local", ["feedCache", "lastRefresh"]);
  state.items = cacheItems(feedCache);
  state.lastRefresh = lastRefresh;
}

async function syncNow(options = {}) {
  if (!options.quiet) {
    statusEl.textContent = "Syncing feeds";
    lastRefreshEl.textContent = "Refreshing";
  }

  const response = await sendMessage({ type: "refreshFeeds", notify: false });
  await readFreshCache();
  renderFeed();

  if (!response?.ok && !options.quiet) {
    lastRefreshEl.textContent = "Using last cache";
  }
}

async function restoreSessionTab() {
  if (!api.sessions?.getRecentlyClosed) {
    lastRefreshEl.textContent = "Sessions unavailable";
    return;
  }

  const sessions = await new Promise((resolve) => api.sessions.getRecentlyClosed({ maxResults: 10 }, resolve));
  const match = sessions.find(
    (session) => session.tab?.url?.includes("mawajez.com") || session.window?.tabs?.some((tab) => tab.url?.includes("mawajez.com"))
  );

  if (!match) {
    lastRefreshEl.textContent = "No Mawajez tab found";
    return;
  }

  api.sessions.restore(match.tab?.sessionId || match.window?.sessionId);
}

function openMawajez() {
  api.tabs.create({ url: `${SITE_URL}/${state.preferences.newsLanguage}` });
}

function openSidePanel() {
  if (!api.sidePanel?.open) {
    openMawajez();
    return;
  }

  const openForWindow = (windowId) => {
    try {
      const result = api.sidePanel.open(windowId ? { windowId } : {});
      if (result?.catch) result.catch(openMawajez);
    } catch {
      openMawajez();
    }
  };

  if (api.windows?.getCurrent) {
    api.windows.getCurrent((currentWindow) => openForWindow(currentWindow?.id));
  } else {
    openForWindow();
  }
}

function bindEvents() {
  $("#openSite").addEventListener("click", openMawajez);
  $("#openPanel").addEventListener("click", openSidePanel);
  $("#syncNow").addEventListener("click", () => syncNow());

  $("#language").addEventListener("change", async (event) => {
    await savePreferences({ newsLanguage: event.target.value });
    renderLanguages();
    renderFeed();
    await syncNow({ quiet: false });
  });

  $("#search").addEventListener("input", async (event) => {
    state.query = event.target.value;
    await storageSessionSet({ query: state.query });
    renderFeed();
  });

  $("#favoritesOnly").addEventListener("click", async () => {
    state.favoritesOnly = !state.favoritesOnly;
    $("#favoritesOnly").className = state.favoritesOnly ? "active" : "";
    await storageSessionSet({ favoritesOnly: state.favoritesOnly });
    renderFeed();
  });

  $("#restoreSession").addEventListener("click", restoreSessionTab);

  $("#settingsToggle").addEventListener("click", async () => {
    const panel = $("#settingsPanel");
    panel.hidden = !panel.hidden;
    $("#settingsToggle").className = panel.hidden ? "" : "active";
    await storageSessionSet({ settingsOpen: !panel.hidden });
  });

  $("#mission").addEventListener("change", (event) => savePreferences({ mission: event.target.value }));
  $("#refreshMinutes").addEventListener("change", (event) => saveSettings({ refreshMinutes: Number(event.target.value) }));
  $("#notificationsToggle").addEventListener("change", (event) => saveSettings({ notificationsEnabled: event.target.checked }));
  $("#articlesToggle").addEventListener("change", async (event) => {
    await savePreferences({ media: { articles: event.target.checked } });
    renderFeed();
    await syncNow({ quiet: true });
  });
  $("#videosToggle").addEventListener("change", async (event) => {
    await savePreferences({ media: { videos: event.target.checked } });
    renderFeed();
    await syncNow({ quiet: true });
  });
}

async function init() {
  await loadState();
  renderLanguages();
  renderCategoryFilter();
  renderSettings();
  bindEvents();
  renderFeed();

  if (!state.items.length) {
    await syncNow({ quiet: true });
  }
}

init().catch((error) => {
  const node = document.createElement("div");
  node.className = "error-note";
  node.textContent = `Mawajez extension could not start: ${error.message}`;
  feedEl.appendChild(node);
});
