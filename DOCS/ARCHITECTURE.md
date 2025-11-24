# Architecture Map
Deeper, file-level guide to the repo. Paths are relative to the repo root.

## DOCS/ (product/UI plans)
- DOCS/README.md — running log of recent UI/UX enhancements and maintenance tips.
- DOCS/PLANS.md — phased roadmap and prompts (layouts, theming, templates, widgets).
- DOCS/calendar_binder_plan.md — backlog for binder-style calendar (textures, tabs, flip animation).
- DOCS/light_mode_ui_plan.md — light-mode calendar/form/navigation tune-up plan.

## docs/ (specs and AI guardrails)
- docs/ARCHITECTURE.md — this file.
- docs/DECISIONS.md — notable decisions and dates.
- docs/SPEC-000-template.md — spec template.
- docs/SPEC-001.md — baseline project/CI/AI guardrails spec.
- docs/ai/CLAUDE_SYSTEM_PROMPT.md — system prompt for Claude.
- docs/ai/CLAUDE_TASK_TEMPLATE.md — task template for Claude runs.
- docs/ai/CONTEXT_CHECKLIST.md — preflight checklist for AI work.
- docs/ai/PROMPT_GUARDRAILS.md — safety/formatting guardrails.

## src/ (Python baseline)
- src/__init__.py — marks the package.
- src/main.py — minimal example with `add(a, b)` entrypoint.
- src/theme/theme.ts — Theme type definition (accent/page/card/chip/danger/warning/success/text/border/shadow).
- src/theme/applyThemeToDocument.ts — writes Theme values to CSS variables, uses contrast helper.
- src/theme/colorUtils.ts — hex→RGB, luminance, contrast ratio, pick contrasting text color.

## tests/
- tests/test_basic.py — asserts `add(2, 3) == 5` (baseline sanity).

## server/ (Node/Express + SQLite + email)
- server/server.js — Express API, static frontend hosting, SQLite schema/seed, smart term seeding, reminder & daily summary cron via nodemailer, smart-term/email/settings endpoints.
- server/data/smart_terms_seed.json — seed terms for contexts/priorities/time phrases/macros.
- server/.env.example — sample SMTP/email env vars.
- server/package.json / package-lock.json — backend dependencies and lockfile.
- server/planner.db (+ planner.db-wal, planner.db-shm) — SQLite primary DB and WAL files.
- server/node_modules/.package-lock.json — npm metadata snapshot (generated).

## public/ (main app UI)
- public/index.html — primary SPA shell (hero cards, panels, calendar, forms, modals).
- public/styles.css — glassmorphic design system, layout grid, draggable panels, responsive styles.
- public/app.js — frontend logic: panel layout manager, calendar render/drag, quick capture, templates, smart terms, email settings, theme lab, sidebar/drawer wiring.
- public/shared.css — shared styling for docs/guide pages.
- public/landing.html / landing.css / landing.js — marketing landing page (hero, gradients, theme toggles).
- public/guide.html — docs/guide hub using shared styles.
- public/terms.html — simple terms page.
- public/assets/icon.png / icon.svg — app icons for favicon/branding.
- public/assets/README.md — notes for asset usage.

### public/docs/ (static product docs, each is standalone HTML using shared styles)
- public/docs/advanced.html — advanced topics overview.
- public/docs/api.html — API documentation placeholder.
- public/docs/automations-101.html — automation primer.
- public/docs/changelog.html — changelog page.
- public/docs/community.html — community links.
- public/docs/contact-support.html — support contact info.
- public/docs/custom-integrations.html — custom integration guidance.
- public/docs/data-export-import.html — data import/export info.
- public/docs/faq.html — FAQ.
- public/docs/features.html — feature overview.
- public/docs/getting-started.html — onboarding guide.
- public/docs/keyboard-shortcuts.html — keyboard shortcut list.
- public/docs/layout-customization.html — layout customization guide.
- public/docs/privacy-security.html — privacy/security notes.
- public/docs/quick-start.html — quick-start steps.
- public/docs/resources.html — resource links.
- public/docs/smart-capture.html — smart capture guide.
- public/docs/templates-workflows.html — templates/workflows guide.
- public/docs/theme-lab.html — theme lab guide.
- public/docs/video-tutorial.html — tutorial video page.

### public/HyperPlanner/ (rich marketing/demo experience)
- public/HyperPlanner/index.html — immersive landing/demo with welcome flow, modals, feature grid.
- public/HyperPlanner/styles.css — styling/animations for the demo page.
- public/HyperPlanner/script.js — interactivity (cursor effects, modals, onboarding steps, themes).
- public/HyperPlanner/README.md — notes/context for this demo page.
