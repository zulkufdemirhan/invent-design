import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  faGear,
  faTag,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { CubTopNavigationBar } from './CubTopNavigationBar';
import { fontFamily } from '@/tokens/typography';

const meta: Meta<typeof CubTopNavigationBar> = {
  title: 'Components/CubTopNavigationBar',
  component: CubTopNavigationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Top navigation bar for the Cub Design System layout.\n\n' +
          '**Left side** — Breadcrumb trail (icon + labels separated by chevrons, 170 px max-width per label) + optional horizontal tab bar.\n\n' +
          '**Right side** — Action slot buttons (Config, Help, Quick Access, AI Notifications, Notifications w/ badge, Workflows) + circular user avatar.\n\n' +
          'All action slots are individually toggleable. Badge count of `0` hides the notification dot.',
      },
    },
  },
  argTypes: {
    showTabs:            { control: 'boolean' },
    showConfigShortcut:  { control: 'boolean' },
    showHelp:            { control: 'boolean' },
    showQuickAccess:     { control: 'boolean' },
    showAiNotifications: { control: 'boolean' },
    showNotifications:   { control: 'boolean' },
    showWorkflows:       { control: 'boolean' },
    notificationCount:   { control: 'number' },
    userInitials:        { control: 'text' },
    userColor:           { control: 'color' },
    activeTabKey:        { control: 'text' },
  },
  args: {
    showTabs:            true,
    showConfigShortcut:  false,
    showHelp:            true,
    showQuickAccess:     true,
    showAiNotifications: true,
    showNotifications:   true,
    showWorkflows:       true,
    notificationCount:   8,
    userInitials:        'EJ',
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f2f3f7', padding: 0 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CubTopNavigationBar>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Default (matches Figma exactly) ─────────────────────────────────────────

export const Default: Story = {
  name: 'Default — matches Figma',
  args: {
    breadcrumbs: [
      { key: 'b1', label: 'Menu Item', icon: faGear },
      { key: 'b2', label: 'Menu Item 2' },
      { key: 'b3', label: 'Menu Item 3' },
    ],
    tabs: [
      { key: 't1', label: 'Navigation Item' },
      { key: 't2', label: 'Navigation Item' },
      { key: 't3', label: 'Navigation Item' },
      { key: 't4', label: 'Navigation Item' },
    ],
    activeTabKey: 't1',
  },
};

// ─── With Config Shortcut ─────────────────────────────────────────────────────

export const WithConfigShortcut: Story = {
  name: 'With Config Shortcut Button',
  args: { showConfigShortcut: true },
};

// ─── No Tabs ──────────────────────────────────────────────────────────────────

export const NoTabs: Story = {
  name: 'Without Tab Bar',
  args: { showTabs: false },
};

// ─── Minimal Actions ──────────────────────────────────────────────────────────

export const MinimalActions: Story = {
  name: 'Minimal Actions (user avatar only)',
  args: {
    showHelp:            false,
    showQuickAccess:     false,
    showAiNotifications: false,
    showNotifications:   false,
    showWorkflows:       false,
  },
};

// ─── No Notifications ─────────────────────────────────────────────────────────

export const NoNotificationBadge: Story = {
  name: 'Notification Badge — hidden (count = 0)',
  args: { notificationCount: 0 },
};

export const HighNotificationCount: Story = {
  name: 'Notification Badge — large count (99+)',
  args: { notificationCount: 128 },
};

// ─── Long Breadcrumb labels (ellipsis) ───────────────────────────────────────

export const LongBreadcrumbs: Story = {
  name: 'Long Breadcrumb Labels (ellipsis at 170 px)',
  args: {
    breadcrumbs: [
      { key: 'b1', label: 'Inventory Management Module',       icon: faLayerGroup },
      { key: 'b2', label: 'DC Replenishment Orders Overview'                      },
      { key: 'b3', label: 'Store Inventory Positions Report'                      },
    ],
  },
};

// ─── Many Tabs (overflow scroll) ─────────────────────────────────────────────

export const ManyTabs: Story = {
  name: 'Many Tabs (horizontal scroll)',
  args: {
    tabs: [
      { key: 't1',  label: 'Overview'          },
      { key: 't2',  label: 'Store Scenario'    },
      { key: 't3',  label: 'Transfer Runs'     },
      { key: 't4',  label: 'Reports'           },
      { key: 't5',  label: 'Performance'       },
      { key: 't6',  label: 'Analytics'         },
      { key: 't7',  label: 'Configuration'     },
      { key: 't8',  label: 'Audit Log'         },
    ],
    activeTabKey: 't3',
  },
};

// ─── With custom breadcrumb icons ─────────────────────────────────────────────

export const WithModuleIcon: Story = {
  name: 'With Module-specific Breadcrumb Icon',
  args: {
    breadcrumbs: [
      { key: 'b1', label: 'Pricing',     icon: faTag },
      { key: 'b2', label: 'Promotions'               },
    ],
    tabs: [
      { key: 't1', label: 'Active Promotions'  },
      { key: 't2', label: 'Drafts'             },
      { key: 't3', label: 'Archived'           },
    ],
    activeTabKey: 't1',
  },
};

// ─── Interactive tab switching ────────────────────────────────────────────────

export const InteractiveTabs: Story = {
  name: 'Interactive — Tab Switching',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeTab, setActiveTab] = useState('t1');
    const tabs = [
      { key: 't1', label: 'Overview'       },
      { key: 't2', label: 'Store Scenario' },
      { key: 't3', label: 'Transfer Runs'  },
      { key: 't4', label: 'Reports'        },
    ];

    return (
      <div>
        <CubTopNavigationBar
          breadcrumbs={[
            { key: 'b1', label: 'Transfer', icon: faGear },
          ]}
          tabs={tabs}
          activeTabKey={activeTab}
          onTabChange={setActiveTab}
          notificationCount={3}
          userInitials="ZD"
        />
        <div
          style={{
            padding: 24,
            fontFamily,
            fontSize: 14,
            color: '#5d5f66',
          }}
        >
          Active tab: <strong>{tabs.find((t) => t.key === activeTab)?.label}</strong>
        </div>
      </div>
    );
  },
};

// ─── All actions visible ──────────────────────────────────────────────────────

export const AllActionsVisible: Story = {
  name: 'All Actions Visible',
  args: {
    showConfigShortcut:  true,
    showHelp:            true,
    showQuickAccess:     true,
    showAiNotifications: true,
    showNotifications:   true,
    showWorkflows:       true,
    notificationCount:   12,
    userInitials:        'AB',
  },
};
