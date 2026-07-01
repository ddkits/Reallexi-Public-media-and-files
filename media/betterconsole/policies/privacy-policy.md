# betterConsole Privacy Policy

Effective date: June 30, 2026

betterConsole is a privacy-first browser extension for developers. It captures browser console activity so the user can clean, group, search, understand, and export debugging information locally.

## Data Stored Locally

betterConsole may store the following data in the user's browser storage:

- Console logs, warnings, errors, and debug messages.
- Runtime JavaScript errors and unhandled promise rejection messages.
- Failed resource load and Content Security Policy violation details where the browser exposes them.
- Stack traces, source URLs, line numbers, column numbers, page URLs, tab IDs, timestamps, and user agent strings.
- User-created issue notes, issue statuses, bookmarks, ignored patterns, settings, and generated report content.

This data is used only to provide the extension's debugging features. It is not transmitted to ddkits or any third-party server by default.

## Data Sharing

betterConsole does not collect analytics, does not sell user data, and does not transmit captured logs to a remote service. Users can choose to copy, export, download, or search with their own debugging data. Those actions are user-controlled.

## Online Search

When the user chooses Search Fix Online, betterConsole generates a sanitized query, shows it to the user for review, and opens a normal browser search tab. The extension masks common sensitive values such as bearer tokens, JWTs, cookies, API keys, email addresses, private URLs, and URL query parameters before creating the search query.

## Remote Code

betterConsole does not execute remote JavaScript or WebAssembly. All extension scripts are included in the packaged extension.

## Retention and Deletion

Captured data is retained locally according to the user's retention settings. Users can clear current-tab logs, clear all logs, ignore issues, or reset settings from the extension UI.

## Sponsor Links

The extension includes support links for GitHub Sponsors and Buy Me a Coffee. Opening these links is optional and user-controlled.

## Contact

For privacy questions or issues, use the repository issue tracker:

https://github.com/ddkits/Better-Console-Extension/issues
