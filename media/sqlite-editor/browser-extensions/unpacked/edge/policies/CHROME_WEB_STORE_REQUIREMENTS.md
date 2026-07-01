# Chrome Web Store Requirements

Product: Reallexi SQLite Editor

Package types: Visual Studio Code extension (`.vsix`) and Chrome Manifest V3 extension (`.zip`)

Generated packages:

- VS Code: `sqlite-free-editor-<version>.vsix`
- Chrome packed: `dist/browser-extensions/sqlite-free-editor-chrome-<version>.zip`
- Chrome unpacked: `dist/browser-extensions/chrome/`

## Chrome Package Status

`npm run package` builds the standalone browser editor, writes a Manifest V3 Chrome extension, creates the unpacked folder, and creates the packed Chrome Web Store ZIP with `manifest.json` at the archive root.

## Single Purpose

Reallexi SQLite Editor has one purpose: provide a visual SQLite database editor for user-selected local SQLite files, with table browsing, SQL execution, CSV/JSON export, and database download.

## Manifest Requirements

- Manifest version: MV3.
- Minimum Chrome version: 109.
- Popup: packaged `popup.html`.
- Editor page: packaged `editor.html`.
- Extension CSP: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self'; base-uri 'self'; form-action 'self'`.
- Remote code: No remote JavaScript or WebAssembly.
- Host permissions: None.

## Chrome Permission Review

The Chrome package does not request browser permissions:

- `storage`: Not requested.
- `activeTab`: Not requested.
- `tabs`: Not requested.
- `sidePanel`: Not requested.
- `alarms`: Not requested.
- `downloads`: Not requested.
- `scripting`: Not requested.
- `unlimitedStorage`: Not requested.
- `declarativeNetRequestWithHostAccess`: Not requested.
- Host permissions: Not requested.

The popup opens the packaged editor page and sponsor links only from explicit user clicks. It does not request tab-reading permission.

## Remote Code

No remote code is used. JavaScript, CSS, the editor page, the popup page, SQL.js, and the WebAssembly asset are packaged with the extension. The extension does not load remote JavaScript or WebAssembly and does not execute downloaded code.

## User Data Disclosure

Reallexi SQLite Editor does not collect or transmit user data to Reallexi LLC. SQLite database content, SQL queries, imported data, exported files, backups, and save operations stay within the user's browser or VS Code environment and chosen filesystem/download locations.

## Store Asset Checklist

The public media bundle is prepared in the shared media repository under:

`media/sqlite-editor/`

It includes icons, screenshots, store policy files, package metadata, the packed Chrome and Edge ZIPs, and unpacked Chrome and Edge extension folders for publishing support.
