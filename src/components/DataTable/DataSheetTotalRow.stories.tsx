import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetTotalRow } from './DataSheetTotalRow';
import type { DataSheetTotalRowState } from './DataSheetTotalRow';
import { fontFamily } from '@/tokens/typography';
import { DataSheetTitle } from './DataSheetTitle';
import { DataSheetTextCell } from './DataSheetTextCell';
import { DataSheetNumericCell } from './DataSheetNumericCell';

const meta: Meta<typeof DataSheetTotalRow> = {
  title: 'Data Table/DataSheetTotalRow',
  component: DataSheetTotalRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Summary / total row cell for data tables.\n\n**Typography:** Semi Bold Italic (600 + italic) at 12px.\n\n**Empty:** `empty=true` displays a bold (not italic) dash `—`.\n\n**Types:** `Text` (left-aligned) and `Numeric` (right-aligned).',
      },
    },
  },
  argTypes: {
    type:           { control: 'select', options: ['Text','Numeric'] },
    state:          { control: 'select', options: ['Default','Hover','Focus','Selected','Alert'] },
    cellText:       { control: 'text' },
    cellNumber:     { control: 'text' },
    empty:          { control: 'boolean' },
    showInfoIcon:   { control: 'text' },
    showCustomIcon: { control: 'boolean' },
    width:          { control: 'number' },
  },
  args: { state: 'Default', type: 'Text', cellText: 'Total', cellNumber: '8,356', empty: false, width: 200 },
};

export default meta;
type Story = StoryObj<typeof DataSheetTotalRow>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const lbl = (text: string) => (
  <div style={{ fontFamily, fontSize: 10, color: '#a6a8b2', textAlign: 'center', padding: '3px 0' }}>{text}</div>
);
const sectionTitle = (text: string) => (
  <p style={{ fontFamily, fontSize: 11, color: '#8d8f99', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '20px 0 8px' }}>{text}</p>
);

const ALL_STATES: DataSheetTotalRowState[] = ['Default','Hover','Focus','Selected','Alert'];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All States ───────────────────────────────────────────────────────────────

export const TextStates: Story = {
  name: 'Text Type — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetTotalRow type="Text" state={s} cellText="Total" />
          {lbl(s)}
        </div>
      ))}
    </div>
  ),
};

export const NumericStates: Story = {
  name: 'Numeric Type — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetTotalRow type="Numeric" state={s} cellNumber="8,356" />
          {lbl(s)}
        </div>
      ))}
    </div>
  ),
};

// ─── Empty states ─────────────────────────────────────────────────────────────

export const EmptyVariants: Story = {
  name: 'Empty (dash placeholder)',
  render: () => (
    <div>
      {sectionTitle('Text type — not empty vs empty')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_STATES.map((s) => (
          <div key={`ne-${s}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetTotalRow type="Text" state={s} empty={false} cellText="Total" />
            {lbl(`${s} (text)`)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
        {ALL_STATES.map((s) => (
          <div key={`e-${s}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetTotalRow type="Text" state={s} empty />
            {lbl(`${s} (empty)`)}
          </div>
        ))}
      </div>
      {sectionTitle('Numeric type — not empty vs empty')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_STATES.map((s) => (
          <div key={`nn-${s}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetTotalRow type="Numeric" state={s} empty={false} cellNumber="8,356" />
            {lbl(`${s} (num)`)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
        {ALL_STATES.map((s) => (
          <div key={`en-${s}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetTotalRow type="Numeric" state={s} empty />
            {lbl(`${s} (empty)`)}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <div>
      {sectionTitle('showInfoIcon — Default (circle-info) vs Alert (triangle-exclamation)')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_STATES.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetTotalRow type="Text" state={s} cellText="Total" showInfoIcon="Aggregation: SUM" />
            {lbl(s)}
          </div>
        ))}
      </div>
      {sectionTitle('showCustomIcon (gear) — Text type left, Numeric type right')}
      <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
        <DataSheetTotalRow type="Text"    state="Default" cellText="Total"  showCustomIcon />
        <DataSheetTotalRow type="Numeric" state="Default" cellNumber="8,356" showCustomIcon />
        <DataSheetTotalRow type="Text"    state="Default" cellText="Total"  showCustomIcon showInfoIcon />
        <DataSheetTotalRow type="Numeric" state="Default" cellNumber="8,356" showCustomIcon showInfoIcon />
      </div>
    </div>
  ),
};

// ─── Full Table with Total Row ────────────────────────────────────────────────

export const InTable: Story = {
  name: 'Full Table with Total Row',
  render: () => {
    const rows = [
      { product: 'Wireless Keyboard', qty: '1,200', price: '29.99', total: '35,988' },
      { product: 'USB-C Hub',         qty: '850',   price: '49.99', total: '42,492' },
      { product: 'Mechanical Mouse',  qty: '2,100', price: '39.99', total: '83,979' },
    ];
    const W = { product: 200, qty: 100, price: 100, total: 120 };
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex' }}>
          <DataSheetTitle cellText="Product"    width={W.product} showFilter />
          <DataSheetTitle cellText="Order Qty"  width={W.qty}     showFilter />
          <DataSheetTitle cellText="Unit Price" width={W.price}   showFilter={false} />
          <DataSheetTitle cellText="Total"      width={W.total}   showFilter={false} />
        </div>
        {/* Data rows */}
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <DataSheetTextCell    cellText={r.product} type="None Editable" width={W.product} />
            <DataSheetNumericCell cellText={r.qty}     type="None Editable" width={W.qty}     />
            <DataSheetNumericCell cellText={r.price}   type="Locked"        width={W.price}   />
            <DataSheetNumericCell cellText={r.total}   type="None Editable" width={W.total}   />
          </div>
        ))}
        {/* Total row */}
        <div style={{ display: 'flex' }}>
          <DataSheetTotalRow type="Text"    cellText="TOTAL"   state="Default" width={W.product} />
          <DataSheetTotalRow type="Numeric" cellNumber="4,150" state="Default" width={W.qty}     />
          <DataSheetTotalRow type="Numeric" empty              state="Default" width={W.price}   />
          <DataSheetTotalRow type="Numeric" cellNumber="162,459" state="Default" width={W.total} />
        </div>
      </div>
    );
  },
};
