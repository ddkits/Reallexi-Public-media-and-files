# Microsoft Edge Add-ons Compliance Answers

Use this file when completing the Microsoft Edge Add-ons submission form for Mawajez News Hub.

## Single Purpose Description

Mawajez News Hub provides quick browser and side-panel access to Mawajez public news feeds so users can search headlines, filter by category and language, save favorites locally, receive optional new-news notifications, and reopen Mawajez news sessions.

## Permission Justification

storage: Required to store the user's selected language, category preferences, notification setting, refresh interval, local favorites, cached public Mawajez feed JSON, popup filter state, and temporary extension session preferences in the browser.

activeTab: Not requested by the current extension manifest. The extension does not need temporary access to the active tab.

tabs: Not requested by the current extension manifest. The extension opens Mawajez pages from explicit user clicks and does not request sensitive tab metadata.

sidePanel: Required to open the same Mawajez news hub experience in the browser side panel when the user clicks the Panel button.

alarms: Required to refresh cached public Mawajez feed JSON on a periodic schedule.

notifications: Required only when the user enables new-news notifications in settings. Notifications alert the user about newly detected public Mawajez stories that match the selected language and preferred categories.

downloads: Not requested by the current extension manifest. Downloadable gallery exports are handled by the Mawajez website.

scripting: Not requested by the current extension manifest. The extension does not inject scripts into websites.

unlimitedStorage: Not requested by the current extension manifest. Cached feeds and favorites are bounded.

declarativeNetRequestWithHostAccess: Not requested by the current extension manifest. The extension does not modify, block, redirect, or observe network requests.

contextMenus: Required to provide a user-initiated "Save to Mawajez" menu for saving a page, link, or selected URL metadata into local favorites.

sessions: Required to restore a recently closed Mawajez tab when the user clicks Restore tab.

Host permission: `https://mawajez.com/*` is required so the extension can fetch public Mawajez API JSON and open Mawajez-owned public resources.

## Remote Code

No. The extension package includes all JavaScript and CSS used by the extension. It does not load remote JavaScript or WebAssembly, does not use external script tags, and does not evaluate strings through `eval()`.

## Remote Code Justification

No remote code is used. Runtime network access is limited to public Mawajez JSON feed data from `https://mawajez.com/api/`.

## Data Usage

Mawajez does not collect, sell, share, or broker personal data through the extension. The extension stores favorites, selected language, selected categories, notification setting, refresh interval, cached public feed JSON, popup or side-panel filters, and recently selected session state locally in browser storage. Saved items may include source URLs and article/video metadata chosen by the user. No account, payment, precise location, health, financial, authentication, or personal communication data is requested.

## Privacy Policy URL

https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/mawajez/policies/PRIVACY.md

## Certification Disclosures

I certify that the data usage disclosures are accurate.

I certify that Mawajez uses permissions only for the extension's stated single purpose.

I certify that the extension does not use remote code and that the packaged extension files contain all extension JavaScript and CSS.
