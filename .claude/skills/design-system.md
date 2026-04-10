# Skill: Design System Enforcement

This skill runs passively on every code generation and every revision.
The rules are not optional — they apply to every output.

---

## Generation Philosophy

The design system is a toolbox, not a constraint.

When generating, ask:
- Does the DS component fit this screen perfectly? → Use it
- Does it fit partially? → Configure or extend it
- Does it not fit at all? → Write something better with tokens

Areas of responsibility:
- Core tokens (color, typography, spacing) must always be respected
- UI and UX quality, visual consistency, and design coherence
- User stories and flows must be generated end-to-end, completely and logically
- Produce usable, interactive screens that conform to domain standards

Storybook components are a reference, not a mandatory template.

---

## Purpose

Verify that every piece of generated code:
- Uses the DS token system
- Follows the Component Hierarchy
- Contains no forbidden patterns

When a violation is detected, fix the code and explain it to the user.

---

## 1. Component Hierarchy — Application Protocol

When a UI element is needed, follow this order. Skipping a level is not allowed.

### Tier 1 — Custom DS Component

Look in `src/components/` first.

```
Button               → src/components/Button/
KpiCard              → src/components/KpiCard/
CubMenu              → src/components/CubMenu/
CubTopNavigationBar  → src/components/CubTopNavigationBar/
FilterBar            → src/components/FilterBar/
DataTableToolbar     → src/components/DataTable/DataTableToolbar
DataSheetTextCell    → src/components/DataTable/DataSheetTextCell
DataSheetStatusCell  → src/components/DataTable/DataSheetStatusCell
DataSheetNumericCell → src/components/DataTable/DataSheetNumericCell
DataSheetFunctionCell→ src/components/DataTable/DataSheetFunctionCell
DataSheetActionButtonsCell → src/components/DataTable/DataSheetActionButtonsCell
DataSheetTitle       → src/components/DataTable/DataSheetTitle
DataSheetTotalRow    → src/components/DataTable/DataSheetTotalRow
```

If a component exists → use it directly, do not re-implement it.
Read the component's source file, verify the prop signature, then use it.

### Tier 2 — Ant Design 6

If there is no match in Tier 1, use the latest version of Ant Design with our design tokens.

> **ConfigProvider is already applied globally** via `AntdRegistry` in `src/app/layout.tsx`.
> It wraps the entire app with the theme from `src/theme/antdTheme.ts`.
> **Do NOT add another `ConfigProvider`** in View files — it is already there.
> Only use a nested `ConfigProvider` when you need a **local override** for a specific
> component (e.g. a different color scheme inside a modal).

```tsx
// ✅ Just use Ant Design components — global ConfigProvider handles theming
import { Table, Form, Modal, Drawer, Select, DatePicker } from 'antd';

// ✅ Token-based style override when needed
import { borderRadius } from '@/tokens/spacing';
<Table style={{ borderRadius: borderRadius.borderRadiusLG }} ... />

// ❌ Hard-coded override
<Table style={{ borderRadius: 8 }} />

// ❌ Redundant ConfigProvider — already global
import { ConfigProvider } from 'antd';
<ConfigProvider theme={antdTheme}><Table ... /></ConfigProvider>
```

### Tier 3 — New UI element within the screen

Only when Tier 1 and Tier 2 are insufficient.

Rules:
- Create the file inside src/app/[module]/[screen]/
  NOT inside src/components/
- src/components/ is managed manually by the team —
  never write files there
- Use DS tokens only — no hard-coded values,
  no external libraries
- Named export only, proper TypeScript interface

---

## 2. Token Usage Rules

### Color

```tsx
// ❌ Forbidden
color: '#3f5df2'
color: '#2d2e33'
backgroundColor: '#f2f3f7'
borderColor: '#dddee5'

// ✅ Required
import { themeColorsLight, dataTableColorsLight } from '@/tokens/colors';

color: themeColorsLight.colorPrimary
color: themeColorsLight.colorText
backgroundColor: themeColorsLight.colorBgLayout
borderColor: themeColorsLight.colorBorder
```

