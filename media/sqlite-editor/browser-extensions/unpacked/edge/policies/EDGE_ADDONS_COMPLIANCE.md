# Microsoft Edge Add-ons Compliance Answers

Product: Reallexi SQLite Editor

Package types: Visual Studio Code extension (`.vsix`) and Microsoft Edge Manifest V3 extension (`.zip`)

Generated packages:

- VS Code: `sqlite-free-editor-<version>.vsix`
- Edge packed: `dist/browser-extensions/sqlite-free-editor-edge-<version>.zip`
- Edge unpacked: `dist/browser-extensions/edge/`

Owner: Reallexi LLC

Support: https://github.com/ReallexiLLC/sqlite-editor/issues

Privacy policy URL: https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/sqlite-editor/policies/PRIVACY.md

## Single Purpose Description

Reallexi SQLite Editor provides a visual SQLite database editor for user-selected local SQLite files. It opens supported SQLite files, displays tables, schema, and database information, lets users run SQL, export CSV/JSON/database files, and download database changes locally.

## Permission Justification

### storage justification

Not requested. The Edge extension stores no extension data through browser storage.

### activeTab justification

Not requested. The extension does not access browser tabs.

### tabs justification

Not requested. The popup opens the packaged editor page and sponsor links only from explicit user clicks and does not read, query, or inspect browser tabs.

### sidePanel justification

Not requested. The extension does not use the Microsoft Edge side panel API.

### alarms justification

Not requested. The extension does not schedule browser background alarms.

### downloads justification

Not requested. The extension exports files through VS Code save dialogs and workspace file APIs, not browser download APIs.

### scripting justification

Not requested. The extension does not inject scripts into websites.

### unlimitedStorage justification

Not requested. The extension does not request browser storage.

### declarativeNetRequestWithHostAccess justification

Not requested. The extension does not inspect, block, redirect, or modify browser network requests.

### Host permission justification

No browser host permissions are requested. The extension does not use match patterns or content scripts for websites. It works with local SQLite files selected by the user in the packaged browser-extension editor page.

## Remote Code

Are you using remote code? No.

Justification: The package includes its JavaScript, CSS, editor page, popup page, SQL.js dependency, and WebAssembly asset in the extension bundle. It does not load remote JavaScript or WebAssembly, does not reference external scripts, and does not use `eval()` to execute downloaded code.

## Data Usage

The extension does not collect personal data from users. It processes SQLite database files that the user opens locally, and all database viewing, SQL execution, export, download, and save operations happen in the user's browser or VS Code environment. The extension does not transmit database contents, queries, file paths, user activity, browsing history, location, authentication data, financial data, health data, or personal communications to Reallexi LLC.

## Certification Disclosures

- I certify that these permission disclosures are true for the submitted package.
- I certify that the extension does not use remote code.
- I certify that the privacy and data-use disclosures accurately describe the current extension behavior.
