# HyperPlanner Docs

## Latest UI / UX Enhancements
- Introduced a "hero" status row (Next Up, Focus Load, Automation) powered by live task + email data for a dashboard feel.
- Rebuilt the glassmorphic design system: layered gradients on the body, padded grid shell around the main layout, and tonal card variants for each column.
- Restyled the calendar grid with richer rounding, drop shadows, hover states, and updated pills/legend copy to match the Akiflow inspiration.
- The calendar now lives inside a vignette cradle with beveled edges, flip-direction animations on week jumps, and a subtle “today” column glow so the current day stands out without an obtrusive badge.
- Polished sidebar utilities (Quick Capture, Filters, Task List, Email Alerts, Overview) with consistent spacing, typography, and gradients.
- Added contextual actions such as the "Edit alerts" shortcut that scrolls directly to the email settings form.
- Wired the navigation tabs to real view modes (Calendar, Tasks, Automations, Insights) that reshape the layout without leaving the SPA.
- Added a kanban-style workflow board plus drag-and-drop: drop in columns to change status or onto the calendar grid to schedule tasks.
- Surfaced a lightweight insights panel driven by the stats endpoint for quick completion and urgency readouts.
- Smart capture now parses natural language ("work tomorrow at 10am") to prefill date/time/context, infers priority from weighted language, groups highlights for hashtags/contexts, recognizes macros like `@home`, and stores context labels end-to-end.
- Quick capture gained reusable templates, a one-tap description writer, and automatic reminder tuning when due dates include a time.
- Natural-language capture now recognizes explicit phrases such as “before December 3 at 9pm,” highlights the entire phrase, and auto-fills due dates/contexts in one shot.
- Expanded the NLP dictionary via `server/data/smart_terms_seed.json` so contexts (English, payroll, etc.), time phrases ("before lunch"), and macros are seeded in SQLite by default.
- Reminder + summary emails now include richer cards (context chips, recurrence, notes) and highlight top contexts so remote users get actionable summaries.
- `public/assets/gallery/` hosts app icons or marketing shots that can be wired into future hero sections.
- A kanban-friendly task list redesign keeps tags compact and legible while matching the premium layout.
- `public/assets/` now houses shared imagery (app icon, future illustrations). Reference files via `/assets/<file>` in HTML/CSS.
- Phase tracker (Phase 1–3) and collapsible panels keep the dashboard breathable while still surfacing automation, overview, and insights data.
- Future binder-style rebuild tasks live in `DOCS/calendar_binder_plan.md` so the next UI overhaul has a clear backlog.
- Dashboard panels (hero, quick capture, filters, calendar, etc.) are now draggable/hideable with layouts persisted in `localStorage` plus a one-tap reset.
- Week navigation plays blur/slide tweens and the calendar grid now uses a glassmorphic treatment for higher fidelity.
- Context-aware themes recolor gradients/accent hues automatically based on the dominant task context (Work, Personal, Study, etc.).
- Responsive calendar zoom controls let you flip between 60m/30m/15m rows with animated rescaling of the grid.
- Tasks now capture start/finish times plus a location field with quick map-launch buttons, and those values persist via new DB columns.
- Added one-click “Auto” geolocation buttons that prefill addresses using the browser’s location (or a network fallback) plus faster live suggestions powered by OpenStreetMap search.
- Location inputs display inline status (“Precise location captured”, fallback notices, etc.) and throttle repeat clicks so users know when the Auto lookup succeeds or needs manual refinement.

## File Structure
```
planner_project/
├── DOCS/
│   ├── README.md
│   └── calendar_binder_plan.md   # Backlog for the binder-style calendar rebuild
├── public/
│   ├── index.html         # UI layout + hero summary markup
│   ├── styles.css         # Glassmorphic design system + calendar layout
│   ├── app.js             # Frontend logic, hero data binding, calendar/task handling
│   └── assets/
│       ├── gallery/       # Drop-in imagery for icons, promos, or hero art
│       ├── rings/         # Metal ring sprites
│       ├── tabs/          # Month tab textures
│       └── textures/      # Paper / shadow textures for the binder
└── server/
    ├── server.js          # API + cron logic (backend provided)
    ├── data/
    │   └── smart_terms_seed.json  # Master seed for the smart_terms dictionary
    ├── package.json
    ├── package-lock.json
    ├── planner.db         # SQLite database (WAL + SHM alongside)
    └── node_modules/      # Backend dependencies
```

