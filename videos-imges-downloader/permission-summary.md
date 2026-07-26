# Permission Summary - Downloads and Screen Recording

## Required Permissions

- `activeTab` - lets the user scan or interact with the currently selected tab after an explicit action.
- `downloads` - exports user-selected files to the browser Downloads folder.
- `scripting` - injects the image scanner only after the user requests a scan.
- `sidePanel` - provides the full workspace in Chrome and Edge.
- `storage` - stores extension state and media detections.
- `tabCapture` - provides current-tab screen recording after explicit user action.
- `tabs` - reads active-tab title and URL for context.
- `unlimitedStorage` - reduces browser eviction risk for the offline media library.
- `webRequest` - observes response metadata to identify media candidates.
- `http://*/*` and `https://*/*` host access - required by Chrome and Edge for `webRequest` media detection on normal web pages.

## Host Permissions

Host access is used to observe response metadata and to scan pages after explicit user action. Image deep-link extraction reads only URLs already present in the active page markup or link parameters. Screen recording uses `tabCapture` and does not rely on host access to bypass authentication, paywalls, CORS, DRM, or site controls.

## No Remote Data Permissions

The extension does not send telemetry, analytics, saved media, browsing history, or user data to any external service.
