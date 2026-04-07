import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetTextCell } from './DataSheetTextCell';
import { DataSheetTitle } from './DataSheetTitle';
import type { DataSheetTextCellState, DataSheetTextCellType, DataSheetTextCellLevel } from './DataSheetTextCell';
import { dataTableColorsLight } from '@/tokens/colors';
import { themeColorsLight } from '@/tokens/colors';
import { fontFamily } from '@/tokens/typography';

const meta: Meta<typeof DataSheetTextCell> = {
  title: 'Data Table/DataSheetTextCell',
  component: DataSheetTextCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Data table text cell. **4 implemented states** (Default, Searchable, Alert, Alert Selected) + additional selection/disabled states.',
          '',
          '**Key behaviours:**',
          '- `valueChanged` → text becomes **bold**',
          '- `Alert` state → `showInfoIcon` renders a **warning triangle** in error color',
          '- `Editable` type → edit icon is **always visible** on the right',
          '- `Expandable` type → chevron-down always shown; level drives left indent',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: [
        'Default', 'Default Selected', 'Multiple Selected',
        'Disabled', 'Disabled Selected',
        'Searchable', 'Alert', 'Alert Selected',
      ],
    },
    type: {
      control: 'select',
      options: ['None Editable', 'Editable', 'Expandable'],
    },
    level: {
      control: 'select',
      options: ['Level 1', 'Level 2', 'Level 3'],
    },
    cellText:     { control: 'text' },
    valueChanged: { control: 'boolean' },
    twoLines:     { control: 'boolean' },
    showLeftIcon: { control: 'boolean' },
    showInfoIcon: { control: 'text', description: 'true/string shows info icon; in Alert state renders as warning triangle' },
    width:        { control: 'number' },
  },
  args: {
    cellText: 'Order Quantity',
    state: 'Default',
    type: 'None Editable',
    level: 'Level 1',
    valueChanged: false,
    twoLines: false,
    showLeftIcon: false,
    showInfoIcon: false,
    width: 200,
  },
};

export default meta;
type Story = StoryObj<typeof DataSheetTextCell>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const label = (text: string) => (
  <div style={{ fontFamily, fontSize: 10, color: '#a6a8b2', textAlign: 'center', padding: '3px 0' }}>
    {text}
  </div>
);