## Notes
- The backend APIs were untouched; all enhancements are frontend-only and respect the existing data contract.
- Update hero stats automatically when tasks or email settings change so the UI always reflects live data.
- Styles default to modern system fallbacks if the Inter font fails to load.
- SQLite now also stores `smart_terms`—a lightweight lexicon that powers natural-language capture. Extend it with `INSERT` statements or future admin tools; the frontend automatically consumes `/api/smart-terms`.
**Binder calendar backlog**
- For the binder-style interface, see `DOCS/calendar_binder_plan.md` and track progress inside the Phase cards on the dashboard.
- Future binder ideas remain tracked in that doc, but the current UI uses the classic full-width grid (`.calendar-grid` in `public/index.html`).
- When you revisit the binder concept, revive the assets under `public/assets/tabs` + `public/assets/rings` and reintroduce the `.binder-*` styles.
- `renderCalendar` (in `public/app.js`) renders the weekly grid into `#calendarGrid`, handles drag/drop, and keeps the hero stats in sync.
- **Panel layout customizer**
  - Drag handles (`.panel-handle`) are attached to every major card. Logic lives in `initPanelLayoutManager` (`public/app.js`).
  - Layout persistence uses `localStorage` keys `hyperplanner.layout.panels` and `hyperplanner.layout.hidden`. Clear them or press the header’s “Reset layout” button to restore defaults.
  - Ghost/placeholder styling is defined via `.panel-drag-ghost` and `.panel-placeholder` in `public/styles.css`.
- **Context-aware themes**
  - Dominant contexts are derived from `task.context` using `THEME_CONTEXT_MAP` (`public/app.js`). Theme switching applies to `body[data-theme=...]`.
  - Update palette/gradient mappings via the theme selectors in `public/styles.css` (e.g., `body[data-theme="work"]`).

### Maintenance Notes
**Quick-capture dictionary**
- NLP relies on two layers: `server/data/smart_terms_seed.json` (auto-seeded into SQLite) and the parsing helpers in `public/app.js`.
- Add terms/phrases to the JSON file, then restart the backend so the seeder inserts any missing rows. Frontend ingestion happens via `/api/smart-terms`.
- The parser now understands context hashtags (`#work`), macros (`@home`), and time phrases (e.g., "before lunch", "next quarter"). Keep those lists in sync with the seed JSON.

**Emails**
- Reminder and summary emails live in `processReminders` and `processDailySummary` (server). Both send plain text and HTML bodies—edit both strings together.
- Reminder emails now render mini cards (title, due, context, recurrence). Summary emails include a "Context focus" block that highlights the top three contexts.
- Reminder scheduling is entirely driven by `reminder_minutes_before`. Editing a task resets `reminder_sent`, so reminders can fire again on the next cycle.

**Calendar density / zoom**
- Density buttons (60m/30m/15m) sit in the calendar header; `setCalendarDensity` (`public/app.js`) controls the `calendarDensity` state and rerenders the grid.
- Available options live in `CALENDAR_DENSITIES`. Add/remove buttons in `public/index.html` if you change the array.
- Row heights are derived from the CSS variable `--slot-height`; JavaScript sets it inline for smooth transitions.

**Start / finish + location fields**
- Task objects now include `start_time`, `end_time`, and `location`. Columns are created on boot via the `ensureColumn` helper inside `server/server.js`.
- Quick capture and the modal both expose start/finish inputs and a location field with a “Map” button. The helper `openLocationInMaps` opens a Google Maps search; swap the URL if you need a different provider.
- Dragging tasks on the calendar maintains their duration by shifting `end_time` by the same delta as `start_time`.
