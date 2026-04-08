import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FilterBar } from './FilterBar';
import type { FilterBarType } from './FilterBar';
import { fontFamily } from '@/tokens/typography';

const ALL_TYPES: FilterBarType[] = ['Quick Filters', 'Regular Filters'];

const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'A horizontal filter bar with two modes.',
          '',
          '**Quick Filters** — Checkable pill tags for fast category switching. One tag is always active (primary fill). Click toggles selection.',
          '',
          '**Regular Filters** — Attribute filter pills (with required indicator and dropdown chevron), an overflow "+N more" pill, an optional warning indicator, and Apply / More Filters / Clear All CTA buttons.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ALL_TYPES,
      description: 'Bar mode',
    },
    filterCount: {
      control: 'boolean',
      description: 'Show the "+N more" overflow pill (Regular only)',
    },
    moreCount: {
      control: { type: 'number', min: 1, max: 99 },
      description: 'Count in the overflow pill',
    },
    showWarning: {
      control: 'boolean',
      description: 'Show the warning indicator pill (Regular only)',
    },
    warningCount: {
      control: { type: 'number', min: 1, max: 99 },
      description: 'Count in the warning pill',
    },
    showCta: {
      control: 'boolean',
      description: 'Show Apply / More Filters / Clear All buttons (Regular only)',
    },
  },
  args: {
    type: 'Quick Filters',
    filterCount: true,
    moreCount: 12,
    showWarning: true,
    warningCount: 2,
    showCta: true,
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sectionLabel = (text: string) => (
  <p
    style={{
      fontFamily,
      fontSize: 10,
      color: '#a6a8b2',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.07em',
      margin: '20px 0 8px',
    }}
  >
    {text}
  </p>
);

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      border: '1px solid #e8eaf2',
      borderRadius: 8,
      padding: '12px 16px',
    }}
  >
    {children}
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Quick Filters ────────────────────────────────────────────────────────────

export const QuickFiltersDefault: Story = {
  name: 'Quick Filters — Default',
  args: { type: 'Quick Filters' },
};

export const QuickFiltersInteractive: Story = {
  name: 'Quick Filters — Interactive',
  render: () => {
    const [selected, setSelected] = useState('All');
    const filters = [
      { label: 'All' },
      { label: 'Active' },
      { label: 'Pending' },
      { label: 'Overdue' },
      { label: 'Cancelled' },
    ];
    return (
      <div>
        <Card>
          <FilterBar
            type="Quick Filters"
            quickFilters={filters}
            selectedQuickFilter={selected}
            onQuickFilterChange={setSelected}
          />
        </Card>
        <p
          style={{
            fontFamily,
            fontSize: 12,
            color: '#8d8f99',
            marginTop: 12,
          }}
        >
          Selected: <strong style={{ color: '#2d2e33' }}>{selected}</strong>
        </p>
      </div>
    );
  },
};

// ─── Regular Filters ──────────────────────────────────────────────────────────

export const RegularFiltersDefault: Story = {
  name: 'Regular Filters — Default',
  args: {
    type: 'Regular Filters',
    filterCount: true,
    showWarning: true,
    showCta: true,
  },
};

export const RegularFiltersNoWarning: Story = {
  name: 'Regular Filters — No Warning',
  args: {
    type: 'Regular Filters',
    filterCount: true,
    showWarning: false,
    showCta: true,
  },
};

export const RegularFiltersNoCta: Story = {
  name: 'Regular Filters — No CTA Buttons',
  args: {
    type: 'Regular Filters',
    filterCount: true,
    showWarning: true,
    showCta: false,
  },
};

export const RegularFiltersMinimal: Story = {
  name: 'Regular Filters — Minimal',
  args: {
    type: 'Regular Filters',
    filterCount: false,
    showWarning: false,
    showCta: false,
  },
};

export const RegularFiltersCustomItems: Story = {
  name: 'Regular Filters — Custom Items',
  render: () => (
    <Card>
      <FilterBar
        type="Regular Filters"
        filterItems={[
          { label: 'Department', required: true },
          { label: 'Date Range', required: true },
          { label: 'Category', required: false },
          { label: 'Status', required: true },
        ]}
        filterCount
        moreCount={5}
        showWarning
        warningCount={1}
        showCta
      />
    </Card>
  ),
};

// ─── Both types ───────────────────────────────────────────────────────────────

export const BothTypes: Story = {
  name: 'Both Modes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {sectionLabel('Quick Filters')}
      <Card>
        <FilterBar type="Quick Filters" />
      </Card>

      {sectionLabel('Regular Filters')}
      <Card>
        <FilterBar
          type="Regular Filters"
          filterCount
          showWarning
          showCta
        />
      </Card>
    </div>
  ),
};

// ─── Regular Filters — optional sections toggle ───────────────────────────────

export const OptionalSections: Story = {
  name: 'Regular Filters — Optional Sections',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {sectionLabel('With count, warning, CTAs')}
      <Card>
        <FilterBar type="Regular Filters" filterCount showWarning showCta />
      </Card>

      {sectionLabel('Without count')}
      <Card>
        <FilterBar type="Regular Filters" filterCount={false} showWarning showCta />
      </Card>

      {sectionLabel('Without warning')}
      <Card>
        <FilterBar type="Regular Filters" filterCount showWarning={false} showCta />
      </Card>

      {sectionLabel('Without CTAs')}
      <Card>
        <FilterBar type="Regular Filters" filterCount showWarning showCta={false} />
      </Card>

      {sectionLabel('Core only (no optional sections)')}
      <Card>
        <FilterBar
          type="Regular Filters"
          filterCount={false}
          showWarning={false}
          showCta={false}
        />
      </Card>
    </div>
  ),
};
