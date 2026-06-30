const SITE_URL = "https://mawajez.com";
const API_URL = `${SITE_URL}/api`;
const CATEGORIES = ["All", "World", "Business", "Tech", "Sports", "Entertainment", "Health", "Science"];
const LANGUAGES = [
  ["en", "English"],
  ["ar", "العربية"],
  ["es", "Español"],
  ["fr", "Français"],
  ["de", "Deutsch"],
  ["it", "Italiano"],
  ["pt", "Português"],
  ["ru", "Русский"],
  ["zh-CN", "简体中文"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["hi", "हिन्दी"],
  ["tr", "Türkçe"],
  ["id", "Bahasa Indonesia"],
  ["vi", "Tiếng Việt"],
];
const api = globalThis.chrome || globalThis.browser;

const state = {
  lang: "en",
  category: "All",
  query: "",
  favoritesOnly: false,
  items: [],
  favorites: [],
};

const $ = (selector) => document.querySelector(selector);
const feedEl = $("#feed");
const statusEl = $("#status");
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

function storyId(item) {
  return item.id || item.mawajezUrl || item.url || item.title;
}

function timeAgo(ts) {
  if (!ts) return "";
  const minutes = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

async function loadFeed() {
  statusEl.textContent = "Loading";
  const cacheKey = `articles-${state.lang}`;
  const { feedCache = {} } = await storageGet("local", ["feedCache"]);

  try {
    const response = await fetch(`${API_URL}/${cacheKey}.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("Feed unavailable");
    state.items = await response.json();
    await storageSet("local", {
      feedCache: {
        ...feedCache,
        [cacheKey]: { savedAt: Date.now(), items: state.items },
      },
    });
  } catch {
    state.items = feedCache[cacheKey]?.items || [];
  }

  statusEl.textContent = `${state.items.length} stories`;
  renderFeed();
}

function matches(item) {
  const favIds = new Set(state.favorites.map(storyId));
  if (state.category !== "All" && item.category !== state.category) return false;
  if (state.favoritesOnly && !favIds.has(storyId(item))) return false;

  const query = state.query.trim().toLowerCase();
  if (!query) return true;
  return [item.title, item.excerpt, item.sourceName, item.category]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function renderCategories() {
  const root = $("#categories");
  root.textContent = "";

  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.className = state.category === category ? "active" : "";
    button.addEventListener("click", async () => {
      state.category = category;
      await storageSessionSet({ category });
      renderCategories();
      renderFeed();
    });
    root.appendChild(button);
  });
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
}

function renderFeed() {
  feedEl.textContent = "";
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";

  const favIds = new Set(state.favorites.map(storyId));
  const items = state.items.filter(matches).slice(0, 30);

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No matching stories.";
    feedEl.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const link = node.querySelector(".story-link");
    const fav = node.querySelector(".fav");
    const id = storyId(item);
    const saved = favIds.has(id);

    link.href = item.mawajezUrl || item.url;
    node.querySelector(".source").textContent = item.sourceName || item.source || "Mawajez";
    node.querySelector(".title").textContent = item.title;
    node.querySelector(".meta").textContent = [item.category, timeAgo(item.publishedAt)].filter(Boolean).join(" · ");
    fav.textContent = saved ? "★" : "☆";
    fav.className = saved ? "fav active" : "fav";
    fav.addEventListener("click", async () => {
      state.favorites = saved
        ? state.favorites.filter((favorite) => storyId(favorite) !== id)
        : [{ ...item, savedAt: Date.now() }, ...state.favorites].slice(0, 250);
      await storageSet("local", { favorites: state.favorites });
      renderFeed();
    });

    feedEl.appendChild(node);
  });
}

async function restoreSessionTab() {
  if (!api.sessions?.getRecentlyClosed) {
    statusEl.textContent = "Sessions unavailable";
    return;
  }

  const sessions = await new Promise((resolve) => api.sessions.getRecentlyClosed({ maxResults: 10 }, resolve));
  const match = sessions.find((session) => session.tab?.url?.includes("mawajez.com") || session.window?.tabs?.some((tab) => tab.url?.includes("mawajez.com")));

  if (!match) {
    statusEl.textContent = "No Mawajez tab";
    return;
  }

  api.sessions.restore(match.tab?.sessionId || match.window?.sessionId);
}

async function init() {
  const [{ lang = "en", favorites = [] }, sessionState] = await Promise.all([
    storageGet("local", ["lang", "favorites"]),
    storageSessionGet(["category", "query", "favoritesOnly"]),
  ]);

  state.lang = lang;
  state.favorites = favorites;
  state.category = sessionState.category || "All";
  state.query = sessionState.query || "";
  state.favoritesOnly = Boolean(sessionState.favoritesOnly);

  renderLanguages();
  $("#language").value = state.lang;
  $("#search").value = state.query;
  $("#favoritesOnly").className = state.favoritesOnly ? "active" : "";

  $("#openSite").addEventListener("click", () => api.tabs.create({ url: `${SITE_URL}/${state.lang}` }));
  $("#language").addEventListener("change", async (event) => {
    state.lang = event.target.value;
    await storageSet("local", { lang: state.lang });
    await loadFeed();
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

  renderCategories();
  await loadFeed();
}

init();
