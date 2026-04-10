# Skill: Prototype Mode

This mode activates **only** when the user explicitly requests it using
one of these phrases: "prototype mode", "in prototype mode", "as a prototype",
"build a prototype", or the `/prototype` prefix.

**Important:** The words "mock", "quick", or "demo" used in normal context
(e.g. "add mock data", "quick question", "demo the filter") do **not**
activate Prototype Mode. The user must clearly indicate they want
reduced-fidelity output.

---

## Relaxed Rules in Prototype Mode
- API calls are simulated with mock data
- Storybook story requirement is deferred
  (add `// TODO: Storybook story required before production`)
- TypeScript interfaces may be simplified (but never use `any`)
- State-based navigation is sufficient instead of real routing
- Domain Analysis (Step 1) and Screen Plan (Step 2) may be
  condensed into a single confirmation message instead of two
  separate approval rounds

## Rules That Do Not Change in Prototype Mode
- Core tokens (color, typography, spacing) are mandatory
- Component hierarchy is mandatory
- Loading / empty / error states are mandatory
- Interaction patterns are mandatory
- UI/UX quality and flow consistency are mandatory
- Named exports only
- File size limits still apply

The following comment is added to every prototype file:
```tsx
// PROTOTYPE MODE — Review before production
```

---

## Production Graduation Checklist

When a prototype is ready to be promoted to production code,
the following items must be completed. This checklist should be
shared with the team member who owns the promotion.

```
## Pre-production Review

### Code Quality
[ ] Remove all `// PROTOTYPE MODE` comments
[ ] Remove all `// TODO: Storybook story required before production` comments
[ ] Write Storybook stories for every new component / view
[ ] Replace simplified TypeScript interfaces with full definitions
    (check Types file for missing fields, optional vs required)
[ ] Verify file size limits (View ≤ 300, component ≤ 150, hook ≤ 100 lines)
[ ] Extract logic into hooks if View files contain state/handlers

### Data & API
[ ] Replace all mock/sample data with real API calls
[ ] Wire loading states to actual async operations
[ ] Wire error states to real error responses
[ ] Verify empty states match actual "no data" scenarios

### Navigation & Routing
[ ] Confirm ROUTE_MAP entry in AppShell.tsx
[ ] Confirm KEY_TO_ROUTE entry in AppShell.tsx
[ ] Confirm menu item added to DEFAULT_MENU_ITEMS (if applicable)
[ ] Test browser back/forward preserves state (URL params)
[ ] Test dirty form guard on forms with real data

### Interaction & Accessibility
[ ] All icon-only buttons have aria-label
[ ] Modal/Drawer focus trap verified
[ ] Keyboard navigation tested (Tab, Enter, Escape, Arrow keys)
[ ] Color contrast verified ≥ 4.5:1

### Final
[ ] Smoke test all states: loading → data → empty → error
[ ] Peer review completed
[ ] Storybook stories render correctly
```
