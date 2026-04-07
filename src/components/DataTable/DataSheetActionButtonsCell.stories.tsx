import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetActionButtonsCell } from './DataSheetActionButtonsCell';
import type { DataSheetActionButtonsCellState, DataSheetActionButtonsCellType } from './DataSheetActionButtonsCell';
import { fontFamily } from '@/tokens/typography';
import { DataSheetTitle } from './DataSheetTitle';
import { DataSheetTextCell } from './DataSheetTextCell';
import { DataSheetNumericCell } from './DataSheetNumericCell';

const meta: Meta<typeof DataSheetActionButtonsCell> = {
  title: 'Data Table/DataSheetActionButtonsCell',
  component: DataSheetActionButtonsCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Action button cell for data table rows. Contains 1-4 icon buttons or a Cancel/Approve pair.\n\n**Button icons (left → right):**\n- `file` — primary filled blue button\n- `pen-line` — edit action\n- `wand-sparkles` — magic/AI action  \n- `ellipsis-vertical` — more options (All Actions only)\n\n**Cancel/Approve:** green check + red X.',
      },
    },
  },
  argTypes: {
    type:  { control: 'select', options: ['All Actions','3 Actions','2 Actions','1 Actions','Cancel/Approve'] },
    state: { control: 'select', options: ['Default','Default Selected','Multiple Selected','Disabled','Disabled Selected'] },
  },
  args: { state: 'Default', type: 'All Actions' },
};

export default meta;
type Story = StoryObj<typeof DataSheetActionButtonsCell>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const lbl = (text: string) => (
  <div style={{ fontFamily, fontSize: 10, color: '#a6a8b2', textAlign: 'center', padding: '3px 0' }}>{text}</div>
);
const sectionTitle = (text: string) => (
  <p style={{ fontFamily, fontSize: 11, color: '#8d8f99', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '20px 0 8px' }}>{text}</p>
);

const ALL_STATES: DataSheetActionButtonsCellState[] = ['Default','Default Selected','Multiple Selected','Disabled','Disabled Selected'];
const ALL_TYPES: DataSheetActionButtonsCellType[] = ['All Actions','3 Actions','2 Actions','1 Actions','Cancel/Approve'];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Types ────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Action Types — Default State',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
      {ALL_TYPES.map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DataSheetActionButtonsCell type={t} state="Default" />
          {lbl(t)}
        </div>
      ))}
    </div>
  ),
};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States — All Actions type',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DataSheetActionButtonsCell type="All Actions" state={s} />
          {lbl(s)}
        </div>
      ))}
    </div>
  ),
};

// ─── Types × States matrix ────────────────────────────────────────────────────

export const TypesAndStates: Story = {
  name: 'Types × States Matrix',
  render: () => (
    <div>
      {ALL_STATES.map((s) => (
        <div key={s}>
          {sectionTitle(s)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end' }}>
            {ALL_TYPES.map((t) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DataSheetActionButtonsCell type={t} state={s} />
                {lbl(t)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Full Table with Actions ──────────────────────────────────────────────────

export const InTable: Story = {
  name: 'Action Column in Table',
  render: () => {
    const rows = [
      { name: 'SKU-001 Wireless Keyboard', qty: '1,200', state: 'Default'           as DataSheetActionButtonsCellState },
      { name: 'SKU-002 USB-C Hub',         qty: '850',   state: 'Default Selected'  as DataSheetActionButtonsCellState },
      { name: 'SKU-003 Mechanical Mouse',  qty: '2,100', state: 'Multiple Selected' as DataSheetActionButtonsCellState },
      { name: 'SKU-004 Monitor Stand',     qty: '0',     state: 'Disabled'          as DataSheetActionButtonsCellState },
      { name: 'SKU-005 Laptop Stand',      qty: '680',   state: 'Default'           as DataSheetActionButtonsCellState },
    ];
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex' }}>
          <DataSheetTitle cellText="Product" width={200} showFilter />
          <DataSheetTitle cellText="Order Qty" width={100} showFilter />
          <DataSheetTitle cellText="Actions" width={120} showFilter={false} />
        </div>
        {/* Rows */}
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <DataSheetTextCell cellText={r.name} type="None Editable" width={200} />
            <DataSheetNumericCell cellText={r.qty} type="None Editable" width={100} />
            <DataSheetActionButtonsCell type="2 Actions" state={r.state} />
          </div>
        ))}
      </div>
    );
  },
};
