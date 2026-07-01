# Microsoft Edge Add-ons Compliance Answers

Use this file to complete the Microsoft Edge Add-ons submission form for betterConsole.

## Single Purpose Description

betterConsole helps developers debug web pages by capturing browser console activity locally, following the active tab by default, grouping repeated issues, searching and filtering logs, explaining likely causes, generating sanitized debug reports, and opening user-controlled online searches for fixes.

## Permission Justification

### storage justification

Required to store captured console entries, grouped issue metadata, user settings, issue notes, ignored patterns, bookmarks, capture state, startup keep/reset preference, retention preferences, and generated report state locally in the browser. No stored data is transmitted to a remote server by default.

### activeTab justification

Required for user-initiated actions from the popup, including refreshing the packaged capture script for the current active tab when a developer wants to ensure betterConsole is running on that page.

### tabs justification

Required to identify the current active tab, refresh capture when the active tab changes, associate captured logs with the correct tab, display current-tab status, open the side panel for the active tab, and clear logs for only the current tab when requested.

### sidePanel justification

Required to provide the betterConsole side panel interface where developers search, filter, inspect grouped issues, review fix suggestions, generate reports, and manage captured console data.

### alarms justification

Required to run scheduled local retention cleanup so old logs are removed according to the user's retention settings without sending data to any server.

### downloads justification

Required only when the user exports logs or downloads a generated debug report. Exported files are created from local data and saved through the browser's download flow.

### scripting justification

Required for the user-triggered "Refresh tab" action and active-tab refresh that re-inject the packaged content script into the active tab if capture needs to be refreshed. The extension injects only scripts bundled inside the extension package.

### unlimitedStorage justification

Required to support larger local debugging sessions and longer retention settings without sending logs to a server. Data remains under the user's control and can be cleared from the extension UI.

### declarativeNetRequestWithHostAccess justification

Not requested in the manifest. betterConsole does not use declarativeNetRequestWithHostAccess.

### Host permission justification

The extension uses `<all_urls>` for its content script so it can capture console messages, runtime errors, unhandled promise rejections, failed resource loads, and CSP violations on the web pages developers choose to debug. This access is necessary for the single purpose of improving browser console debugging across sites. Captured data is stored locally.

## Remote Code

### Are you using remote code?

No.

### Justification

All JavaScript used by betterConsole is included in the extension package. The extension does not load external scripts, does not load remote modules, does not execute remote WebAssembly, and does not use `eval()` to run strings as code.

## Data Usage

### What user data do you plan to collect from users now or in the future?

betterConsole does not collect or transmit user data to ddkits or third-party servers. It stores debugging data locally in the user's browser, including console messages, errors, stack traces, source URLs, page URLs, timestamps, tab IDs, settings, capture state, issue notes, and exported report content. Users can pause capture, keep or reset logs on startup, clear, copy, export, download, or search with this data at their discretion.

## Privacy Policy URL

https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/betterconsole/policies/privacy-policy.md

## Certification

- I certify that the extension's data disclosures are accurate.
- I certify that betterConsole does not use or transfer user data for unrelated purposes.
- I certify that betterConsole does not sell user data and does not use user data for creditworthiness or lending purposes.
