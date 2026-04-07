import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CubMenu, DEFAULT_MENU_ITEMS, DEFAULT_SECONDARY_ITEMS } from './CubMenu';
import { fontFamily } from '@/tokens/typography';

const meta: Meta<typeof CubMenu> = {
  title: 'Components/CubMenu',
  component: CubMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sidebar navigation menu matching the Cub Design System. Supports **Expanded** (250 px) and **Collapsed** (56 px icon-only) states.\n\n' +
          '- Pass `items` and `secondaryItems` to configure navigation links.\n' +
          '- Add `children` to any item to enable inline submenus (multi-level nesting supported).\n' +
          '- Use `selectedKey` to highlight the active leaf item.\n' +
          '- Use `openKeys` + `onOpenChange` for fully controlled submenu state.\n' +
          '- The Remi AI section can be hidden with `showRemi={false}`.',
      },
    },
  },
  argTypes: {
    collapsed:    { control: 'boolean' },
    brandName:    { control: 'text' },
    showRemi:     { control: 'boolean' },
    selectedKey:  { control: 'text' },
  },
  args: {
    collapsed:   false,
    brandName:   'invent.ai',
    showRemi:    true,
    selectedKey: 'home',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CubMenu>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── Expanded ─────────────────────────────────────────────────────────────────

export const Expanded: Story = {
  name: 'Expanded (250 px)',
  args: { collapsed: false, selectedKey: 'pricing' },
};

// ─── Collapsed ────────────────────────────────────────────────────────────────

export const Collapsed: Story = {
  name: 'Collapsed (56 px)',
  args: { collapsed: true, selectedKey: 'pricing' },
};

// ─── Side by Side ─────────────────────────────────────────────────────────────

export const SideBySide: Story = {
  name: 'Expanded & Collapsed — Side by Side',
  render: () => (
    <div style={{ display: 'flex', height: '100vh' }}>
      <CubMenu
        collapsed={false}
        selectedKey="home"
        items={DEFAULT_MENU_ITEMS}
        secondaryItems={DEFAULT_SECONDARY_ITEMS}
      />
      <CubMenu
        collapsed={true}
        selectedKey="home"
        items={DEFAULT_MENU_ITEMS}
        secondaryItems={DEFAULT_SECONDARY_ITEMS}
      />
    </div>
  ),
};

// ─── Interactive Toggle ───────────────────────────────────────────────────────

export const InteractiveToggle: Story = {
  name: 'Interactive — Toggle Collapsed/Expanded',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedKey, setSelectedKey] = useState('home');

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <CubMenu
          collapsed={collapsed}
          selectedKey={selectedKey}
          items={DEFAULT_MENU_ITEMS}
          secondaryItems={DEFAULT_SECONDARY_ITEMS}
          onItemClick={setSelectedKey}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            fontFamily,
            fontSize: 14,
            color: '#5d5f66',
            background: '#f2f3f7',
          }}
        >
          <button
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: '1px solid #dddee5',
              background: '#fff',
              cursor: 'pointer',
              fontFamily,
              fontSize: 13,
            }}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </button>
          <span>Active: <strong>{selectedKey}</strong></span>
        </div>
      </div>
    );
  },
};

// ─── Without Remi ─────────────────────────────────────────────────────────────

export const WithoutRemi: Story = {
  name: 'Without Remi Section',
  args: { showRemi: false },
};

// ─── Custom Items ─────────────────────────────────────────────────────────────

import {
  faHouse,
  faChartPie,
  faDatabase,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

export const CustomItems: Story = {
  name: 'Custom Items',
  args: {
    items: [
      { key: 'home',      label: 'Home',      icon: faHouse,    expandable: false },
      { key: 'analytics', label: 'Analytics', icon: faChartPie, expandable: true  },
      { key: 'data',      label: 'Data',      icon: faDatabase, expandable: true  },
    ],
    secondaryItems: [
      { key: 'settings', label: 'Settings', icon: faGear, expandable: false },
    ],
    brandName: 'My App',
    selectedKey: 'analytics',
  },
};

// ─── With Submenu Open ────────────────────────────────────────────────────────

export const WithSubmenuOpen: Story = {
  name: 'With Submenu Open (Transfer → Transfer Runs selected)',
  args: {
    collapsed: false,
    selectedKey: 'transfer-runs',
    openKeys: ['transfer'],
  },
};

// ─── Submenu Multi-level ──────────────────────────────────────────────────────

export const WithSubmenuNested: Story = {
  name: 'With Submenu Nested (Transfer → Reports open)',
  args: {
    collapsed: false,
    selectedKey: 'transfer-reports-monthly',
    openKeys: ['transfer'],
  },
};

// ─── Interactive Submenus ─────────────────────────────────────────────────────

export const InteractiveSubmenus: Story = {
  name: 'Interactive — Submenus + Collapse Toggle',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedKey, setSelectedKey] = useState('transfer-runs');

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <CubMenu
          collapsed={collapsed}
          selectedKey={selectedKey}
          items={DEFAULT_MENU_ITEMS}
          secondaryItems={DEFAULT_SECONDARY_ITEMS}
          onItemClick={setSelectedKey}
        />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            fontFamily,
            fontSize: 14,
            color: '#5d5f66',
            background: '#f2f3f7',
          }}
        >
          <button
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: '1px solid #dddee5',
              background: '#fff',
              cursor: 'pointer',
              fontFamily,
              fontSize: 13,
            }}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </button>
          <span>Active: <strong>{selectedKey}</strong></span>
          <span style={{ fontSize: 12, color: '#a6a8b2' }}>
            Click &ldquo;Transfer&rdquo; to open its submenu
          </span>
        </div>
      </div>
    );
  },
};
