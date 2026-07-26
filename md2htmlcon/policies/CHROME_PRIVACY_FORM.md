# Chrome Web Store Privacy Form Answers

Use these answers for the Chrome Web Store Privacy practices tab for MD2HTML Converter. Keep the final submission aligned with the currently uploaded package.

## Single Purpose Description

MD2HTML Converter provides one local conversion workspace for converting Markdown to HTML and HTML to Markdown from pasted text, selected page content, current webpages, raw Markdown pages, and user-selected page elements. It includes advanced Markdown and HTML editors, live sanitized preview, diff views, copy actions, and downloads for converted output.

## Permission Justifications

activeTab:

Used only after a user action to identify the active tab and work with the page the user chose to convert or inspect. This supports current-page capture, selected-content conversion, and opening the side panel for the active browser window.

scripting:

Used to inject the packaged content script into the active tab after the user requests page capture or Mouse Reader. The script reads only the selected/current page content needed for conversion.

contextMenus:

Used to add right-click actions for converting selected text, converting the current page, and opening MD2HTML Converter.

downloads:

Used to save user-generated conversion output and diff files as `.html`, `.md`, `.txt`, `.diff`, or `.patch` files.

storage:

Used to store local extension settings and the latest captured source so the popup and side panel can continue the user's conversion session. Data is stored locally and is not sent to Reallexi servers.

sidePanel:

Used to open the converter as a Chrome side panel so users can edit, preview, diff, copy, and download conversion output while keeping the source page visible.

Optional host permissions (`http://*/*`, `https://*/*`, `file:///*`):

Requested only for the specific origin or file page the user chooses to capture. This lets the extension read page or element content for conversion without requesting always-on access to every site.

## Remote Code

Select: No, I am not using Remote code.

Justification if requested:

MD2HTML Converter does not load remote JavaScript or remote WebAssembly. All extension JavaScript is packaged with the submitted extension, and the extension page CSP uses `script-src 'self'`.

## Data Usage

Recommended checkboxes for the current Chrome extension:

- Website content
- User activity

Do not check the other categories unless the product behavior changes. The extension can process user-selected page HTML/text and pasted content, and Mouse Reader temporarily observes mouse movement/clicks while the user is choosing an element. This data is used locally for conversion and is not sent to Reallexi servers.

Certification checkboxes:

- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

## Privacy Policy URL

Publish `policies/PRIVACY.md` at a public URL and enter that URL in the Chrome Web Store form. Recommended URL pattern:

https://reallexi.io/md2htmlcon/privacy
