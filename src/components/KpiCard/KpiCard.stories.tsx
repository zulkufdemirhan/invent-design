import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCartShopping, faDollarSign, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { KpiCard } from './KpiCard';
import type { KpiCardProps } from './KpiCard';

const meta: Meta<typeof KpiCard> = {
  title: 'Components/KpiCard',
  component: KpiCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'KPI Card — displays a key performance indicator with optional trend diff, description, icon, and CTA buttons. Supports 2 sizes, 5 states, and 4 container styles.',
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'positive', 'negative', 'warning', 'custom'],
      description: 'Drives value/diff text color',
    },
    size: {
      control: 'radio',
      options: ['large', 'small'],
    },
    container: {
      control: 'select',
      options: ['none', 'simple', 'gray', 'gray-borderless'],
    },
    title: { control: 'text' },
    value: { control: 'text' },
    diff: { control: 'text' },
    description: { control: 'text' },
    titleTooltip: { control: 'text' },
    showDiff: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showTitleIcon: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    customColor: { control: 'color' },
  },
  args: {
    title: 'Total Lost Margin',
    value: '8,356',
    diff: '11.5%',
    description: 'This is a description',
    titleTooltip: 'More info about this metric',
    icon: <FontAwesomeIcon icon={faTruck} />,
    showDiff: true,
    showDescription: true,
    showTitleIcon: true,
    showIcon: true,
    size: 'large',
    container: 'simple',
    state: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof KpiCard>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ───────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['default', 'positive', 'negative', 'warning'] as const).map((state) => (
        <KpiCard
          key={state}
          title="Total Lost Margin"
          value="8,356"
          diff="11.5%"
          description="vs. last period"
          titleTooltip="Metric info"
          icon={<FontAwesomeIcon icon={faTruck} />}
          state={state}
          container="simple"
          size="large"
          showDiff
          showDescription
          showTitleIcon
          showIcon
        />
      ))}
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Large vs Small',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <KpiCard
        title="Total Lost Margin"
        value="8,356"
        diff="11.5%"
        description="vs. last period"
        icon={<FontAwesomeIcon icon={faTruck} />}
        state="positive"
        container="simple"
        size="large"
      />
      <KpiCard
        title="Total Lost Margin"
        value="8,356"
        diff="11.5%"
        description="vs. last period"
        icon={<FontAwesomeIcon icon={faTruck} />}
        state="positive"
        container="simple"
        size="small"
      />
    </div>
  ),
};

// ─── Containers ───────────────────────────────────────────────────────────────

export const Containers: Story = {
  name: 'All Containers',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 16, background: '#f2f3f7' }}>
      {(['none', 'simple', 'gray', 'gray-borderless'] as const).map((container) => (
        <KpiCard
          key={container}
          title="Total Lost Margin"
          value="8,356"
          diff="11.5%"
          description={container}
          icon={<FontAwesomeIcon icon={faTruck} />}
          state="positive"
          container={container}
          size="large"
        />
      ))}
    </div>
  ),
};

// ─── With Actions ─────────────────────────────────────────────────────────────

export const WithActions: Story = {
  name: 'With CTA Buttons',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <KpiCard
        title="Total Lost Margin"
        value="8,356"
        diff="11.5%"
        description="vs. last period"
        icon={<FontAwesomeIcon icon={faTruck} />}
        state="negative"
        container="simple"
        size="large"
        actions={[
          { label: 'Analyze', onClick: () => alert('Analyze clicked') },
          { label: 'Export', onClick: () => alert('Export clicked') },
        ]}
      />
      <KpiCard
        title="Revenue"
        value="$124,890"
        diff="3.2%"
        description="vs. last month"
        icon={<FontAwesomeIcon icon={faDollarSign} />}
        state="positive"
        container="simple"
        size="large"
        actions={[
          { label: 'View', onClick: () => alert('View clicked') },
          { label: 'Share', onClick: () => alert('Share clicked') },
        ]}
      />
    </div>
  ),
};

// ─── No Container ─────────────────────────────────────────────────────────────

export const NoContainer: Story = {
  name: 'No Container (bare)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <KpiCard
        title="Orders"
        value="1,240"
        diff="5.0%"
        description="Today"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        state="positive"
        container="none"
        size="large"
      />
      <KpiCard
        title="Orders"
        value="1,240"
        diff="5.0%"
        description="Today"
        icon={<FontAwesomeIcon icon={faCartShopping} />}
        state="negative"
        container="none"
        size="small"
      />
    </div>
  ),
};

// ─── Minimal ─────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  name: 'Minimal (value only)',
  render: () => (
    <KpiCard
      title="Conversion Rate"
      value="4.7%"
      state="default"
      container="simple"
      size="large"
      showDiff={false}
      showDescription={false}
      showTitleIcon={false}
      showIcon={false}
    />
  ),
};

// ─── Dashboard Grid ───────────────────────────────────────────────────────────

export const DashboardGrid: Story = {
  name: 'Dashboard Grid',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 24, background: '#f2f3f7', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KpiCard title="Total Revenue" value="$248,560" diff="12.3%" description="vs. last month" icon={<FontAwesomeIcon icon={faDollarSign} />} state="positive" container="simple" size="large" />
        <KpiCard title="Total Orders" value="3,842" diff="4.5%" description="vs. last month" icon={<FontAwesomeIcon icon={faCartShopping} />} state="positive" container="simple" size="large" />
        <KpiCard title="Lost Margin" value="$8,356" diff="11.5%" description="vs. last month" icon={<FontAwesomeIcon icon={faTruck} />} state="negative" container="simple" size="large" />
        <KpiCard title="Return Rate" value="2.1%" diff="0.3%" description="vs. last month" icon={<FontAwesomeIcon icon={faArrowTrendUp} />} state="warning" container="simple" size="large" />
        <KpiCard title="Avg. Order Value" value="$64.70" diff="1.8%" description="vs. last month" state="default" container="simple" size="large" showIcon={false} />
        <KpiCard title="Conversion" value="4.7%" diff="0.2%" description="vs. last month" state="positive" container="gray" size="large" showIcon={false} />
        <KpiCard title="Bounce Rate" value="38.4%" diff="2.1%" description="vs. last month" state="negative" container="gray" size="large" showIcon={false} />
        <KpiCard title="Sessions" value="18,920" diff="6.7%" description="vs. last month" state="positive" container="gray-borderless" size="large" showIcon={false} />
      </div>
    </div>
  ),
};
