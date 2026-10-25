# RM AI Agent 1.5.311

This release fixes a validation-repair loop in which ESLint stopped in Node's ESM loader without printing the configuration filename, then repeated model repairs against unrelated application files.

## Behavior

- The harness recognizes an ESLint version line, a syntax error, and Node module-loader frames as a configuration-load failure rather than an application lint result.
- A read-only `node --check` runs only against existing `eslint.config.js`, `eslint.config.mjs`, and `eslint.config.cjs` files in the executing package and its ancestors.
- When exactly one malformed config is proven, its complete workspace-relative path and parser diagnostic become the persisted failure identity.
- Diagnosis and repair receive that config's current source, and the write boundary permits only that file.
- Application source is outside the repair scope until ESLint can load its configuration and report an actual source diagnostic.
- The exact failed lint step must pass first; the full validation bundle still runs before completion.
- Ambiguous or unproven configurations remain blocked for evidence instead of triggering a guessed write.

The user-provided installed-1.5.310 trace is the before-state evidence. It shows `SyntaxError: Unexpected token ']'` from `compileSourceTextModule`, followed by attempted repairs to `frontend/src/App.jsx`, `backend/src/services/validatorService.ts`, and `frontend/src/services/api.js`. Read-only inspection proved the actual cause was the inherited root `eslint.config.js`, whose final configuration object was missing its closing brace. The user's application was not modified during this extension repair.

## Validation

- New deterministic syntax-localization regression: passed.
- Full suite: 3,139 passing and one existing POSIX-only skip on Windows.
- Focused post-package suite: 23 passing.
- Required `npm run package`: passed.
- VSIX package-content and credential scans: passed.
- Standalone CLI publication dry-run: passed for `@reallexi/rmai@1.5.311`.
- Installed VSIX: `reallexillc.real-memory-ai-agent@1.5.311`; bundled runtime hash matches the source build.
- Production dependency audit: two existing high-severity findings in the Node 18 LangChain/Zod compatibility chain. This release is not described as vulnerability-free.

## Downloads

- `real-memory-ai-agent-1.5.311.vsix`
- `real-memory-browser-agent-chrome.zip`
- `real-memory-browser-agent-edge.zip`
- `reallexi-rmai-1.5.311.tgz`

Verify downloads with [SHA256SUMS](SHA256SUMS).

This patch changes validation diagnosis and repair ownership, not the webview layout. The current settings and Scrum/Harness screenshots remain the real source-rendered 1.5.309 evidence. See the [main product guide](../../README.md) for those images and setup instructions.

## Publication status

- Private source commit: [`a131929984f23e21bc665b4ef76e3707bbeb66e1`](https://github.com/ddkits/Ollama-VScode-Free-Agent/commit/a131929984f23e21bc665b4ef76e3707bbeb66e1)
- Private source release: [`v1.5.311`](https://github.com/ddkits/Ollama-VScode-Free-Agent/releases/tag/v1.5.311)
- Public packages: [`rmai-v1.5.311`](https://github.com/ddkits/Reallexi-Public-media-and-files/releases/tag/rmai-v1.5.311)
- Protected CI, npm and Marketplace outcomes are added after those workflows finish. Local validation and a registry dry-run do not prove a registry or Marketplace publication.
