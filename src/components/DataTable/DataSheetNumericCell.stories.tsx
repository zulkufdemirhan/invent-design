import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetNumericCell } from './DataSheetNumericCell';
import { DataSheetTitle } from './DataSheetTitle';
import type {
  DataSheetNumericCellState,
  DataSheetNumericCellType,
  DataSheetNumericCellLevel,
} from './DataSheetNumericCell';
import { dataTableColorsLight } from '@/tokens/colors';
import { fontFamily } from '@/tokens/typography';

const meta: Meta<typeof DataSheetNumericCell> = {
  title: 'Data Table/DataSheetNumericCell',
  component: DataSheetNumericCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Data table numeric cell. Text is **right-aligned**. Supports all 8 states and 5 types.',
          '',
          '**Key behaviours:**',
          '- `valueChanged` → text becomes **bold**',
          '- `Alert` state → `showInfoIcon` renders a **warning triangle** in error color',
          '- `Editable` type → edit icon always visible on the **left**',
          '- `Locked` type → lock icon (orange) on the left + orange-1 background',
          '- `Marked` type → bolt icon (gold) on the left + gold-1 background',
          '- `Expandable` type → chevron-down; level drives left indent',
          '- `flag` prop → small corner triangle (top-right)',
          '- `showCustomIcon` → gear icon to the right of the number',
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
      options: ['None Editable', 'Editable', 'Expandable', 'Locked', 'Marked'],
    },
    level: {
      control: 'select',
      options: ['Level 1', 'Level 2', 'Level 3'],
    },
    cellText:       { control: 'text' },
    valueChanged:   { control: 'boolean' },
    twoLines:       { control: 'boolean' },
    flag:           { control: 'boolean' },
    showCustomIcon: { control: 'boolean' },
    showInfoIcon:   { control: 'text', description: 'true/string shows info icon; in Alert state renders as warning triangle' },
    width:          { control: 'number' },
  },
  args: {
    cellText: '8,356',
    state: 'Default',
    type: 'None Editable',
    level: 'Level 1',
    valueChanged: false,
    twoLines: false,
    flag: false,
    showCustomIcon: false,
    showInfoIcon: false,
    width: 160,
  },
};

export default meta;
type Story = StoryObj<typeof DataSheetNumericCell>;

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

// ─── All States ───────────────────────────────────────────────────────────────

const ALL_STATES: DataSheetNumericCellState[] = [
  'Default', 'Default Selected', 'Multiple Selected',
  'Disabled', 'Disabled Selected',
  'Searchable', 'Alert', 'Alert Selected',
];

export const AllStates: Story = {
  name: 'All States — None Editable',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        {sectionTitle('Normal (valueChanged=false)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetNumericCell cellText="8,356" state={s} type="None Editable" width={140} />
              {label(s)}
            </div>
          ))}
        </div>
      </div>
      <div>
        {sectionTitle('valueChanged=true (text → bold)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetNumericCell cellText="8,356" state={s} type="None Editable" valueChanged width={140} />
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
      {(['None Editable', 'Editable', 'Expandable', 'Locked', 'Marked'] as DataSheetNumericCellType[]).map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DataSheetNumericCell cellText="8,356" type={t} width={140} />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        {sectionTitle('showInfoIcon — Default state → InfoCircle')}
        <div style={{ display: 'flex' }}>
          <DataSheetNumericCell cellText="8,356" width={160} />
          <DataSheetNumericCell cellText="8,356" showInfoIcon="Tooltip content" width={160} />
        </div>
      </div>
      <div>
        {sectionTitle('showInfoIcon — Alert state → WarningOutlined')}
        <div style={{ display: 'flex' }}>
          <DataSheetNumericCell cellText="0" state="Alert" width={160} />
          <DataSheetNumericCell cellText="0" state="Alert" showInfoIcon width={160} />
          <DataSheetNumericCell cellText="0" state="Alert Selected" showInfoIcon width={160} />
        </div>
      </div>
      <div>
        {sectionTitle('showCustomIcon — gear icon right of number')}
        <div style={{ display: 'flex' }}>
          <DataSheetNumericCell cellText="8,356" width={160} />
          <DataSheetNumericCell cellText="8,356" showCustomIcon width={160} />
          <DataSheetNumericCell cellText="8,356" showInfoIcon showCustomIcon width={160} />
        </div>
      </div>
      <div>
        {sectionTitle('flag — corner triangle')}
        <div style={{ display: 'flex' }}>
          <DataSheetNumericCell cellText="8,356" width={160} />
          <DataSheetNumericCell cellText="8,356" flag width={160} />
          <DataSheetNumericCell cellText="8,356" flag valueChanged width={160} />
        </div>
      </div>
    </div>
  ),
};

// ─── Locked & Marked ──────────────────────────────────────────────────────────

export const LockedAndMarked: Story = {
  name: 'Locked & Marked Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        {sectionTitle('Locked (orange bg + lock icon)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetNumericCell cellText="8,356" type="Locked" state={s} width={130} />
              {label(s)}
            </div>
          ))}
        </div>
      </div>
      <div>
        {sectionTitle('Marked (gold bg + bolt icon)')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ALL_STATES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DataSheetNumericCell cellText="8,356" type="Marked" state={s} width={130} />
              {label(s)}
            </div>
          ))}
        </div>
      </div>
      <div>
        {sectionTitle('Locked + Marked with showInfoIcon')}
        <div style={{ display: 'flex' }}>
          <DataSheetNumericCell cellText="8,356" type="Locked" showInfoIcon="Locked cell" width={160} />
          <DataSheetNumericCell cellText="8,356" type="Marked" showInfoIcon="Marked cell" width={160} />
          <DataSheetNumericCell cellText="8,356" type="Locked" showCustomIcon width={160} />
          <DataSheetNumericCell cellText="8,356" type="Marked" showCustomIcon width={160} />
        </div>
      </div>
    </div>
  ),
};

