import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataTableToolbar } from './DataTableToolbar';
import type {
  DataTableToolbarType,
  DataTableToolbarBreakpoint,
} from './DataTableToolbar';
import { fontFamily } from '@/tokens/typography';

const ALL_TYPES: DataTableToolbarType[] = ['Editable Data', 'None Editable Data'];
const ALL_BREAKPOINTS: DataTableToolbarBreakpoint[] = [
  '1600px and more',
  '1280px to 1600px',
  '1024px to 1280 px',
];

const meta: Meta<typeof DataTableToolbar> = {
  title: 'Data Table/DataTableToolbar',
  component: DataTableToolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Toolbar for data table views. Adapts based on `type` (Editable vs None Editable) and `breakpoints` (icon-only vs text+icon).',
          '',
          '**Left side — Toolbar Actions:**',
          '- Aggregation (count badge), Columns, Display Options — text+icon at `1600px and more`, icon-only at smaller',
          '- Export / Import grouped buttons — Import only in Editable mode',
          '- Wrap Text — green dot badge when active',
          '- Reset / Undo / Redo — Editable only',
          '- Cell Edit Actions (Mark + Lock + Formula input) — Editable + `cellEditActions`',
          '- Reset Column Filters — text+icon at `1600px and more`, icon-only at smaller',
          '',
          '**Right side — Custom Actions:**',
          '- Editable: Secondary · Danger (×) · Positive (✓) · Primary',
          '- None Editable: Secondary · Secondary · Primary',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ALL_TYPES,
      description: 'Editable or read-only data table mode',
    },
    breakpoints: {
      control: 'select',
      options: ALL_BREAKPOINTS,
      description: 'Controls header button text visibility',
    },
    cellEditActions: {
      control: 'boolean',
      description: 'Show cell edit actions group (Editable only)',
    },
    customActions: {
      control: 'boolean',
      description: 'Show custom action buttons on the right',
    },
    resetColumnFilters: {
      control: 'boolean',
      description: 'Show the Reset Column Filters button',
    },
    aggregationCount: {
      control: { type: 'number', min: 0, max: 99 },
      description: 'Count shown on the Aggregation badge (0 = hidden)',
    },
    wrapTextActive: {
      control: 'boolean',
      description: 'Green dot on Wrap Text button when active',
    },
  },
  args: {
    type: 'Editable Data',
    breakpoints: '1600px and more',
    cellEditActions: true,
    customActions: true,
    resetColumnFilters: true,
    aggregationCount: 3,
    wrapTextActive: true,
  },
};

export default meta;
type Story = StoryObj<typeof DataTableToolbar>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sectionLabel = (text: string) => (
  <p
    style={{
      fontFamily,
      fontSize: 10,
      color: '#a6a8b2',
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      margin: '20px 0 6px',
    }}
  >
    {text}
  </p>
);

const divider = (
  <div style={{ borderTop: '1px solid #e8eaf2', margin: '8px 0' }} />
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Editable Data — all breakpoints ─────────────────────────────────────────

export const EditableAllBreakpoints: Story = {
  name: 'Editable Data — All Breakpoints',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {ALL_BREAKPOINTS.map((bp) => (
        <div key={bp}>
          {sectionLabel(bp)}
          <div
            style={{
              border: '1px solid #e8eaf2',
              borderRadius: 6,
              padding: '0 16px',
            }}
          >
            <DataTableToolbar
              type="Editable Data"
              breakpoints={bp}
              cellEditActions
              customActions
              resetColumnFilters
              aggregationCount={3}
              wrapTextActive
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── None Editable Data — all breakpoints ────────────────────────────────────

export const NoneEditableAllBreakpoints: Story = {
  name: 'None Editable Data — All Breakpoints',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {ALL_BREAKPOINTS.map((bp) => (
        <div key={bp}>
          {sectionLabel(bp)}
          <div
            style={{
              border: '1px solid #e8eaf2',
              borderRadius: 6,
              padding: '0 16px',
            }}
          >
            <DataTableToolbar
              type="None Editable Data"
              breakpoints={bp}
              customActions
              resetColumnFilters
              aggregationCount={3}
              wrapTextActive
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Types comparison ─────────────────────────────────────────────────────────

export const TypesComparison: Story = {
  name: 'Editable vs None Editable',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {ALL_TYPES.map((t) => (
        <div key={t}>
          {sectionLabel(t)}
          <div
            style={{
              border: '1px solid #e8eaf2',
              borderRadius: 6,
              padding: '0 16px',
            }}
          >
            <DataTableToolbar
              type={t}
              breakpoints="1600px and more"
              cellEditActions
              customActions
              resetColumnFilters
              aggregationCount={3}
              wrapTextActive
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Full Design Matrix (all types × breakpoints) ────────────────────────────

export const FullMatrix: Story = {
  name: 'Full Matrix — All Types × Breakpoints',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {ALL_TYPES.map((t, ti) => (
        <div key={t}>
          {ti > 0 && divider}
          {ALL_BREAKPOINTS.map((bp) => (
            <div key={`${t}-${bp}`}>
              {sectionLabel(`${t} · ${bp}`)}
              <div
                style={{
                  border: '1px solid #e8eaf2',
                  borderRadius: 6,
                  padding: '0 16px',
                }}
              >
                <DataTableToolbar
                  type={t}
                  breakpoints={bp}
                  cellEditActions
                  customActions
                  resetColumnFilters
                  aggregationCount={3}
                  wrapTextActive
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Cell Edit Actions toggle ─────────────────────────────────────────────────

export const CellEditActionsToggle: Story = {
  name: 'Cell Edit Actions — On vs Off',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {sectionLabel('With cell edit actions')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions
          customActions
          resetColumnFilters
          aggregationCount={3}
          wrapTextActive
        />
      </div>

      {sectionLabel('Without cell edit actions')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions={false}
          customActions
          resetColumnFilters
          aggregationCount={3}
          wrapTextActive
        />
      </div>
    </div>
  ),
};

// ─── Custom Actions toggle ────────────────────────────────────────────────────

export const CustomActionsToggle: Story = {
  name: 'Custom Actions — On vs Off',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {sectionLabel('With custom actions')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions
          customActions
          resetColumnFilters
          aggregationCount={3}
          wrapTextActive
        />
      </div>

      {sectionLabel('Without custom actions')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions
          customActions={false}
          resetColumnFilters
          aggregationCount={3}
          wrapTextActive
        />
      </div>
    </div>
  ),
};

// ─── Badge states ─────────────────────────────────────────────────────────────

export const BadgeStates: Story = {
  name: 'Badge & Active States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {sectionLabel('Aggregation count = 3 · Wrap Text active')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions={false}
          customActions={false}
          resetColumnFilters={false}
          aggregationCount={3}
          wrapTextActive
        />
      </div>

      {sectionLabel('Aggregation count = 0 · Wrap Text inactive')}
      <div
        style={{ border: '1px solid #e8eaf2', borderRadius: 6, padding: '0 16px' }}
      >
        <DataTableToolbar
          type="Editable Data"
          breakpoints="1600px and more"
          cellEditActions={false}
          customActions={false}
          resetColumnFilters={false}
          aggregationCount={0}
          wrapTextActive={false}
        />
      </div>
    </div>
  ),
};

// ─── Minimal (no optional sections) ──────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal — Core Actions Only',
  args: {
    type: 'None Editable Data',
    breakpoints: '1600px and more',
    cellEditActions: false,
    customActions: false,
    resetColumnFilters: false,
    aggregationCount: 0,
    wrapTextActive: false,
  },
};
