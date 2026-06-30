<p align="center">
  <img src="https://github.com/ddkits/Reallexi-Public-media-and-files/raw/main/media/sqlite-editor/icons/reallexi-logo.png" alt="Reallexi LLC" width="180">
</p>

# Reallexi SQLite Editor

Reallexi SQLite Editor is a production-ready visual SQLite database editor, SQLite viewer, and SQL console for Visual Studio Code. It lets you open `.sqlite`, `.sqlite3`, `.db`, `.db3`, `.sdb`, and `.sl3` files directly inside VS Code, browse database structure, inspect tables, edit rows, run SQL queries, import data, export results, and save database changes without leaving your workspace.

Built by Reallexi LLC, the extension is designed for developers, data analysts, students, QA engineers, support teams, and anyone who needs a clean SQLite browser for local development, remote workspaces, GitHub Codespaces, and web-friendly Visual Studio Code environments. It uses SQL.js in the webview instead of native SQLite binaries, which keeps setup simple and makes the editor portable across supported VS Code hosts.

![Reallexi SQLite Editor data grid](https://github.com/ddkits/Reallexi-Public-media-and-files/raw/main/media/sqlite-editor/screenshots/sqlite-editor-data.png)

## Official Links

- **Product page:** `https://reallexi.io/sqlite-editor-vscode`
- **Repository:** `https://github.com/ReallexiLLC/sqlite-editor`
- **Issues:** `https://github.com/ReallexiLLC/sqlite-editor/issues`

## Support

- **GitHub Sponsors:** https://github.com/sponsors/ddkits
- **Buy Me a Coffee:** https://buymeacoffee.com/ddkits

## Marketplace Categories

Reallexi SQLite Editor is categorized for discoverability in the Visual Studio Code Marketplace as:

- **Data Science** - inspect, query, edit, import, and export SQLite-backed datasets.
- **Visualization** - browse table data, schema objects, indexes, triggers, views, and query results in a visual interface.
- **Other** - use a general-purpose SQLite manager, database browser, and SQL tool directly inside VS Code.

## Extension Information

- **Extension name:** `sqlite-free-editor`
- **Display name:** Reallexi SQLite Editor
- **Extension ID:** `ReallexiLLC.sqlite-free-editor`
- **Publisher:** ReallexiLLC
- **Author:** Sam Ayoub
- **Pricing:** Free
- **Marketplace status:** Production-ready, non-preview release
- **Homepage:** `https://reallexi.io/sqlite-editor-vscode`
- **Supported VS Code version:** VS Code 1.90.0 and newer
- **Primary categories:** Data Science, Visualization, Other
- **Primary search terms:** reallexi, sqlite, sqlite3, SQLite database, SQLite editor, SQLite viewer, SQLite browser, SQLite manager, SQLite GUI, free SQLite editor, database editor, database viewer, database browser, SQL editor, SQL console, SQL query, query runner, table editor, data grid, schema viewer, CSV import, CSV export, JSON export, DB file, VS Code, Visual Studio Code, GitHub Codespaces, SQL.js

## Core Features

- Open SQLite database files from VS Code Explorer or the Command Palette.
- Create new SQLite databases with supported `.sqlite`, `.sqlite3`, `.db`, `.db3`, `.sdb`, and `.sl3` extensions.
- Browse tables, views, indexes, triggers, columns, primary keys, nullability, and database schema details.
- Edit SQLite table rows in a fast spreadsheet-style data grid.
- Add rows, duplicate rows, delete rows, filter data, sort columns, and inspect values safely as text.
- Run SQL queries in an integrated SQL console and view query results inside VS Code.
- Export tables and SQL query results as CSV or JSON.
- Export the full SQLite database file for sharing, backup, or migration.
- Import SQL scripts and CSV data into an open SQLite database.
- Save, Save As, Revert, Refresh, Vacuum, Analyze, and Check Integrity from the editor toolbar or Command Palette.
- Create sidecar backups before risky database operations.
- Work without installing native SQLite modules, local SQLite CLIs, or external database servers.

## Quick Look

![Reallexi SQLite Editor demo](https://github.com/ddkits/Reallexi-Public-media-and-files/raw/main/media/sqlite-editor/screenshots/sqlite-editor-demo.gif)

## Common Workflows

### Open A SQLite Database

Click a supported SQLite file in VS Code Explorer, or run **Reallexi SQLite Editor: Open Database** from the Command Palette. The extension opens the file with a custom SQLite editor tab so you can inspect data, schema, and database metadata visually.

### Create A New Database

Run **Reallexi SQLite Editor: New Database**, choose a destination file name, and start with an empty SQLite database that can be saved and edited from VS Code.

### Browse Tables And Schema

Use the sidebar to switch between tables, views, indexes, triggers, schema information, database structure, and import/export tools. The structure view helps you understand the database layout before editing data or running SQL.

### Edit SQLite Data

Select a table, open the Data view, and use the grid to inspect rows. You can search, filter, sort, add rows, duplicate rows, delete rows, and edit individual cells while keeping save and revert behavior integrated with VS Code.

### Run SQL Queries

Open the SQL Console tab, write a query, and run it from the toolbar or with `Ctrl/Cmd + Enter`. Query results appear in the editor so you can inspect output without switching tools.

![Reallexi SQLite Editor SQL console](https://github.com/ddkits/Reallexi-Public-media-and-files/raw/main/media/sqlite-editor/screenshots/sqlite-editor-sql.png)

### Import And Export Data

Use the Import/Export view to import SQL, import CSV into a selected table, export a table as CSV, export a table as JSON, export query results, or export the full SQLite database file.

## Supported File Types

Reallexi SQLite Editor opens common SQLite database file extensions:

- `.sqlite`
- `.sqlite3`
- `.db`
- `.db3`
- `.sdb`
- `.sl3`

## Commands

| Command | Purpose |
| --- | --- |
| **Reallexi SQLite Editor: Open Database** | Opens an existing SQLite database file in the visual editor. |
| **Reallexi SQLite Editor: New Database** | Creates a new SQLite database file and opens it for editing. |
| **Reallexi SQLite Editor: Open SQL Console** | Switches the active SQLite editor to the SQL console. |
| **Reallexi SQLite Editor: Refresh Database** | Reloads schema and table data from the active database state. |
| **Reallexi SQLite Editor: Save Database** | Saves pending SQLite database changes through VS Code. |
| **Reallexi SQLite Editor: Export Database** | Exports the full database file from the active editor. |
| **Reallexi SQLite Editor: Import SQL** | Imports and runs a SQL script against the active database. |
| **Reallexi SQLite Editor: Vacuum Database** | Runs SQLite vacuum to compact and optimize the database file. |
| **Reallexi SQLite Editor: Analyze Database** | Runs SQLite analyze to refresh query planner statistics. |
| **Reallexi SQLite Editor: Check Integrity** | Runs an integrity check to verify SQLite database consistency. |

## Safety And Reliability

Reallexi SQLite Editor is built for careful database editing:

- Destructive actions ask for confirmation before they run.
- Risky operations create a sidecar backup first.
- Save, Save As, Revert, and backup behavior integrate with VS Code custom editor APIs.
- The extension validates exported database bytes before writing SQLite files.
- BLOB values are displayed as safe placeholders.
- Database values are rendered safely as text in the webview.
- The extension uses SQL.js instead of native SQLite binaries, reducing installation friction across machines and environments.

## Best For

- Developers who need a fast SQLite editor inside Visual Studio Code.
- Data analysts who want a visual SQLite viewer with SQL query support.
- QA and support teams inspecting application databases, fixture files, and local test data.
- Students learning SQL with a lightweight SQLite database browser.
- Teams working in local VS Code, remote workspaces, or GitHub Codespaces.

## Notes

- Very large databases are browsed in chunks for smoother editing.
- Advanced schema changes depend on SQLite support for the requested operation.
- Always keep a backup of production data before running destructive SQL, imports, vacuum operations, or manual row edits.

## Copyright

Copyright (c) 2026 Reallexi LLC. All rights reserved.
