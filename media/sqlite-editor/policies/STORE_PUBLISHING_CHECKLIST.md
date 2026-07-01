# Store Publishing Checklist

Product: Reallexi SQLite Editor

## Generated Package

Run:

```bash
npm run package
```

The command bumps the patch version, builds the VS Code extension and webview, creates a `.vsix` package, builds the standalone browser editor, creates unpacked Chrome and Edge Manifest V3 folders, creates packed Chrome and Edge ZIPs, and refreshes the public media bundle.

Browser extension outputs:

```text
dist/browser-extensions/chrome/
dist/browser-extensions/edge/
dist/browser-extensions/sqlite-free-editor-chrome-<version>.zip
dist/browser-extensions/sqlite-free-editor-edge-<version>.zip
```

## Public Media Bundle

Publish shared store media and policy files from:

```text
media/sqlite-editor/
```

Required bundle contents:

- `icons/` for extension icons and Reallexi marks.
- `screenshots/` for store screenshots and demo media.
- `policies/` for privacy, Edge disclosure, and Chrome requirements files.
- `public-files/` for README, changelog, license, package metadata, and package artifact details.
- `browser-extensions/` for packed and unpacked Chrome and Edge extension builds.

## Support Links

- GitHub Sponsors: https://github.com/sponsors/ddkits
- Buy Me a Coffee: https://buymeacoffee.com/ddkits
