import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DataSheetFunctionCell } from './DataSheetFunctionCell';
import type { DataSheetFunctionCellState, DataSheetFunctionCellType } from './DataSheetFunctionCell';
import { fontFamily } from '@/tokens/typography';

const meta: Meta<typeof DataSheetFunctionCell> = {
  title: 'Data Table/DataSheetFunctionCell',
  component: DataSheetFunctionCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Data table cell containing interactive controls: Checkbox, Radio, or Toggle (Switch).\n\n**Row Select** variants are compact (43px wide) — control only, no label.\n\n**Toggle Only** shows just the switch with no label.',
      },
    },
  },
  argTypes: {
    type:  { control: 'select', options: ['Checkbox','Checkbox Row Select','Radio','Radio Row Select','Toggle','Toggle Only'] },
    state: { control: 'select', options: ['Default','Hover','Selected','Selected Hover','Disabled','Disabled Selected','Alert','Alert Selected'] },
    label: { control: 'text' },
    showInfoIcon: { control: 'text', description: 'true/string shows info icon; Alert state shows warning triangle' },
    width: { control: 'number' },
  },
  args: {
    label: 'Option label',
    state: 'Default',
    type: 'Checkbox',
    showInfoIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataSheetFunctionCell>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const label = (text: string) => (
  <div style={{ fontFamily, fontSize: 10, color: '#a6a8b2', textAlign: 'center', padding: '3px 0' }}>{text}</div>
);
const sectionTitle = (text: string) => (
  <p style={{ fontFamily, fontSize: 11, color: '#8d8f99', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '20px 0 8px' }}>{text}</p>
);

const ALL_STATES: DataSheetFunctionCellState[] = ['Default','Hover','Selected','Selected Hover','Disabled','Disabled Selected','Alert','Alert Selected'];
const FULL_TYPES: DataSheetFunctionCellType[] = ['Checkbox','Radio','Toggle','Toggle Only'];
const ROW_SELECT_TYPES: DataSheetFunctionCellType[] = ['Checkbox Row Select','Radio Row Select'];

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All States ───────────────────────────────────────────────────────────────

export const CheckboxStates: Story = {
  name: 'Checkbox — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetFunctionCell type="Checkbox" state={s} label="Checkbox" />
          {label(s)}
        </div>
      ))}
    </div>
  ),
};

export const RadioStates: Story = {
  name: 'Radio — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetFunctionCell type="Radio" state={s} label="Radio button" />
          {label(s)}
        </div>
      ))}
    </div>
  ),
};

export const ToggleStates: Story = {
  name: 'Toggle — All States',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <DataSheetFunctionCell type="Toggle" state={s} label="Lorem Ipsum" />
          {label(s)}
        </div>
      ))}
    </div>
  ),
};

// ─── Row Select ───────────────────────────────────────────────────────────────

export const RowSelectVariants: Story = {
  name: 'Row Select (compact, 43px)',
  render: () => (
    <div>
      {sectionTitle('Checkbox Row Select')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_STATES.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DataSheetFunctionCell type="Checkbox Row Select" state={s} />
            {label(s)}
          </div>
        ))}
      </div>
      {sectionTitle('Radio Row Select')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {ALL_STATES.map((s) => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <DataSheetFunctionCell type="Radio Row Select" state={s} />
            {label(s)}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Toggle Only ──────────────────────────────────────────────────────────────

export const ToggleOnly: Story = {
  name: 'Toggle Only',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ALL_STATES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DataSheetFunctionCell type="Toggle Only" state={s} />
          {label(s)}
        </div>
      ))}
    </div>
  ),
};

// ─── All Types side-by-side ───────────────────────────────────────────────────

export const AllTypesSideBySide: Story = {
  name: 'All Types — Default vs Selected',
  render: () => (
    <div>
      {(['Default', 'Selected', 'Disabled', 'Disabled Selected', 'Alert', 'Alert Selected'] as DataSheetFunctionCellState[]).map((s) => (
        <div key={s}>
          {sectionTitle(s)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
            {(['Checkbox','Radio','Toggle','Toggle Only','Checkbox Row Select','Radio Row Select'] as DataSheetFunctionCellType[]).map((t) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <DataSheetFunctionCell type={t} state={s} label="Option" />
                {label(t.replace(' Row Select', '\nRow Select'))}
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
      {sectionTitle('Default — info circle')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {FULL_TYPES.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetFunctionCell type={t} state="Default" label="Option" showInfoIcon="Tooltip text" />
            {label(t)}
          </div>
        ))}
      </div>
      {sectionTitle('Alert — warning triangle (red)')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {FULL_TYPES.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetFunctionCell type={t} state="Alert" label="Option" showInfoIcon />
            {label(t)}
          </div>
        ))}
      </div>
      {sectionTitle('Disabled — dimmed info')}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {FULL_TYPES.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <DataSheetFunctionCell type={t} state="Disabled" label="Option" showInfoIcon />
            {label(t)}
          </div>
        ))}
      </div>
    </div>
  ),
};
