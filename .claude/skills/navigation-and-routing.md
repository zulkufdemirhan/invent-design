# Skill: Navigation & Routing

## URL Structure
/[module]/[sub-module]/[screen]
/[module]/[sub-module]/[id]/detail

## State Persistence
The following are kept in URL params:
- Active filters
- Page number
- Tab selection
When the user presses back, they return to the same state.

## Dirty Form Guard
If the form has been modified and the user tries to leave the page:
→ Show an "Unsaved changes — are you sure?" confirm dialog
→ Offer "Leave" or "Stay" options

##  Screen Wiring:
⚠️ Never create a new CubMenu or CubTopNavigationBar.
These already exist in the project.
Only add the new screen's entry to the existing
DEFAULT_MENU_ITEMS — do not modify the component itself.