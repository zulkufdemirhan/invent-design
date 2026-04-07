import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetStatusCell } from './DataSheetStatusCell';
import type { DataSheetStatusCellState, DataSheetStatusCellType } from './DataSheetStatusCell';
import { fontFamily } from '@/tokens/typography';
import { DataSheetTitle } from './DataSheetTitle';

const meta: Meta<typeof DataSheetStatusCell> = {
  title: 'Data Table/DataSheetStatusCell',
  component: DataSheetStatusCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Data table status cell. Displays a colored dot badge next to a status label.\n\n**9 status types** — each has a distinct badge color.\n**7 states** — same selection/alert pattern as other data table cells.',
      },
    },
  },
  argTypes: {
    type:  { control: 'select', options: ['Green (Waiting for Release)','Light Green (Order Reviewed)','Blue (Order Released)','Orange (Waiting for Review)','Red (Failed/Canceled)','Grey (Out of Frequency)','Black (Non-Editable)','Purple','Magenta'] },
    state: { control: 'select', options: ['Default','Default Selected','Multiple Selected','Disabled','Disabled Selected','Alert','Alert Selected'] },
    cellText:     { control: 'text' },
    showInfoIcon: { control: 'text' },
    width:        { control: 'number' },
  },
  args: { state: 'Default', type: 'Green (Waiting for Release)', width: 200 },
};

export default meta;
type Story = StoryObj<typeof DataSheetStatusCell>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const lbl = (text: string) => (
  <div style={{ fontFamily, fontSize: 10, color: '#a6a8b2', textAlign: 'center', padding: '3px 0' }}>{text}</div>
);
const sectionTitle = (text: string) => (
  <p style={{ fontFamily, fontSize: 11, color: '#8d8f99', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '20px 0 8px' }}>{text}</p>
);

const ALL_STATES: DataSheetStatusCellState[] = ['Default','Default Selected','Multiple Selected','Disabled','Disabled Selected','Alert','Alert Selected'];
const ALL_TYPES: DataSheetStatusCellType[] = ['Green (Waiting for Release)','Light Green (Order Reviewed)','Blue (Order Released)','Orange (Waiting for Review)','Red (Failed/Canceled)','Grey (Out of Frequency)','Black (Non-Editable)','Purple','Magenta'];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Types ────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All Status Types — Default State',
  render: () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {ALL_TYPES.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DataSheetStatusCell type={t} state="Default" width={220} />
          <span style={{ fontFamily, fontSize: 11, color: '#a6a8b2' }}>{t}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States — Green type',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetStatusCell type="Green (Waiting for Release)" state={s} />
          {lbl(s)}
        </div>
      ))}
    </div>
  ),
};

// ─── All Types × All States ───────────────────────────────────────────────────

export const TypesAndStates: Story = {
  name: 'All Types × Key States',
  render: () => (
    <div>
      {(['Default','Default Selected','Disabled','Alert'] as DataSheetStatusCellState[]).map((s) => (
        <div key={s}>
          {sectionTitle(s)}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {ALL_TYPES.map((t) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <DataSheetStatusCell type={t} state={s} width={180} />
                {lbl(t.split(' ')[0])}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── With Info Icon ───────────────────────────────────────────────────────────

export const WithInfoIcon: Story = {
  name: 'With Info Icon',
  render: () => (
    <div>
      {sectionTitle('Default state — info circle')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_TYPES.slice(0, 5).map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetStatusCell type={t} state="Default" showInfoIcon="More info" />
            {lbl(t.split(' ')[0])}
          </div>
        ))}
      </div>
      {sectionTitle('Alert state — warning triangle')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_TYPES.slice(0, 5).map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetStatusCell type={t} state="Alert" showInfoIcon />
            {lbl(t.split(' ')[0])}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Full Status Column ───────────────────────────────────────────────────────

export const StatusColumn: Story = {
  name: 'Status Column in Table',
  render: () => (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <DataSheetTitle cellText="Order Status" width={200} showFilter filterApplied />
      <DataSheetStatusCell type="Green (Waiting for Release)" state="Default" />
      <DataSheetStatusCell type="Light Green (Order Reviewed)" state="Default" />
      <DataSheetStatusCell type="Blue (Order Released)" state="Default Selected" />
      <DataSheetStatusCell type="Orange (Waiting for Review)" state="Multiple Selected" />
      <DataSheetStatusCell type="Red (Failed/Canceled)" state="Alert" showInfoIcon="Order failed validation" />
      <DataSheetStatusCell type="Grey (Out of Frequency)" state="Disabled" />
      <DataSheetStatusCell type="Black (Non-Editable)" state="Disabled Selected" />
    </div>
  ),
};
