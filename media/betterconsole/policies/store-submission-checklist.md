# Store Submission Checklist

Run from the repository root:

```bash
npm install
npm run package
```

`npm run package` regenerates store media, runs lint, tests, TypeScript checking, a moderate security audit, builds the extension with readable reviewer-friendly scripts, validates required store files, and creates the Chrome and Edge packages.

## Chrome

- Upload `release/chrome/betterConsole-chrome-v1.0.0.zip`.
- Confirm `manifest.json` is at the ZIP root.
- Use `store-assets/media/betterconsole/icons/betterconsole-icon-128.png` as the listing icon.
- Upload screenshots from `store-assets/media/betterconsole/screenshots`.
- Upload promo tiles from `store-assets/media/betterconsole/promotional`.
- Use the descriptions and permission justifications in `docs/chrome-web-store-listing.md`.
- Use the privacy policy URL hosted in the public media repository.

## Edge

- Upload `release/edge/betterConsole-edge-v1.0.0.zip`.
- Confirm `manifest.json` is at the ZIP root.
- Upload icons, screenshots, promo tiles, and policy docs from the public `media/betterconsole` folder.
- Paste answers from `docs/edge-addons-compliance.md`.
- Verify remote code is disclosed as "No".

## Public Media Repository

Mirror `store-assets/media/betterconsole` to:

```text
ddkits/Reallexi-Public-media-and-files/media/betterconsole
```

Expected folders:

- `icons`
- `screenshots`
- `promotional`
- `policies`
- `shared`

## Local Install Smoke Test

- Load `release/chrome/unpacked` in Chrome.
- Load `release/edge/unpacked` in Edge.
- Open a test page and run `console.error("betterConsole smoke test")`.
- Confirm the popup shows the error.
- Open the side panel and confirm the grouped issue appears.
- Open DevTools and confirm the `betterConsole` panel appears.
- Export a debug report and verify the downloaded Markdown is sanitized.
