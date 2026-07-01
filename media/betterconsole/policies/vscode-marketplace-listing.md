# VS Code Marketplace Listing

## Extension Name

betterConsole

## Short Description

Import, group, explain, search, and export console issues from VS Code.

## Overview

betterConsole for VS Code is a local-first companion for debugging browser and application console output. It imports selected text or the active editor contents, groups repeated errors and warnings, shows likely root causes, identifies source context, provides focused fix steps, opens sanitized solution searches, and copies Markdown debug reports.

## Key Features

- Import selected console output or the active editor contents.
- Group repeated issues by sanitized message and source.
- Inspect each issue in an accordion with severity, kind, source, framework hints, root-cause notes, fix steps, search query, and sanitized output.
- Open Find Solution using Google or Bing from VS Code settings.
- Copy clean Markdown reports for GitHub Issues, Linear, Jira, Slack, Discord, email, or pull request notes.
- Keep imported logs in workspace storage until cleared.
- Use sponsor links only for ddkits GitHub Sponsors and Buy Me a Coffee.

## Privacy

The extension stores imported console text in VS Code workspace storage. It does not collect analytics, does not send logs to a server, does not run remote code, and does not load remote scripts in its webview. Find Solution opens an external browser tab with a sanitized search query.

## Support

- GitHub Sponsors: https://github.com/sponsors/ddkits
- Buy Me a Coffee: https://buymeacoffee.com/ddkits

## Package Output

`npm run package` creates:

- `release/vscode/betterConsole-vscode-v1.0.0.vsix`
