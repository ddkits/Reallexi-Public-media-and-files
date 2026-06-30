# Microsoft Edge Add-ons Compliance Answers

Product: Reallexi SQLite Editor

Repository package type: Visual Studio Code extension (`.vsix`)

Generated package: `sqlite-free-editor-<version>.vsix`

Owner: Reallexi LLC

Support: https://github.com/ReallexiLLC/sqlite-editor/issues

Privacy policy URL: https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/sqlite-editor/policies/PRIVACY.md

## Single Purpose Description

Reallexi SQLite Editor provides a visual SQLite database editor inside Visual Studio Code. It opens supported SQLite files, displays tables, schema, and database information, lets users edit rows, run SQL, import SQL or CSV data, export CSV/JSON/database files, and save database changes from the VS Code workspace.

## Permission Justification

### storage justification

Not requested in a Microsoft Edge or Chromium extension manifest. The current package is a VS Code extension and uses VS Code APIs for editor state and file operations.

### activeTab justification

Not requested. The extension does not access browser tabs.

### tabs justification

Not requested. The extension does not read, create, update, or query browser tabs.

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

No browser host permissions are requested. The extension does not use match patterns or content scripts for websites. It works with local or workspace SQLite files selected by the user in Visual Studio Code.

## Remote Code

Are you using remote code? No.

Justification: The package includes its JavaScript, CSS, webview code, and SQL.js dependency in the extension bundle. It does not load remote JavaScript or WebAssembly, does not reference external scripts, and does not use `eval()` to execute downloaded code.

## Data Usage

The extension does not collect personal data from users. It processes SQLite database files that the user opens in Visual Studio Code, and all database editing, import, export, backup, and save operations happen through the user's VS Code workspace or save dialogs. The extension does not transmit database contents, queries, file paths, user activity, browsing history, location, authentication data, financial data, health data, or personal communications to Reallexi LLC.

## Certification Disclosures

- I certify that these permission disclosures are true for the submitted package.
- I certify that the extension does not use remote code.
- I certify that the privacy and data-use disclosures accurately describe the current extension behavior.