// ─── Expandable Levels ────────────────────────────────────────────────────────

export const ExpandableLevels: Story = {
  name: 'Expandable — Levels & Indent',
  render: () => {
    const levels: DataSheetNumericCellLevel[] = ['Level 1', 'Level 2', 'Level 3'];
    return (
      <div>
        {sectionTitle('Level indent (0px / 16px / 32px)')}
        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
          {levels.map((l) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DataSheetNumericCell cellText="8,356" type="Expandable" level={l} width={200} />
              {label(l)}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          {sectionTitle('With valueChanged')}
          <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            {levels.map((l) => (
              <DataSheetNumericCell key={l} cellText="8,356" type="Expandable" level={l} valueChanged width={200} />
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
        <DataSheetNumericCell cellText="20,714" type="Expandable" level="Level 1" width={220} onExpandToggle={() => setOpen((s) => ({ ...s, a: !s.a }))} />
        {open.a && (
          <>
            <DataSheetNumericCell cellText="12,358" type="Expandable" level="Level 2" width={220} onExpandToggle={() => setOpen((s) => ({ ...s, a1: !s.a1 }))} />
            {open.a1 && (
              <>
                <DataSheetNumericCell cellText="4,000" type="Expandable" level="Level 3" width={220} />
                <DataSheetNumericCell cellText="8,358" type="Expandable" level="Level 3" valueChanged width={220} />
              </>
            )}
            <DataSheetNumericCell cellText="8,356" type="Expandable" level="Level 2" width={220} />
          </>
        )}
        <DataSheetNumericCell cellText="5,500" type="Expandable" level="Level 1" width={220} onExpandToggle={() => setOpen((s) => ({ ...s, b: !s.b }))} />
        {open.b && (
          <DataSheetNumericCell cellText="5,500" type="Expandable" level="Level 2" width={220} />
        )}
      </div>
    );
  },
};

// ─── Full Table ───────────────────────────────────────────────────────────────

export const FullTable: Story = {
  name: 'Full Table',
  parameters: { layout: 'padded' },
  render: () => {
    const rows = [
      { sku: 'SKU-001', name: 'Wireless Keyboard',   qty: '1,200', price: '29.99',  total: '35,988',  qtyState: 'Default'          as DataSheetNumericCellState, changed: false, flag: false },
      { sku: 'SKU-002', name: 'USB-C Hub',            qty: '850',   price: '49.99',  total: '42,492',  qtyState: 'Default Selected'  as DataSheetNumericCellState, changed: true,  flag: true  },
      { sku: 'SKU-003', name: 'Mechanical Mouse',     qty: '2,100', price: '39.99',  total: '83,979',  qtyState: 'Searchable'        as DataSheetNumericCellState, changed: false, flag: false },
      { sku: 'SKU-004', name: 'Monitor Stand',        qty: '0',     price: '79.99',  total: '0',       qtyState: 'Alert'             as DataSheetNumericCellState, changed: false, flag: false },
      { sku: 'SKU-005', name: 'Laptop Stand (Alum.)', qty: '680',   price: '59.99',  total: '40,793',  qtyState: 'Multiple Selected' as DataSheetNumericCellState, changed: false, flag: false },
      { sku: 'SKU-006', name: 'Desk Organizer',       qty: '—',     price: '19.99',  total: '—',       qtyState: 'Disabled'          as DataSheetNumericCellState, changed: false, flag: false },
    ];
    const W = { sku: 100, name: 180, qty: 100, price: 100, total: 110 };
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', border: `1px solid ${dataTableColorsLight.borderColor}` }}>
        {/* Header */}
        <div style={{ display: 'flex' }}>
          <DataSheetTitle cellText="SKU"          width={W.sku}   showFilter={false} />
          <DataSheetTitle cellText="Product Name" width={W.name}  showFilter showInfo="Full product name" />
          <DataSheetTitle cellText="Order Qty"    width={W.qty}   showFilter filterApplied />
          <DataSheetTitle cellText="Unit Price"   width={W.price} showFilter />
          <DataSheetTitle cellText="Total"        width={W.total} showFilter={false} />
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <DataSheetNumericCell cellText={row.sku}   type="None Editable" width={W.sku}   />
            <DataSheetNumericCell cellText={row.name}  type="None Editable" width={W.name}  />
            <DataSheetNumericCell cellText={row.qty}   type="None Editable" state={row.qtyState} showInfoIcon={row.qtyState === 'Alert'} valueChanged={row.changed} flag={row.flag} width={W.qty} />
            <DataSheetNumericCell cellText={row.price} type="Locked"        width={W.price} />
            <DataSheetNumericCell cellText={row.total} type="None Editable" valueChanged={row.changed} width={W.total} />
          </div>
        ))}
        {/* Total row */}
        <div style={{ display: 'flex', background: dataTableColorsLight.bgTotalRow, borderTop: `2px solid ${dataTableColorsLight.borderColor}` }}>
          <DataSheetNumericCell cellText="Total" type="None Editable" valueChanged width={W.sku}   />
          <DataSheetNumericCell cellText=""      type="None Editable"              width={W.name}  />
          <DataSheetNumericCell cellText="4,830" type="None Editable" valueChanged width={W.qty}   />
          <DataSheetNumericCell cellText=""      type="None Editable"              width={W.price} />
          <DataSheetNumericCell cellText="203,162" type="None Editable" valueChanged width={W.total} />
        </div>
      </div>
    );
  },
};
