# Planner Work Plan

## Finished
- Binder rollback with classic full-width calendar grid and refreshed styling foundation.
- Smart capture + email infrastructure upgrades already in production.
- Email storytelling refresh: reminder + summary emails now use the new branded digest layouts.
- Week transition animation: the calendar grid blurs/slides whenever users change weeks.
- Modular dashboard: every panel can be dragged, hidden, and reset with persisted layout.
- Context-aware theming: gradients/accents automatically shift based on the dominant task context.
- Responsive calendar zoom: density control toggles between 60m/30m/15m with animated rescaling.
- Calendar shell glow + subtle “today” column highlight keep the grid readable while flip animations make week jumps feel premium again.
- Auto-location + NLP upgrades: inline status toasts, precise geolocation fallback, and explicit date phrases (“before Dec 3”) all wire directly into quick capture.

## In Progress
- None (queue up the next batch of upgrades).

## New UX / Theming Cleanup (2-phase)
- **Phase 1 (now):** Fix text contrast guardrails (input highlights, light-on-light issues), redesign panel drag handles to centered 6-dot grip, and add a glassy widget/utility side panel so settings live in a tidy drawer. Trim the Minimal template down to Quick Add + Calendar plus essentials to reduce scrolling.
- **Phase 2 (next):** Deep widgetization of panels (dockable/resizable, hide-on-scroll), calendar density presets with autofolded sections, and full template update (per-view defaults, per-device layouts). Bring the new grip + selection guardrails into mobile states and add motion polish for drawer open/close and panel hover/drag.
- **Phase 7 (templates):** Rich templates carry tags, due offsets, and optional layout presets; import/export JSON; future: per-view defaults, template gallery, and per-device variants; keep animations and contrast guardrails intact.

### Notes / Prompts to enforce
- Always choose text color based on the local surface (card/input) even when the global theme is dark. Selection highlight must stay legible inside Quick Capture.
- Drag handle icon: 6-dot grid (2x3), centered at the top of every card.
- Minimal template should not reintroduce auxiliary panels; keep it lean by default.
- Widget side panel should mirror the landing-page glass look, host Settings and other utilities, and animate in/out.

## Ideas / Backlog
- **Timeline playback** – animate through the week’s tasks to tell a story of progress.
- **AI auto-scheduler** – analyze focus windows + deadlines to slot unscheduled tasks automatically.
- **Shared workspaces** – invite collaborators, assign tasks, and watch each other’s calendars live.
- **Integration hub** – native connectors for Slack, Notion, Google Calendar, and email triage.
- **Habit / streak tracker** – visualize recurring tasks as streaks with automatic re-scheduling nudges.
- **Voice capture pipeline** – record thoughts or meetings and transcribe them into tasks via NLP.
- **Offline-first sync** – resilient local cache that syncs diffs once the device reconnects.
- **Whiteboard planning canvas** – free-form sticky notes that can be promoted to scheduled tasks.
- **Template marketplace** – shareable automation/task templates with tagging and ratings.
- **Advanced automation builder** – conditional flows (if/then) and outgoing webhooks for reminders.
- **KPI dashboard** – forecasting widgets showing burn-down, workload projections, and energy trends.
- **Advanced color coding** – multi-criteria color layers (context, priority, focus mode) with user-defined palettes.
- **Travel time autoplan** – automatically pad events with drive/walk durations pulled from map APIs.
- **Dynamic energy graph** – plot personal energy scores across the day to recommend matching work blocks.
- **Calendar heatmap layer** – tint days/weeks by workload intensity for at-a-glance capacity planning.
- **Meeting intelligence** – detect meeting-heavy days and propose defrag blocks or async alternatives.
- **Deadline risk radar** – highlight tasks drifting past reminders, with suggested escalation sequences.
- **Focus soundtrack** – tie context labels to curated audio/ambience sessions the user can trigger per task.
- **In-app walkthroughs** – guided tours that teach layout customization, quick capture, and automations.
- **Micro animations lab** – toggleable animation themes (subtle, bold, high-contrast) per user preference.
- **County-local calendars** – opt-in, anonymized sharing by county/region so users can browse nearby public calendars without revealing identity.
- **Contextual insights feed** – inline recommendations (“send status update”, “prep slides”) tied to upcoming items.
- **Quarterly goal planner** – dedicated view to break OKRs into planner tasks and track percentage completion.

## New Widgets & Lifestyle Tracks (planned)
- **Meal Planner**
  - Daily/weekly meal board with macros + grocery list sync; auto-slot meals into calendar around focus blocks.
  - Recipe import (URL → ingredients/macros) with pantry tracking and “cook time” conflicts vs. events.
  - Smart suggestions: quick meals on meeting-heavy days, batch-cook on free evenings, leftovers prefill.
  - Export grocery list to notes/email; optional budget cap per week with per-meal cost estimates.