For dark mode:
```tsx
import { themeColors, dataTableColors } from '@/tokens/colors';
const colors = themeColors[mode]; // 'light' | 'dark'
```

### Spacing

```tsx
// ❌ Forbidden
padding: 16
margin: '8px 16px'
gap: 12

// ✅ Required
import { padding, margin } from '@/tokens/spacing';

padding: padding.padding                                      // 16px
padding: `${padding.paddingXS}px ${padding.paddingLG}px`    // 8px 24px
gap: padding.paddingSM                                        // 12px
marginBottom: margin.marginMD                                 // 20px
```

### Border Radius

```tsx
// ❌ Forbidden
borderRadius: 6
borderRadius: '8px'

// ✅ Required
import { borderRadius } from '@/tokens/spacing';

borderRadius: borderRadius.borderRadius    // 6px
borderRadius: borderRadius.borderRadiusLG  // 8px
```

### Typography

```tsx
// ❌ Forbidden
fontSize: 13
fontWeight: 600
fontFamily: 'Inter, sans-serif'
lineHeight: '18px'

// ✅ Required
import { textStyles, fontSize, fontWeight, fontFamily } from '@/tokens/typography';

// Composite style (preferred)
style={{ ...textStyles.base }}
style={{ ...textStyles.heading4 }}

// Individual token
style={{ fontSize: fontSize.fontSize, fontWeight: fontWeight.medium, fontFamily }}
```

### Icon

```tsx
// ❌ Forbidden
<FontAwesomeIcon icon={faEdit} style={{ fontSize: 14 }} />

// ✅ Required
import { iconSize } from '@/tokens/icons';
<FontAwesomeIcon icon={faEdit} style={{ fontSize: iconSize.iconSize }} />
```

---

## 3. Forbidden Patterns

### Inline Hard-coded Values

```tsx
// ❌ All of these forms are forbidden
style={{ color: '#3f5df2' }}
style={{ padding: 16 }}
style={{ fontSize: 13 }}
style={{ borderRadius: 6 }}
style={{ fontFamily: 'Inter, sans-serif' }}
style={{ background: '#f2f3f7' }}
style={{ border: '1px solid #dddee5' }}
```

### External Library Usage

```tsx
// ❌ Forbidden — new dependency
import styled from 'styled-components';
import { Box } from '@mui/material';
import { clsx } from 'clsx';
import cn from 'classnames';

// ✅ Required — token + inline style or Ant Design
style={{ display: 'flex', gap: padding.paddingSM, ... }}
```

### Tailwind

```tsx
// ❌ Forbidden
className="flex gap-4 p-4 text-sm font-medium"
className="bg-blue-600 hover:bg-blue-700"

// ✅ Required
style={{ display: 'flex', gap: padding.paddingLG, ...textStyles.base }}
```

### Default Export

```tsx
// ❌ Forbidden
export default function MyComponent() { ... }
export default MyComponent;

// ✅ Required
export const MyComponent: React.FC<MyComponentProps> = () => { ... }
```

> **Exception:** Next.js `page.tsx` and `layout.tsx` files require
> `export default`. This is the only allowed case.

### `any` Type

```tsx
// ❌ Forbidden
const data: any = fetchData();
function process(item: any) { ... }

// ✅ Required — define an interface
interface OrderItem {
  id: string;
  sku: string;
  quantity: number;
}
const data: OrderItem[] = fetchData();
```

### Re-implementing DS Components

```tsx
// ❌ Forbidden — custom button implementation
const CustomButton = () => (
  <button style={{ background: '#3f5df2', color: '#fff', borderRadius: 6 }}>
    {label}
  </button>
);

// ✅ Required — use the DS Button
import { Button } from '@/components/Button';
<Button type="primary" label={label} />
```

---

## 4. Pre-generation Checklist

Answer these questions before writing any code:

