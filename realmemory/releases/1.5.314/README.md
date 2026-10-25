# RM AI Agent 1.5.314

This release stops the destructive preservation-retry loop visible in the installed 1.5.312 trace while keeping the source-protection guard intact.

## Behavior

- A destructive whole-file proposal still receives one bounded correction grounded in the complete current target source.
- The correction prompt explicitly warns that a `replacements[]` entry whose `oldText` covers most or all of a file is still a destructive rewrite.
- If the correction is also rejected as destructive, the harness records `Preservation correction exhausted` and parks that chunk after the first outer attempt. It no longer spends the eight-attempt 5/10/20/40/60-second cooldown ladder on unchanged requests.
- The blocker persists across automatic same-specification continuation while the protected file SHA-256 is unchanged, preventing a fresh mission from silently resetting the retry budget.
- A legitimate manual or agent edit changes the digest and reopens repair. Transient provider errors, rate limits, stalls and stale replacement anchors remain retryable.
- No rejected proposal writes application bytes or creates a review snapshot. Other independent chunks may continue.

The supplied trace is the before-state evidence: `backend/src/server.js` is repeatedly proposed as a much smaller replacement, the preservation guard rejects each initial and correction response, attempts advance through 7/8 and then an automatic continuation restarts at 1/8. The new regressions exercise both boundaries directly.

## Validation

- Full suite: 3,144 passing and one existing POSIX-only skip on Windows.
- Focused post-package runtime/package suite: 62 passing.
- Required `npm run package`: passed for 1.5.314.
- VSIX package-content and credential scans: passed.
- Standalone CLI publication dry-run: passed for `@reallexi/rmai@1.5.314`; four intended package files.
- Installed VSIX: `reallexillc.real-memory-ai-agent@1.5.314`; installed and source runtime, MCP, and credential-helper hashes match.
- Production dependency audit: two existing high-severity findings in the Node 18 LangChain/Zod compatibility chain. This release is not described as vulnerability-free.

## Downloads

- `real-memory-ai-agent-1.5.314.vsix`
- `real-memory-browser-agent-chrome.zip`
- `real-memory-browser-agent-edge.zip`
- `reallexi-rmai-1.5.314.tgz`

Verify downloads with [SHA256SUMS](SHA256SUMS).

This patch changes runtime retry coordination rather than the webview layout. The current settings and Scrum/Harness screenshots remain the real source-rendered evidence in the [main product guide](../../README.md); no artificial new screenshot was created for a non-visual change.

## Publication status

- Private source commit: [`68db1cc0`](https://github.com/ddkits/Ollama-VScode-Free-Agent/commit/68db1cc0)
- Private source release: [`v1.5.314`](https://github.com/ddkits/Ollama-VScode-Free-Agent/releases/tag/v1.5.314)
- Public packages: [`rmai-v1.5.314`](https://github.com/ddkits/Reallexi-Public-media-and-files/releases/tag/rmai-v1.5.314) (this release)
- Protected build/test passed: [run 40242026770](https://github.com/ddkits/Ollama-VScode-Free-Agent/actions/runs/40242026770).
- Protected npm publication failed at the first platform package with registry E404/permission for `@reallexi/rmai-ui-linux-amd64@1.5.314`: [run 40242029812](https://github.com/ddkits/Ollama-VScode-Free-Agent/actions/runs/40242029812). The CLI is available as the release tarball above, but 1.5.314 is not claimed as npm-published.
- VS Code Marketplace publication failed with TF400813 because the configured publisher PAT is not authorized. The audited VSIX remains available above.
