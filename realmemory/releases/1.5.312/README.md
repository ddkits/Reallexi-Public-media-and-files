# RM AI Agent 1.5.312

This release stops the follow-up ESLint configuration repair loop observed after 1.5.311 correctly narrowed ownership to `eslint.config.js` but still allowed malformed model candidates to replace the file.

## Behavior

- The inherited malformed flat config remains the only writable target for a filename-less ESLint ESM-loader syntax failure.
- When the parser proves that one closing delimiter is missing, the harness generates a minimal local candidate and runs a read-only Node syntax check before writing it.
- Model-produced targeted replacements and whole-file candidates for that config pass the same syntax gate before mutation.
- A malformed candidate is rejected without changing disk bytes. Its bounded parser diagnostic is supplied to the next repair attempt.
- Rejected syntax candidates do not enter file recreation, so the recovery ladder cannot overwrite the config through a secondary path.
- Application files remain outside the loader-failure repair scope. The exact lint step and then the full validation bundle must pass before completion.

The installed-1.5.311 trace is the before-state evidence: ownership is correctly restricted to `eslint.config.js`, but alternating invalid candidates change the loader failure from `Unexpected token ']'` to `Unexpected identifier 'js'` and back. The new regression proves a malformed candidate is refused before either model write path reaches the filesystem.

## Validation

- Full suite: 3,141 passing and one existing POSIX-only skip on Windows.
- Focused post-package repair/handoff suite: 59 passing.
- Required `npm run package`: passed for 1.5.312.
- VSIX package-content and credential scans: passed.
- Standalone CLI publication dry-run: passed for `@reallexi/rmai@1.5.312`.
- Installed VSIX: `reallexillc.real-memory-ai-agent@1.5.312`; installed and source runtime hashes match.
- Production dependency audit: two existing high-severity findings in the Node 18 LangChain/Zod compatibility chain. This release is not described as vulnerability-free.

## Downloads

- `real-memory-ai-agent-1.5.312.vsix`
- `real-memory-browser-agent-chrome.zip`
- `real-memory-browser-agent-edge.zip`
- `reallexi-rmai-1.5.312.tgz`

Verify downloads with [SHA256SUMS](SHA256SUMS).

This patch changes validation repair safety rather than the webview layout. The current settings and Scrum/Harness screenshots remain the real source-rendered 1.5.309 evidence in the [main product guide](../../README.md).

## Publication status

- Private source commit: [`d3d3767ff2155b452b28c526cd75118dfafe22ec`](https://github.com/ddkits/Ollama-VScode-Free-Agent/commit/d3d3767ff2155b452b28c526cd75118dfafe22ec)
- Private source release: [`v1.5.312`](https://github.com/ddkits/Ollama-VScode-Free-Agent/releases/tag/v1.5.312)
- Public packages: [`rmai-v1.5.312`](https://github.com/ddkits/Reallexi-Public-media-and-files/releases/tag/rmai-v1.5.312)
- Protected GitHub build/test passed: [run 40239751284](https://github.com/ddkits/Ollama-VScode-Free-Agent/actions/runs/40239751284).
- Protected npm publication failed at the first platform package with registry E404/permission for `@reallexi/rmai-ui-linux-amd64@1.5.312`: [run 40239760368](https://github.com/ddkits/Ollama-VScode-Free-Agent/actions/runs/40239760368). The CLI is available as the release tarball above, but 1.5.312 is not claimed as npm-published.
- VS Code Marketplace publication failed with TF400813 because the configured publisher PAT is not authorized. The audited VSIX remains available above.
