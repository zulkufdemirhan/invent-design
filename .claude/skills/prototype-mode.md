# Skill: Prototype Mode

This mode activates when the user uses words such as
"prototype", "demo", "mock", or "quick".

## Relaxed Rules in Prototype Mode
- API calls are simulated with mock data
- Storybook story requirement is deferred
- TypeScript interfaces may be simplified
- State-based navigation is sufficient instead of real routing

## Rules That Do Not Change in Prototype Mode
- Core tokens (color, typography, spacing) are mandatory
- Component hierarchy is mandatory
- Loading / empty / error states are mandatory
- Interaction patterns are mandatory
- UI/UX quality and flow consistency are mandatory

The following comment is added to every prototype file:
// PROTOTYPE MODE — Review before production
