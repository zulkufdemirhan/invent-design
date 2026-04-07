# Invent Design System

Reusable component library built on **Next.js 16**, **Ant Design 6**, and **Storybook 10** — powered by Figma design tokens.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | Ant Design 6 |
| Component Explorer | Storybook 10 (Vite builder) |
| Language | TypeScript |
| Font | Inter (via next/font) |
| Design Tokens | Figma → `src/tokens/` |

---

## Prerequisites

- Node.js **18+**
- npm **9+**

---

## Installation

```bash
git clone https://github.com/zulkufdemirhan/invent-design.git
cd invent-design
npm install
```

---

## Running the App

### Next.js Dev Server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000)

### Storybook

```bash
npm run storybook
```

Opens at [http://localhost:6006](http://localhost:6006)

Use the **sun/moon toolbar** in Storybook to switch between Light and Dark mode.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js for production |
| `npm run start` | Start Next.js production server |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Start Storybook dev server (port 6006) |
| `npm run build-storybook` | Build static Storybook |

---

## Project Structure

```
invent-design/
├── .storybook/
│   ├── main.ts              # Storybook config (Vite + Next.js framework)
│   └── preview.tsx          # Global decorators — ConfigProvider + light/dark toggle
│
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout — Inter font + AntdRegistry
│   │   ├── globals.css      # Base styles
│   │   └── page.tsx         # Home page
│   │
│   ├── lib/
│   │   └── AntdRegistry.tsx # SSR-safe Ant Design style injection (App Router)
│   │
│   ├── theme/
│   │   └── antdTheme.ts     # Ant Design ThemeConfig (light + dark)
│   │
│   ├── tokens/
│   │   ├── colors.ts        # Figma color tokens (Light + Dark × Theme + DataTable + Palettes)
│   │   ├── typography.ts    # Figma typography tokens (Inter, font sizes, weights, line heights)
│   │   ├── Colors.stories.tsx
│   │   └── Typography.stories.tsx
│   │
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx
│       │   ├── Button.stories.tsx
│       │   └── index.ts
│       │
│       ├── KpiCard/
│       │   ├── KpiCard.tsx
│       │   ├── KpiCard.stories.tsx
│       │   └── index.ts
│       │
│       └── DataTable/
│           ├── DataSheetTitle.tsx      # Column header cell
│           ├── DataSheetTitle.stories.tsx
│           ├── DataSheetTextCell.tsx   # Text data cell
│           ├── DataSheetTextCell.stories.tsx
│           └── index.ts
```

---

## Design Tokens

All tokens are sourced from Figma and live in `src/tokens/`.

### Colors — `src/tokens/colors.ts`

| Export | Description |
|--------|-------------|
| `themeColorsLight` | Primary, Success, Warning, Error, Text, Border, Fill, Background |
| `themeColorsDark` | Same as above for dark mode |
| `baseColorPalettes` | 13 palettes — red, orange, gold, green, blue, purple, gray… |
| `dataTableColorsLight` | 25 data table specific tokens |
| `dataTableColorsDark` | Data table dark mode tokens |

### Typography — `src/tokens/typography.ts`

| Export | Description |
|--------|-------------|
| `fontFamily` | `'Inter, sans-serif'` |
| `fontWeight` | `normal(400)` / `medium(500)` / `semiStrong(600)` / `strong(700)` |
| `fontSize` | `fontSizeXS(11)` → `fontSizeHeading1(24)` |
| `lineHeightPx` | Pixel line heights matching each font size |
| `lineHeightRatio` | Unitless ratios for Ant Design ThemeConfig |
| `textStyles` | Ready-to-use `CSSProperties` objects: `xs`, `sm`, `base`, `heading1–5`… |

---

## Components

### Button
Thin wrapper around Ant Design `Button` with typed `label` prop.

```tsx
import { Button } from '@/components/Button';

<Button type="primary" label="Save" />
<Button type="default" danger label="Delete" />
```

### KpiCard
Key performance indicator card with state-driven colors.

```tsx
import { KpiCard } from '@/components/KpiCard';

<KpiCard
  title="Total Revenue"
  value="$248,560"
  diff="12.3%"
  description="vs. last month"
  state="positive"          // 'default' | 'positive' | 'negative' | 'warning' | 'custom'
  size="large"              // 'large' | 'small'
  container="simple"        // 'none' | 'simple' | 'gray' | 'gray-borderless'
  icon={<DollarOutlined />}
/>
```

### DataSheetTitle
Data table column header cell.

```tsx
import { DataSheetTitle } from '@/components/DataTable';

<DataSheetTitle
  cellText="Order Quantity"
  type="Default"            // 'Default' | 'Expandable' | 'Empty' | 'Select All'
  state="Default"           // 'Default' | 'Hover' | 'Focus' | 'Selected'
  showFilter
  filterApplied={false}
  showInfo="Column description"
/>
```

### DataSheetTextCell
Data table text data cell.

```tsx
import { DataSheetTextCell } from '@/components/DataTable';

<DataSheetTextCell
  cellText="Order Quantity"
  state="Default"           // 'Default' | 'Searchable' | 'Alert' | 'Alert Selected' | …
  type="Editable"           // 'None Editable' | 'Editable' | 'Expandable'
  level="Level 1"           // 'Level 1' | 'Level 2' | 'Level 3'
  valueChanged={false}      // true → text renders bold
  showInfoIcon              // Alert state → renders WarningOutlined in error color
/>
```

---

## Adding a New Component

1. Create `src/components/ComponentName/ComponentName.tsx`
2. Use tokens from `@/tokens/colors` and `@/tokens/typography`
3. Create `ComponentName.stories.tsx` in the same folder
4. Export from `src/components/ComponentName/index.ts`
5. Add barrel export in `src/components/index.ts`

---

## Storybook Features

- **Light / Dark mode toggle** in the toolbar (top-right sun/moon icon)
- **Controls panel** — live prop editing for every component
- **Autodocs** — auto-generated documentation from JSDoc and prop types
- **Accessibility** addon — a11y checks on every story
- **Design Tokens** section — Colors and Typography documented as visual swatches
