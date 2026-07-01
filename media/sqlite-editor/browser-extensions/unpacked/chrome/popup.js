"use strict";

const links = {
  openEditor: chrome.runtime.getURL("editor.html"),
  githubSponsors: "https://github.com/sponsors/ddkits",
  buyCoffee: "https://buymeacoffee.com/ddkits"
};

for (const [id, url] of Object.entries(links)) {
  document.getElementById(id)?.addEventListener("click", () => {
    chrome.tabs.create({ url });
  });
}
