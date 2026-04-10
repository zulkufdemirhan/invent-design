# Skill: Screen Generation

This skill runs after `domain-analysis.md` is complete.
**Phase 1 does not begin until the Domain Summary is approved.**

---

## Purpose

Use the approved domain context to produce the screen in 3 phases:
- **Phase 1** — Propose the flow, get approval
- **Phase 2** — Write the code, apply token and component rules
- **Phase 3** — Apply iterations, preserve prior decisions

---

## Phase 1 — Flow Proposal (Approval Required)

### What to do
Using the Domain Summary, produce the structural plan for the screen.
Do not write code. Write a decision document.

### Output Format

```
## Screen Plan: [Screen Name]

### Layout
- Shell: CubMenu (collapsed: false) + CubTopNavigationBar
- Main area: [Layout type — single panel / split / full-width grid]
- Page width: [Fixed / Fluid]

### Breadcrumb
[Module] › [Sub-module] › [Screen name]

### Tab Bar (if applicable)
Tab 1: [Name] | Tab 2: [Name] | ...
Active: Tab 1

### Regions (top to bottom)
1. **KPI Bar** — [How many cards, which metrics]
2. **Filter Bar** — [Quick Filters / Regular Filters, how many filters]
3. **Toolbar** — [Editable / None Editable, which actions]
4. **DataTable** — [How many columns, which cell types, pagination]
5. **Modal / Drawer** — [Which action triggers it, what it contains]

### Navigation Flow
[Previous screen] → this screen → [Next screen]
Triggering action: [e.g. clicking a table row]

### State Plan
| State | Behavior |
|-------|----------|
| Loading | [Skeleton or spinner, which region] |
| Empty | [Message, icon, CTA] |
| Error | [Toast / inline, retry available] |
| Success | [Toast message] |

### Open Decisions
- [Items requiring a design decision — ask the user]
```

### Approval Question

```
Does this plan look right? I'll start coding once you approve.
Is there any section you'd like to change?
```

**Phase 2 does not begin without approval.**

---

## Phase 2 — Code Generation

### Pre-flight Checks (Run Before Every Generation)

Before writing any code, verify:

```
[ ] Domain Summary approved
[ ] Screen Plan approved
[ ] Existing page file read (if revision)
[ ] src/theme/antdTheme.ts read (if ConfigProvider is needed)
[ ] Source file of every DS component to be used has been read
```

### Production Order

Produce parts in this sequence — complete each before moving to the next:

```
1. Page Shell
   └── layout wrapper (CubMenu + CubTopNavigationBar + content area)

2. KPI Bar (if applicable)
   └── KpiCard array, state and container props configured

3. Filter Bar
   └── FilterBar, type and props per Screen Plan

4. Toolbar
   └── DataTableToolbar, type and breakpoints configured

5. DataTable
   └── Column definitions, cell components, DataSheetTitles

6. Modal / Drawer (if applicable)
   └── Trigger connections, content form, submit flow

7. States
   └── Loading skeleton, empty state, error state, success toast
```

### Tab State Management
For screens that contain tabs:
- Each tab manages its own loading / empty / error state independently
- When switching tabs, the previous tab's state is preserved
- The active tab is reflected in a URL param (`?tab=overview`)

### File Structure

For a new screen:
```
src/app/[module]/[screen]/
├── page.tsx              ← Next.js page (Server Component wrapper)
└── [ScreenName]View.tsx  ← Client Component (all UI lives here)
```

> Note: Never create files inside src/components/.
> src/components/ is managed manually by the team.
> All generated files go into src/app/[module]/[screen]/.

### Code Rules

```tsx
// ✅ Correct — token import
import { themeColorsLight } from '@/tokens/colors';
import { padding } from '@/tokens/spacing';
import { textStyles } from '@/tokens/typography';

// ❌ Wrong — hard-coded
style={{ color: '#3f5df2', padding: 16, fontSize: 13 }}

// ✅ Correct — token usage
style={{ color: themeColorsLight.colorPrimary, padding: padding.padding, ...textStyles.base }}

// ✅ Correct — named export
export const TransferView: React.FC<TransferViewProps> = ...

// ❌ Wrong — default export
export default function TransferView() ...

// ✅ Correct — typed interface
interface TransferViewProps {
  moduleId: string;
  readonly?: boolean;
}

// ❌ Wrong — any
const data: any = ...
```

### Template — Page Shell

```tsx
'use client';

import { ConfigProvider } from 'antd';
import { CubMenu, DEFAULT_MENU_ITEMS, DEFAULT_SECONDARY_ITEMS } from '@/components/CubMenu';
import { CubTopNavigationBar } from '@/components/CubTopNavigationBar';
import { antdTheme } from '@/theme/antdTheme';
import { themeColorsLight } from '@/tokens/colors';

export const [ScreenName]View: React.FC = () => {
  return (
    <ConfigProvider theme={antdTheme}>
      <div style={{ display: 'flex', height: '100vh', background: themeColorsLight.colorBgLayout }}>
        <CubMenu
          collapsed={false}
          selectedKey="[nav-key]"
          items={DEFAULT_MENU_ITEMS}
          secondaryItems={DEFAULT_SECONDARY_ITEMS}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <CubTopNavigationBar
            breadcrumbs={[{ key: 'b1', label: '[Module]' }, { key: 'b2', label: '[Screen]' }]}
            notificationCount={0}
            userInitials="ZD"
          />
          <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
            {/* content */}
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};
```

### Realistic Data
Do not use placeholders (Lorem ipsum, Item 1, Test data).
Use the entity names, metric types, and business context
from the approved Domain Summary to generate
realistic and domain-appropriate sample values.

---

## Phase 3 — Iteration

### Rule: Preserve Prior Decisions

When an iteration request arrives:

1. Apply only the requested change
2. Leave untouched regions exactly as they are
3. Do not change token or component choices (unless explicitly asked)
4. Do not remove added states (loading / empty / error)
5. Clearly declare what was changed

### Change Declaration Format

```
**Changed:** [Component or region]
**What:** [What was added / removed / modified]
**Untouched:** [Other regions]
**Affected prop/state:** [If any]
```

### Iteration Types

| Type | Approach |
|------|----------|
| Visual fine-tuning | Only the style prop or token value changes |
| New column / filter | Added to existing structure; other columns preserved |
| Adding a state | Loading / empty / error implementation added |
| Adding an action | Modal / drawer + trigger connection added |
| Layout change | Shell preserved; only `main` interior rearranged |

### If the User Says "Rewrite"

The Screen Plan must be updated before any full rewrite.
Return the "rewrite" request to Phase 1, get the updated plan approved.

### Iteration Limit
If the user has made 3+ iterations and the screen has diverged significantly
from the original plan, ask:
"These changes are moving the screen substantially away from the original plan.
I'd recommend updating and re-approving the Screen Plan — shall I continue?"

---

## Checklist — For Every Screen Output

Verify before delivering code:

```
[ ] ConfigProvider wraps the tree
[ ] All colors come from tokens
[ ] All spacing values come from tokens
[ ] Font size / weight come from tokens
[ ] No hard-coded hex, px, or font values
[ ] Loading state present
[ ] Empty state present (message + icon + optional CTA)
[ ] Error state present (toast or inline)
[ ] All interactive elements have hover / focus / disabled states
[ ] Tables have toolbar + pagination
[ ] Forms have validation + submit feedback
[ ] Modals close on Escape, focus trap active
[ ] Named exports used
[ ] No any types used
[ ] Realistic domain data present (no placeholders)
```