```
Need a color?
→ Is it in themeColorsLight / themeColorsDark / dataTableColorsLight? Use it from there.

Need spacing?
→ Take it from padding, margin, or borderRadius tokens.

Need typography?
→ Use textStyles composite object or fontSize / fontWeight tokens.

Need an icon?
→ Use iconSize token. FA7 Pro kit only.

Need a button?
→ src/components/Button/Button.tsx — do not write another button.

Need navigation?
→ CubMenu + CubTopNavigationBar — do not write another nav.

Need a table?
→ Use DataSheet* cell components + DataTableToolbar.

Need a KPI indicator?
→ KpiCard — do not write another metric card.

Need a filter?
→ FilterBar — do not write another filter component.

None of the above?
→ Check Ant Design 6 first. If nothing fits, write a new component using DS tokens.
```

---

## 5. Automatic Violation Correction

When a violation is detected during code review, fix it without asking the user and explain:

| Violation | Automatic Fix |
|-----------|---------------|
| Hard-coded color | Replace with matching token |
| Hard-coded spacing | Replace with matching token |
| Hard-coded font | Replace with textStyles or fontSize token |
| Default export | Convert to named export |
| Missing loading state | Add Skeleton implementation |
| Missing empty state | Add EmptyTable / Empty component |
| Icon-only button missing ARIA | Add `aria-label` |
| Redundant ConfigProvider in View | Remove it — global `AntdRegistry` already provides it |

Correction message format:
```
**Fixed:** [What was violated]
**Why:** [Which rule]
**Change:** [How it was corrected]
```

---

## 6. DS Token Quick Reference

> Full token tables (values, scales, usage): see **CLAUDE.md → Design Tokens** section.
> Do not duplicate the tables here. This section provides import paths only.

```ts
// Color
import { themeColorsLight, themeColorsDark, dataTableColorsLight, dataTableColorsDark, baseColorPalettes } from '@/tokens/colors';

// Spacing
import { borderRadius, padding, margin } from '@/tokens/spacing';

// Typography
import { fontFamily, fontWeight, fontSize, lineHeightPx, textStyles } from '@/tokens/typography';

// Icon
import { iconSize, iconWeight } from '@/tokens/icons';

// Theme (for component-level ConfigProvider overrides only)
import { antdTheme } from '@/theme/antdTheme';
```

---

## 7. Dark Mode

### When to Apply
- Only when the user explicitly requests dark mode support
- Default output is light mode only

### Implementation Pattern

```tsx
import { themeColorsLight, themeColorsDark, dataTableColorsLight, dataTableColorsDark } from '@/tokens/colors';

// In the hook or context:
type ThemeMode = 'light' | 'dark';

const themeColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
};

const dataTableColors = {
  light: dataTableColorsLight,
  dark: dataTableColorsDark,
};

// Usage in the View:
const { mode } = useTheme(); // or accept as prop
const colors = themeColors[mode];
const tableColors = dataTableColors[mode];

style={{ color: colors.colorText, background: colors.colorBgLayout }}
```

### Rules
- Never reference `themeColorsLight` directly when dark mode is active —
  always go through the mode-keyed object
- Ant Design theme switching requires a `ConfigProvider` override at the
  layout level — coordinate with `AntdRegistry` / `AppShell`
- Data table colors must also switch — use `dataTableColors[mode]`

---

## 8. Responsive Behavior

### Breakpoint Strategy

The design system uses three breakpoints, aligned with `DataTableToolbar`:

| Breakpoint | Width | Toolbar Prop |
|------------|-------|-------------|
| Desktop (large) | ≥ 1600 px | `'1600px and more'` |
| Desktop (standard) | 1280–1599 px | `'1280px to 1600px'` |
| Compact | 1024–1279 px | `'1024px to 1280 px'` |

### How to Apply

Screens are designed for **desktop-first** (≥ 1280 px).
Mobile and tablet layouts are **not** in scope unless the user explicitly requests them.

For responsive toolbar behavior, pass the appropriate `breakpoints` prop
to `DataTableToolbar` based on the screen context:
- Full-width pages → `'1600px and more'`
- Pages with sidebar open → `'1280px to 1600px'`
- Narrow panels or split views → `'1024px to 1280 px'`

When building responsive layouts:
- Use `flex-wrap` and `min-width` instead of media queries where possible
- KPI cards should use `flex: 1; minWidth: 180px` to reflow naturally
- Never hard-code widths for layout containers — use `flex` and `%`
