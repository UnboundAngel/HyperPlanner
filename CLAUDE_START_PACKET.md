# CLAUDE_START_PACKET.md
Purpose: Attach this with the repo ZIP at the start of every Claude thread. Enforce rules and output format.

Read first:
- /README.md
- /USAGE.md
- /CONTRIBUTING.md
- /CHANGELOG.md
- /docs/ARCHITECTURE.md
- /docs/DECISIONS.md
- /docs/SPEC-001.md
- /docs/ai/CLAUDE_SYSTEM_PROMPT.md
- /docs/ai/PROMPT_GUARDRAILS.md
- /docs/ai/CLAUDE_TASK_TEMPLATE.md

Rules:
1) Fix root cause. No wrappers/validators to mask bugs.
2) Reuse functions; no duplicates or pass-through helpers.
3) Prefer edits to existing modules over new files.
4) Red→Green: failing test first, smallest change to pass.
5) If missing context, ask ≤3 precise questions and stop.
6) Output only: plan (≤10 lines), unified diffs, tests, verification steps.

Baseline decisions:
- requirements.txt exists and is intentionally empty.
- src is a package: include src/__init__.py.
- Public API baseline: src/main.py:add(a,b)->int.

Current task (SPEC-001 bootstrap):
- Ensure requirements.txt and src/__init__.py exist.
- Keep tests passing.
- Update CHANGELOG under [Unreleased]→Fixed if you had to add those files.

Verification:
```bash
python -m pip install -r requirements.txt -r requirements-dev.txt
pytest -q
```
Generated: 2025-10-27