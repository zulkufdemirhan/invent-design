import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetTitle } from './DataSheetTitle';
import type { DataSheetTitleState, DataSheetTitleType } from './DataSheetTitle';
import { dataTableColorsLight } from '@/tokens/colors';

const meta: Meta<typeof DataSheetTitle> = {
  title: 'Data Table/DataSheetTitle',
  component: DataSheetTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Data table column header cell. Supports Default, Expandable, Empty, and Select All types across 4 interactive states with optional filter and info icons.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['Default', 'Expandable', 'Empty', 'Select All'],
    },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Focus', 'Selected'],
    },
    twoLines: { control: 'boolean' },
    filterApplied: { control: 'boolean' },
    showFilter: { control: 'boolean' },
    showInfo: { control: 'text' },
    width: { control: 'number' },
    cellText: { control: 'text' },
  },
  args: {
    cellText: 'Order Quantity',
    type: 'Default',
    state: 'Default',
    twoLines: false,
    filterApplied: false,
    showFilter: true,
    showInfo: undefined,
    width: 200,
  },
};

export default meta;
type Story = StoryObj<typeof DataSheetTitle>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All States ───────────────────────────────────────────────────────────────

const states: DataSheetTitleState[] = ['Default', 'Hover', 'Focus', 'Selected'];

function StateRow({ type, twoLines = false }: { type: DataSheetTitleType; twoLines?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: '#8d8f99', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {type} {twoLines ? '· Two Lines' : '· Single Line'}
      </div>
      <div style={{ display: 'flex', gap: 0 }}>
        {states.map((state) => (
          <DataSheetTitle key={state} cellText="Order Quantity" type={type} state={state} twoLines={twoLines} showFilter showInfo="Column description" width={160} />
        ))}
        {/* Filter applied variant */}
        <DataSheetTitle cellText="Order Quantity" type={type} state="Default" filterApplied twoLines={twoLines} showFilter width={160} />
      </div>
      <div style={{ display: 'flex', gap: 0, marginTop: -1 }}>
        {states.map((state) => (
          <div key={state} style={{ width: 160, textAlign: 'center', fontSize: 10, fontFamily: 'Inter, sans-serif', color: '#a6a8b2', padding: '4px 0' }}>
            {state}
          </div>
        ))}
        <div style={{ width: 160, textAlign: 'center', fontSize: 10, fontFamily: 'Inter, sans-serif', color: '#a6a8b2', padding: '4px 0' }}>
          Filter Applied
        </div>
      </div>
    </div>
  );
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <StateRow type="Default" />
      <StateRow type="Default" twoLines />
      <StateRow type="Expandable" />
      <StateRow type="Expandable" twoLines />
      <div>
        <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: '#8d8f99', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Empty</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {states.map((s) => <DataSheetTitle key={s} type="Empty" state={s} width={160} />)}
          <DataSheetTitle type="Empty" state="Default" filterApplied width={160} />
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: '#8d8f99', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select All</div>
        <div style={{ display: 'flex', gap: 0 }}>
          {states.map((s) => <DataSheetTitle key={s} type="Select All" state={s} width={160} />)}
          <DataSheetTitle type="Select All" state="Default" checked width={160} />
        </div>
      </div>
    </div>
  ),
};

// ─── Interactive Header ────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (hover/click)',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [states, setStates] = useState<Record<string, DataSheetTitleState>>({
      qty: 'Default', price: 'Default', name: 'Default', date: 'Default',
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [filters, setFilters] = useState<Record<string, boolean>>({ qty: false, price: true, name: false, date: false });

    const cols = [
      { key: 'qty',   label: 'Order Quantity', type: 'Default' as DataSheetTitleType },
      { key: 'price', label: 'Unit Price',      type: 'Default' as DataSheetTitleType },
      { key: 'name',  label: 'Product Name',    type: 'Expandable' as DataSheetTitleType },
      { key: 'date',  label: 'Order Date',       type: 'Default' as DataSheetTitleType },
    ];

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 16 }}>
          {cols.map((col) => (
            <DataSheetTitle
              key={col.key}
              cellText={col.label}
              type={col.type}
              state={states[col.key]}
              filterApplied={filters[col.key]}
              showFilter
              width={180}
              onClick={() => setStates((s) => ({ ...s, [col.key]: s[col.key] === 'Selected' ? 'Default' : 'Selected' }))}
              onFilterClick={() => setFilters((f) => ({ ...f, [col.key]: !f[col.key] }))}
            />
          ))}
        </div>
        <p style={{ fontSize: 12, fontFamily: 'Inter, sans-serif', color: '#8d8f99' }}>
          Click header to toggle Selected state · Click filter icon to toggle applied filter
        </p>
      </div>
    );
  },
};

// ─── Full Table Header ────────────────────────────────────────────────────────

export const TableHeader: Story = {
  name: 'Full Table Header Row',
  render: () => (
    <div style={{ background: dataTableColorsLight.bgCell, display: 'inline-flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <DataSheetTitle type="Select All" width={48} />
        <DataSheetTitle cellText="SKU" type="Default" state="Selected" showFilter width={120} />
        <DataSheetTitle cellText="Product Name" type="Expandable" showFilter showInfo="Full product name" width={200} />
        <DataSheetTitle cellText="Order Qty" type="Default" filterApplied showFilter width={140} />
        <DataSheetTitle cellText="Unit Price" type="Default" showFilter width={140} />
        <DataSheetTitle cellText="Total" type="Default" showFilter={false} width={120} />
        <DataSheetTitle type="Empty" width={48} />
      </div>
      {/* Fake rows to give context */}
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', height: 36 }}>
          <div style={{ width: 48, height: 36, background: dataTableColorsLight.bgCell, border: `1px solid ${dataTableColorsLight.horizontalBorderColor}`, boxSizing: 'border-box' }} />
          {[120, 200, 140, 140, 120, 48].map((w, j) => (
            <div key={j} style={{ width: w, height: 36, background: i % 2 === 0 ? dataTableColorsLight.bgCell : dataTableColorsLight.bgCellMedium, border: `1px solid ${dataTableColorsLight.horizontalBorderColor}`, boxSizing: 'border-box', padding: '0 8px', display: 'flex', alignItems: 'center', fontSize: 12, fontFamily: 'Inter, sans-serif', color: dataTableColorsLight.textDark }} />
          ))}
        </div>
      ))}
    </div>
  ),
};
