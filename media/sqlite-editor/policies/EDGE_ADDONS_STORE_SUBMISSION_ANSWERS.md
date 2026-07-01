# Microsoft Edge Add-ons Store Submission Answers

Product: Reallexi SQLite Editor

Prepared for: Microsoft Edge Add-ons Store review

Privacy policy URL: https://github.com/ddkits/Reallexi-Public-media-and-files/blob/main/media/sqlite-editor/policies/PRIVACY.md

## Single Purpose Description

Reallexi SQLite Editor provides a visual SQLite database editor for user-selected local SQLite files. It opens supported SQLite files, displays tables, schema, and database information, lets users run SQL, export CSV/JSON/database files, and download database changes locally.

## Permission Justifications

### storage justification

Not requested. The extension does not use browser storage.

### activeTab justification

Not requested. The extension does not access or inspect the active browser tab.

### tabs justification

Not requested. The popup opens the packaged editor page and support links only after explicit user clicks. It does not read, query, inspect, or monitor browser tabs.

### sidePanel justification

Not requested. The extension does not use the Microsoft Edge side panel API.

### alarms justification

Not requested. The extension does not schedule background alarms.

### downloads justification

Not requested. Database export uses local browser file downloads initiated by user action from the packaged editor page, without the browser downloads permission.

### scripting justification

Not requested. The extension does not inject scripts into websites.

### unlimitedStorage justification

Not requested. The extension does not request browser storage.

### declarativeNetRequestWithHostAccess justification

Not requested. The extension does not inspect, block, redirect, or modify browser network requests.

### Host permission justification

No host permissions are requested. The manifest does not include match patterns or content scripts. The extension works with local SQLite files selected by the user in the packaged editor page.

## Remote Code

Are you using remote code? No.

Justification: JavaScript, CSS, HTML, SQL.js, and the WebAssembly file are packaged with the extension. The extension does not load remote JavaScript or WebAssembly, does not reference external scripts, and does not use `eval()` to run downloaded code.

## Data Usage

The extension does not collect personal data from users. SQLite database content, SQL queries, imports, exports, backups, downloads, save operations, file names, and file paths remain in the user's browser session or selected local filesystem locations. The extension does not transmit user data, browsing history, location, authentication data, financial data, health data, or personal communications to Reallexi LLC.

## Certification Disclosures

- I certify that these permission disclosures are true for the submitted package.
- I certify that the extension does not use remote code.
- I certify that the privacy and data-use disclosures accurately describe the current extension behavior.
