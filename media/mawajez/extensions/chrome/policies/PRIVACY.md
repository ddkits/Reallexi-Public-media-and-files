# Mawajez Extension Privacy Policy

Mawajez is owned by RealLexi LLC.

Public policy URL: https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/mawajez/policies/PRIVACY.md

The extension does not sell, share, or broker personal data. It stores favorites, language/category preferences, notification setting, refresh interval, temporary popup or side-panel filters, and cached Mawajez feed JSON in the browser through Chrome or Edge extension storage.

The extension requests only the permissions used by the product:

- `storage` for favorites, cached feeds, language, and session state.
- `alarms` for periodic public feed refresh.
- `contextMenus` for saving a news link from the browser menu.
- `sessions` for restoring a recently closed Mawajez tab when the user clicks Restore tab.
- `sidePanel` for opening Mawajez in the browser side panel from a user click.
- `notifications` for optional new-news alerts after the user enables them in settings.
- `host_permissions` for `https://mawajez.com/*` to fetch public Mawajez API JSON.

No content scripts are injected into websites. No page content is read unless the user explicitly saves a link from the context menu. Notifications are generated from public Mawajez feed metadata that matches the user's selected language and categories. Contact: news@reallexi.io.