- **Fitness Log**
  - Workout templates (push/pull/legs, cardio intervals) with sets/reps/weight and RPE; history graph per movement.
  - Calendar overlay for sessions + rest days; auto-adjust when sleep/overload detected.
  - Device-friendly input (mobile quick-add) and streaks; reminders for warm-up/cool-down; taggable goals (strength, endurance).
- **Budget / Expense Tracker**
  - Envelope-style buckets (rent, food, fun) with monthly caps; inline expense capture with tags and receipt attachment link.
  - Timeline view of cashflow; alerts when a bucket crosses 80%; recurring payments surface in calendar/day summary.
  - Simple analytics: top categories, burn rate vs. income, upcoming bills; CSV export.
- **Motivation Quote Widget**
  - Rotating quote pill on dashboard and as an optional calendar sidebar strip; user-defined quote bank + themes (calm, bold).
  - “Pin to day” to attach a quote to today/focus blocks; shareable via email summary.

## Widget Framework / Co-op (planned)
- **Widget system**
  - Define widget schema (title, data source, size, permissions); allow add/remove/reorder with layout persistence.
  - Data providers for meals, fitness sessions, expenses, quotes; lazy-load APIs to keep dashboard light.
  - Theming hooks so widgets inherit light/dark and priority colors; offline cache for mobile.
- **Co-op / Shared mode**
  - Shared workspaces with per-widget visibility (e.g., finances private, fitness shared); invite + role permissions.
  - Real-time cursors for calendar and widget edits; comment threads per widget/item.
  - Activity log of widget changes (meal plan edits, expense updates, quote changes).
  - Co-op templates: shared meal plan for the week, shared budget buckets, team motivation board.

## Customization & Automation Phases (roadmap)
- **Phase 1 — Layout Customization Engine**
  - Draggable/resizable panels; save multiple layouts; presets (minimal, dense, creative, dashboard, kanban-first); per-device layouts (desktop vs mobile).
- **Phase 2 — Theme + Styling System**
  - Dynamic theme editor (colors, gradients, fonts, radii, shadows, backgrounds/patterns); import/export theme JSON; live preview.
- **Phase 3 — Iconography + UI Asset Customization**
  - Upload custom icons for contexts/tags/macros; size/stroke/color mapping; animated (Lottie) support; icon packs (minimal, colorful, monochrome, skeuo).
- **Phase 4 — Component-Level Variants**
  - Variants for task/event/list/kanban: Minimal, Detailed, Compact, Wide; toggles for density, roundedness, color mode, shadow level.
- **Phase 5 — Input Logic Customization**
  - Custom NLP rules and trigger keywords; add/remove NLP dictionaries; custom autocomplete providers.
- **Phase 6 — Automation Rules Engine**
  - “When X → do Y” builder with conditions/actions (e.g., #school → context=Study; “after dinner” → 7–9 PM; urgent → top lane); condition groups.
- **Phase 7 — Template System (Advanced)**
  - Templates for task/event/project/daily routines; include fields, layout overrides, theme, icon; template browser with version history.
- **Phase 8 — Binder Mode + Page Aesthetics**
  - Per-page textures; ring variants; page-flip animation selector (speed/sound/direction); two-page spread customizations.
- **Phase 9 — Calendar Visualization Customization**
  - Adjustable density/typography/line weight; event block style presets (solid/outline/blended); alternative views (vertical timeline, Gantt-like); “Creative Mode” (curved/neon/textured).
- **Phase 10 — Task Structure Customization**
  - Custom fields (checkbox/number/link/dropdown); per-category field templates (e.g., Fitness sets/reps); enable/disable fields globally or per-project; user-defined statuses/kanban columns.
- **Phase 11 — Behavior Personalization**
  - Custom drag rules (snap/freeform); rounding increments (5/10/15/30m); optional physics animations; conflict display options (highlight/vibrate/pulse).
- **Phase 12 — Asset Library + Marketplace (Optional)**
  - Theme/icon/layout/animation packs; user import/export system.
- **Phase 13 — Creative Canvas Integration**
  - Whiteboard mode; drag tasks to canvas; connect with arrows/lines; stickers/stamps/freehand tools.
- **Phase 14 — Sound & Interaction Layer**
  - Custom sounds (flip/drop/complete); user-uploaded audio; volume/pitch controls.
- **Phase 15 — Modular Scripting Layer (Advanced)**
  - User scripts (sandboxed JS) to override behaviors (auto-tags, generate tasks, styling); per-user script gallery.
