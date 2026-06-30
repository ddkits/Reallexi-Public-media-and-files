# Store Publishing Checklist

Product: Reallexi SQLite Editor

## Generated Package

Run:

```bash
npm run package
```

The command bumps the patch version, builds the extension and webview, and creates a `.vsix` package.

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

## Support Links

- GitHub Sponsors: https://github.com/sponsors/ddkits
- Buy Me a Coffee: https://buymeacoffee.com/ddkits
