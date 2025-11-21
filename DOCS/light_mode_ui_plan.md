# Light Mode UI Improvement Plan

Scope: apply to light mode first; dark mode to follow with its own palette/contrast review.

## Calendar Grid
- Replace per-slot blue beads with a softly tinted full-day column; add a high-contrast current-hour strip/line.
- Increase text contrast and lighten the gradient backdrop for readability; keep a single accent system (priority colors stay distinct).
- Add "Today" chip and week navigation arrows; include a visible now-line and hover states for slots.
- Allow drag-to-create/resize blocks with inline duration preview; quick filters for context/priority above the grid.

## Event Pills
- Expand pills so titles never hyphen-break (turn off forced hyphenation, prefer ellipsis + full title on hover); allow two-line wrap on small screens.
- Move priority to a colored left edge instead of tiny dots; enlarge tap targets; surface meeting links/locations inline.
- Show suggested slots as ghost pills within the grid rather than static text.

## Form & Panels
- Group key scheduling inputs (date/time/priority/location) into a tighter block; collapse secondary fields into accordions.
- Elevate Save as the primary CTA; demote Send test to a link/ghost style; add section labels (Details, Schedule, Automation, Notifications).
- Reduce container shadows and trim vertical padding to decrease visual noise.

## Templates & Onboarding
- First-login template chooser: ask users to pick a layout density (rich vs. minimal) and default tabs/pages.
- After onboarding, move template management to Settings > Templates, with a quick “Apply template” entry in the task form.
- Show recently used templates as chips in the form; keep Smart capture as a small inline action.

## Navigation / IA
- Add top-level tabs/pages for key areas (Calendar, Tasks, Automations, Overview) so users on smaller templates can reach features without cluttering the main view.
- Keep alert email and notification toggles in a modal/drawer instead of an always-visible card to preserve rhythm.
- Right-side stats: align counts, add simple progress indicators, and make “Next up” items clickable.

## Mobile & Responsive
- Collapse the left form into a bottom sheet; right stats panel becomes a tabbed strip.
- Maintain legible column tinting and now-line on mobile; support pinch/zoom or density toggle (60/30/15m).
- Ensure drag/long-press works for creating/resizing events; provide keyboard shortcuts on desktop (N new task, T today, / search).

## Dark Mode (later)
- Derive complementary tints instead of mirror-inverting; re-evaluate contrast for the tinted current-day column and now-line.

## Phase 1 – Implemented
- Calendar: full-column tint for today, distinct current-hour band, no per-slot beads; keeps hover/density intact.
- Event pills: left-edge priority bar replaces dots; text no longer hyphen-breaks and clamps to two lines for clarity.

## Phase 1 – Remaining
- First-login template chooser + relocation of template management into Settings; expose “Apply template” quick entry.
- Navigation/tab tweaks for minimal templates and a condensed mobile layout (bottom sheet for capture, tabbed stats).
