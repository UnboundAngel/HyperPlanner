# Binder-Style Calendar Rebuild Plan

Target: reimagine the calendar as a physical desk planner with dual pages, ring-binding, quick tabs, and lifelike animations. Ten+ work items:

1. **Ring Spine Layout** – Replace the single grid with two facing pages separated by a faux metal spiral; left page shows Mon–Wed, right shows Thu–Sun.
2. **Page Tabs** – Add color-coded, clickable month tabs along the right edge (Jan–Dec) that animate the flip and jump to target weeks.
3. **Page Flip Animation** – Implement WebGL/CSS animation that folds one page over the spine (with easing + shadow) when navigating weeks/months.
4. **Paper Texture + Shadowing** – Layer subtle paper grain, perforation dots near the spine, and drop shadows so tasks feel printed on a sheet.
5. **Bookmark Ribbons** – Add draggable bookmarks (e.g., “Today”, “Focus”) that snap to the current day header for quick navigation.
6. **Handwritten Task Blocks** – Offer a “handwritten” styling option: tasks look like ink with slight rotation, including stickers for priority.
7. **Daily Time Bands** – Extend hours 5am–11pm with gradient shading; allow dragging tasks across both pages while respecting the spine offset.
8. **Sticky Notes Layer** – Support floating sticky notes that pin to a page corner, ideal for inspirational quotes or reminders.
9. **Weather + Mood Margins** – Reserve a thin margin column for daily weather icons/mood emojis to mimic bullet journals.
10. **Advanced Drag Interactions** – Let users drag tasks between pages with magnetized snap lines and audible paper rustle.
11. **Page Tear-Off Mode** – Provide a weekly tear animation (remove page, archive as PDF) for end-of-week wrap-ups.
12. **Assistive Prompting** – Integrate natural-language prompts (“Plan this sprint?”) that pop from tabs and pre-fill binder sections.

Use this checklist as the backlog before engineering the binder view.
