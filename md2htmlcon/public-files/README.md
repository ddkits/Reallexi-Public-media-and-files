# MD2HTML Converter

Convert Markdown to beautiful HTML and turn HTML back into clean Markdown directly from VS Code, Chrome, or Edge.

MD2HTML Converter helps you preview, edit, compare, copy, and export converted content without leaving your editor or browser.

Built by Reallexi — https://reallexi.io

![Converter UI](assets/screenshots/converter-ui.png)

## Why Use MD2HTML Converter?

MD2HTML Converter is built for developers, writers, editors, and content teams who move between Markdown documents, web pages, CMS fields, and HTML snippets all day. It detects what you are working with, converts in the right direction, and gives you editing, preview, diff, copy, and export tools in one clean local interface.

## What You Can Do

- Convert Markdown to HTML with GitHub-flavored Markdown support.
- Convert HTML and webpages back to Markdown.
- Capture selected page content from Chrome or Edge.
- Pull the current browser page into the converter with exact-origin permission prompts.
- Use Mouse Reader to hover and click a page element, then convert just that element.
- Convert the current VS Code file or selection.
- Use advanced Markdown and HTML editors with snippet insert buttons, cleanup, and stats.
- Preview sanitized HTML safely.
- Compare source and output edits in inline or side-by-side diff views.
- Copy or export converted files as `.html`, `.md`, `.txt`, `.diff`, or `.patch`.
- Open MD2HTML quickly from VS Code Markdown/HTML status bar actions, editor menus, explorer menus, and snippets.

## Convert From VS Code

Open a Markdown or HTML file, then run one of these commands:

- `MD2HTML Converter: Open Converter`
- `MD2HTML Converter: Convert Current File`
- `MD2HTML Converter: Convert Selection`
- `MD2HTML Converter: Show Diff`
- `MD2HTML Converter: Export Converted File`

The converter opens in a VS Code webview using your editor theme. Exporting lets you save to the workspace, choose a file path, open the output in a new untitled editor, or replace the current file only after confirmation.

![VS Code webview](assets/screenshots/vscode-webview.png)

## Convert From Chrome Or Edge

Use the popup or side panel to paste content, pull the current page, convert selected text from a right-click menu, or use Mouse Reader to click one page element and capture it.

When a page needs host access, MD2HTML Converter asks for that specific origin instead of requiring broad always-on host permissions. Browser-internal pages such as `chrome://` and `edge://` cannot be captured by extensions, so paste content manually for those pages.

Context menu actions:

- `Convert selected text with MD2HTML Converter`
- `Convert current page with MD2HTML Converter`
- `Open MD2HTML Converter`

![Browser popup](assets/screenshots/browser-popup.png)
![Browser side panel](assets/screenshots/browser-side-panel.png)

## Preview, Edit, Compare, And Export

The main converter has advanced Markdown and HTML editors, a converted output editor, sanitized preview, and diff view. Editor toolbars include quick inserts for headings, links, images, code blocks, tables, task lists, HTML sections, and cleanup.

If you edit the generated output manually, MD2HTML Converter clearly marks it as `Output edited manually` and lets you reset it back to the latest generated conversion.

![Diff view](assets/screenshots/diff-view.png)

![Demo GIF](assets/gifs/demo.gif)

## Privacy-Friendly By Design

MD2HTML Converter works locally in your editor or browser. Your content is not sent to Reallexi servers for conversion.

The extensions do not include analytics or tracking. The Reallexi backlink opens only when you click it.

## Built By Reallexi

MD2HTML Converter is built by Reallexi.

Built by Reallexi — https://reallexi.io

Sponsor the work:

- GitHub Sponsors: https://github.com/sponsors/ddkits
- Buy Me a Coffee: https://www.buymeacoffee.com/ddkits

## Developer Setup

```bash
npm install
git submodule update --init --recursive
npm run clean
npm run test
npm run build
npm run package:all
npm run media:sync
```

Generated packages:

- `dist/vscode/md2html-converter-<version>.vsix`
- `dist/vscode/md2html-converter-<version>-unpacked/`
- `dist/chrome/md2html-converter-chrome-<version>.zip`
- `dist/chrome/md2html-converter-chrome-<version>-unpacked/`
- `dist/edge/md2html-converter-edge-<version>.zip`
- `dist/edge/md2html-converter-edge-<version>-unpacked/`

Versioning is guarded and automatic: root commands such as `npm run test`, `npm run build`,
`npm run compile`, and `npm run package:all` bump the patch version once, sync workspace package
versions and browser manifests, and add a CHANGELOG placeholder. Nested build scripts receive
`MD2HTML_VERSION_BUMPED=1` so one root command does not create multiple version bumps.

Public media is mounted as a Git submodule at `media/` from
`https://github.com/ddkits/Reallexi-Public-media-and-files.git`. Run `npm run media:sync` to mirror
MD2HTML Converter icons, screenshots, GIFs, store metadata, and policy files into
`media/md2htmlcon/`.
