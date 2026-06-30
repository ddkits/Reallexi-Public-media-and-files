const SITE_URL = "https://mawajez.com";
const API_URL = `${SITE_URL}/api`;
const INDEXED_LANGUAGES = ["en", "ar", "es", "fr", "de", "it", "pt", "ru", "zh-CN", "ja", "ko", "hi", "tr", "id", "vi"];
const api = globalThis.chrome || globalThis.browser;

async function storageGet(keys) {
  return new Promise((resolve) => api.storage.local.get(keys, resolve));
}

async function storageSet(value) {
  return new Promise((resolve) => api.storage.local.set(value, resolve));
}

async function refreshFeeds() {
  const { feedCache = {} } = await storageGet(["feedCache"]);
  const next = { ...feedCache };

  for (const lang of INDEXED_LANGUAGES) {
    try {
      const response = await fetch(`${API_URL}/articles-${lang}.json`, { cache: "no-store" });
      if (!response.ok) continue;
      next[`articles-${lang}`] = { savedAt: Date.now(), items: await response.json() };
    } catch {
      // Keep the last successful cache.
    }
  }

  await storageSet({ feedCache: next });
}

async function saveLink(info) {
  const { favorites = [] } = await storageGet(["favorites"]);
  const url = info.linkUrl || info.pageUrl;
  if (!url) return;

  const id = `manual-${url}`;
  if (favorites.some((item) => item.id === id || item.url === url)) return;

  await storageSet({
    favorites: [
      {
        id,
        title: info.selectionText || url,
        url,
        mawajezUrl: url,
        sourceName: new URL(url).hostname.replace(/^www\./, ""),
        category: "Saved",
        savedAt: Date.now(),
      },
      ...favorites,
    ].slice(0, 250),
  });
}

api.runtime.onInstalled.addListener(async () => {
  await storageSet({ lang: "en" });
  api.contextMenus.create({
    id: "save-to-mawajez",
    title: "Save to Mawajez",
    contexts: ["link", "page", "selection"],
  });
  api.alarms.create("refresh-feeds", { periodInMinutes: 30 });
  refreshFeeds();
});

api.runtime.onStartup.addListener(refreshFeeds);
api.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "refresh-feeds") refreshFeeds();
});
api.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "save-to-mawajez") saveLink(info);
});
