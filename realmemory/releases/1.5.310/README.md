# RM AI Agent 1.5.310

This release stops malformed structured Ollama output from repeating the internal RM output-boundary key indefinitely.

## Behavior

- Six consecutive boundary-key tokens are treated as a provider output cycle.
- The stream is cancelled before the repeated protocol text is sent to the Harness output reader.
- The partial JSON is never executed or written.
- The existing same-model recovery runs once with thinking disabled and unchanged task, error and file evidence.
- If recovery repeats the defect, the request stops at `provider_retry`; it does not enter another unbounded stream.
- Repetitive numeric fixtures inside otherwise valid structured patches remain accepted.

## Validation

- Focused output/reasoning suite: 15 passing.
- Full post-package suite: 3,138 passing and one existing POSIX-only skip on Windows.
- Required `npm run package`: passed.
- VSIX package-content and credential scans: passed.
- Standalone CLI, Chrome and Edge artifacts are synchronized at 1.5.310.

The user-provided 1.5.309 trace is the before-state evidence: it contains 380 repeated `_rm_ai_output_end_` markers in the visible 8,000-character tail and a model stream still running after 237 seconds. The new regression feeds the same structured shape through the production Ollama reader and proves cancellation plus zero repeated markers delivered to the transient output channel.

## Downloads

- `real-memory-ai-agent-1.5.310.vsix`
- `real-memory-browser-agent-chrome.zip`
- `real-memory-browser-agent-edge.zip`
- `reallexi-rmai-1.5.310.tgz`

Verify downloads with [SHA256SUMS](SHA256SUMS).

The settings and Scrum/Harness screenshots remain the source-rendered 1.5.309 UI evidence because this patch changes provider stream handling, not layout. See the [main release page](../../README.md) for those images and setup instructions.