const sectionTitle = (text: string) => (
  <p style={{ fontFamily, fontSize: 11, color: '#8d8f99', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
    {text}
  </p>
);

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All States × None Editable ───────────────────────────────────────────────

const ALL_STATES: DataSheetTextCellState[] = [
  'Default', 'Default Selected', 'Multiple Selected',
  'Disabled', 'Disabled Selected',
  'Searchable', 'Alert', 'Alert Selected',
];

export const AllStates: Story = {
  name: 'All States — None Editable',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Normal */}
      <div>
        {sectionTitle('Normal (valueChanged=false)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetTextCell cellText="Order Qty" state={s} type="None Editable" width={160} />
              {label(s)}
            </div>
          ))}
        </div>
      </div>
      {/* Value changed */}
      <div>
        {sectionTitle('valueChanged=true (text → bold)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetTextCell cellText="8,356" state={s} type="None Editable" valueChanged width={160} />
              {label(s)}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── All Types ────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Types — Default State',
  render: () => (
    <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
      {(['None Editable', 'Editable', 'Expandable'] as DataSheetTextCellType[]).map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DataSheetTextCell cellText="Order Quantity" type={t} width={200} />
          {label(t)}
        </div>
      ))}
    </div>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const Icons: Story = {
  name: 'Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* showLeftIcon */}
      <div style={{ marginBottom: 12 }}>
        {sectionTitle('showLeftIcon (gear icon)')}
        <div style={{ display: 'flex' }}>
          <DataSheetTextCell cellText="Without left icon" width={220} />
          <DataSheetTextCell cellText="With left icon" showLeftIcon width={220} />
        </div>
      </div>

      {/* showInfoIcon — normal states */}
      <div style={{ marginBottom: 12 }}>
        {sectionTitle('showInfoIcon — Default state → InfoCircle')}
        <div style={{ display: 'flex' }}>
          <DataSheetTextCell cellText="No info icon" width={220} />
          <DataSheetTextCell cellText="Info icon (hover for tooltip)" showInfoIcon="Tooltip content here" width={220} />
        </div>
      </div>

      {/* showInfoIcon — Alert → WarningTriangle */}
      <div style={{ marginBottom: 12 }}>
        {sectionTitle('showInfoIcon — Alert state → WarningOutlined (error color)')}
        <div style={{ display: 'flex' }}>
          <DataSheetTextCell cellText="Alert, no icon" state="Alert" width={220} />
          <DataSheetTextCell cellText="Alert + showInfoIcon" state="Alert" showInfoIcon width={220} />
          <DataSheetTextCell cellText="Alert Selected + showInfoIcon" state="Alert Selected" showInfoIcon width={220} />
        </div>
      </div>

      {/* Editable → always has edit icon */}
      <div>
        {sectionTitle('Editable type → EditOutlined always visible')}
        <div style={{ display: 'flex' }}>
          <DataSheetTextCell cellText="Editable, no info" type="Editable" width={220} />
          <DataSheetTextCell cellText="Editable + info" type="Editable" showInfoIcon="More info" width={220} />
          <DataSheetTextCell cellText="Editable + left + info" type="Editable" showLeftIcon showInfoIcon width={220} />
        </div>
      </div>
    </div>
  ),
};

// ─── Expandable Levels ────────────────────────────────────────────────────────

export const ExpandableLevels: Story = {
  name: 'Expandable — Levels & Indent',
  render: () => {
    const levels: DataSheetTextCellLevel[] = ['Level 1', 'Level 2', 'Level 3'];
    return (
      <div>
        {sectionTitle('Level indent (0px / 16px / 32px on inner content)')}
        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
          {levels.map((l) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DataSheetTextCell cellText={`${l} — ${l === 'Level 1' ? 'Category' : l === 'Level 2' ? 'Sub-category' : 'Item'}`} type="Expandable" level={l} width={280} />
              {label(l)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          {sectionTitle('With valueChanged')}
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            {levels.map((l) => (
              <DataSheetTextCell key={l} cellText="Changed value" type="Expandable" level={l} valueChanged width={280} />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── Interactive Expandable Tree ──────────────────────────────────────────────

export const ExpandableTree: Story = {
  name: 'Expandable — Interactive Tree',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState({ a: true, a1: false, b: false });
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <DataSheetTextCell cellText="Category A" type="Expandable" level="Level 1" width={260} onExpandToggle={() => setOpen((s) => ({ ...s, a: !s.a }))} />
        {open.a && (
          <>
            <DataSheetTextCell cellText="Sub-category A1" type="Expandable" level="Level 2" width={260} onExpandToggle={() => setOpen((s) => ({ ...s, a1: !s.a1 }))} />
            {open.a1 && (
              <>
                <DataSheetTextCell cellText="Item A1-1" type="Expandable" level="Level 3" width={260} />
                <DataSheetTextCell cellText="Item A1-2 (changed)" type="Expandable" level="Level 3" valueChanged width={260} />
              </>
            )}
            <DataSheetTextCell cellText="Sub-category A2" type="Expandable" level="Level 2" width={260} />
          </>
        )}
        <DataSheetTextCell cellText="Category B" type="Expandable" level="Level 1" width={260} onExpandToggle={() => setOpen((s) => ({ ...s, b: !s.b }))} />
        {open.b && (
          <DataSheetTextCell cellText="Sub-category B1" type="Expandable" level="Level 2" width={260} />
        )}
      </div>
    );
  },
};

// ─── Two Lines ────────────────────────────────────────────────────────────────

export const TwoLines: Story = {
  name: 'Two-line Mode',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div>
        {sectionTitle('Single line (32px)')}
        <DataSheetTextCell cellText="Long product name that overflows" twoLines={false} width={200} />
      </div>
      <div>
        {sectionTitle('Two lines (44px)')}
        <DataSheetTextCell cellText="Long product name that wraps to two lines nicely" twoLines width={200} />
      </div>
    </div>
  ),
};

// ─── Full Table ───────────────────────────────────────────────────────────────

export const FullTable: Story = {
  name: 'Full Table',
  parameters: { layout: 'padded' },
  render: () => {
    const rows = [
      { sku: 'SKU-001', name: 'Wireless Keyboard',   qty: '1,200', price: '$29.99', total: '$35,988', qtyState: 'Default'          as DataSheetTextCellState, changed: false },
      { sku: 'SKU-002', name: 'USB-C Hub',            qty: '850',   price: '$49.99', total: '$42,492', qtyState: 'Default Selected'  as DataSheetTextCellState, changed: true  },
      { sku: 'SKU-003', name: 'Mechanical Mouse',     qty: '2,100', price: '$39.99', total: '$83,979', qtyState: 'Searchable'        as DataSheetTextCellState, changed: false },
      { sku: 'SKU-004', name: 'Monitor Stand',        qty: '0',     price: '$79.99', total: '$0',      qtyState: 'Alert'             as DataSheetTextCellState, changed: false },
      { sku: 'SKU-005', name: 'Laptop Stand (Alum.)', qty: '680',   price: '$59.99', total: '$40,793', qtyState: 'Multiple Selected' as DataSheetTextCellState, changed: false },
      { sku: 'SKU-006', name: 'Desk Organizer',       qty: '—',     price: '$19.99', total: '—',       qtyState: 'Disabled'          as DataSheetTextCellState, changed: false },
    ];
    const W = { sku: 100, name: 200, qty: 130, price: 120, total: 120 };
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', border: `1px solid ${dataTableColorsLight.borderColor}` }}>
        {/* Header */}
        <div style={{ display: 'flex' }}>
          <DataSheetTitle cellText="SKU"          width={W.sku}  showFilter={false} />
          <DataSheetTitle cellText="Product Name" width={W.name} showFilter showInfo="Full product name" />
          <DataSheetTitle cellText="Order Qty"    width={W.qty}  showFilter filterApplied />
          <DataSheetTitle cellText="Unit Price"   width={W.price} showFilter />
          <DataSheetTitle cellText="Total"        width={W.total} showFilter={false} />
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <DataSheetTextCell cellText={row.sku}   type="Editable"      width={W.sku}   />
            <DataSheetTextCell cellText={row.name}  type="None Editable" width={W.name}  />
            <DataSheetTextCell cellText={row.qty}   type="None Editable" state={row.qtyState} showInfoIcon={row.qtyState === 'Alert'} valueChanged={row.changed} width={W.qty} />
            <DataSheetTextCell cellText={row.price} type="None Editable" width={W.price} />
            <DataSheetTextCell cellText={row.total} type="None Editable" width={W.total} valueChanged={row.changed} />
          </div>
        ))}
        {/* Total row */}
        <div style={{ display: 'flex', background: dataTableColorsLight.bgTotalRow, borderTop: `2px solid ${dataTableColorsLight.borderColor}` }}>
          <DataSheetTextCell cellText="Total" type="None Editable" valueChanged width={W.sku} />
          <DataSheetTextCell cellText="" type="None Editable" width={W.name} />
          <DataSheetTextCell cellText="4,830" type="None Editable" valueChanged width={W.qty} />
          <DataSheetTextCell cellText="" type="None Editable" width={W.price} />
          <DataSheetTextCell cellText="$203,162" type="None Editable" valueChanged width={W.total} />
        </div>
      </div>
    );
  },
};
