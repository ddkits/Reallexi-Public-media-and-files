# Mawajez Extension Privacy Policy

Mawajez is owned by RealLexi LLC.

Public policy URL: https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/mawajez/policies/PRIVACY.md

The extension does not sell, share, or broker personal data. It stores favorites, language preference, temporary popup filters, and cached Mawajez feed JSON in the browser through `chrome.storage.local` and `chrome.storage.session`.

The extension requests only the permissions used by the product:

- `storage` for favorites, cached feeds, language, and session state.
- `alarms` for periodic public feed refresh.
- `contextMenus` for saving a news link from the browser menu.
- `sessions` for restoring a recently closed Mawajez tab when the user clicks Restore tab.
- `host_permissions` for `https://mawajez.com/*` to fetch public Mawajez API JSON.

No content scripts are injected into websites. No page content is read unless the user explicitly saves a link from the context menu. Contact: news@reallexi.io.
