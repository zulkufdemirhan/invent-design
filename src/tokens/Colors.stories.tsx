import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, Tag } from 'antd';
import {
  themeColorsLight,
  themeColorsDark,
  baseColorPalettes,
  dataTableColorsLight,
  dataTableColorsDark,
} from './colors';

const { Title, Text } = Typography;

// ─── Helper components ─────────────────────────────────────────────────────────

function ColorSwatch({ name, value }: { name: string; value: string }) {
  const isLight = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return true;
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.6;
  };

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : null;
  }

  const textColor = value.startsWith('rgba') || value.startsWith('rgb')
    ? '#000'
    : isLight(value) ? '#000' : '#fff';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 160 }}>
      <div
        title={value}
        style={{
          background: value,
          height: 56,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 10, color: textColor, fontFamily: 'monospace', padding: '0 4px', wordBreak: 'break-all', textAlign: 'center' }}>
          {value}
        </span>
      </div>
      <Text style={{ fontSize: 11, wordBreak: 'break-all' }}>{name}</Text>
    </div>
  );
}

function ColorGroup({ title, colors }: { title: string; colors: Record<string, string> }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Title level={5} style={{ marginBottom: 12 }}>{title}</Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {Object.entries(colors).map(([name, value]) => (
          <ColorSwatch key={name} name={name} value={value} />
        ))}
      </div>
    </div>
  );
}

// ─── Group theme colors by category ────────────────────────────────────────────

function groupThemeColors(colors: Record<string, string>) {
  const groups: Record<string, Record<string, string>> = {};
  for (const [key, value] of Object.entries(colors)) {
    let group = 'Other';
    if (key.startsWith('colorPrimary')) group = 'Primary';
    else if (key.startsWith('colorRemi')) group = 'Remi';
    else if (key.startsWith('colorSuccess')) group = 'Success';
    else if (key.startsWith('colorWarning')) group = 'Warning';
    else if (key.startsWith('colorError')) group = 'Error';
    else if (key.startsWith('colorInfo')) group = 'Info';
    else if (key.startsWith('colorLink')) group = 'Link';
    else if (key.startsWith('colorText')) group = 'Text';
    else if (key.startsWith('colorBorder')) group = 'Border';
    else if (key.startsWith('colorFill')) group = 'Fill';
    else if (key.startsWith('colorBg')) group = 'Background';
    if (!groups[group]) groups[group] = {};
    groups[group][key] = value;
  }
  return groups;
}

function groupPaletteColors(colors: Record<string, string>) {
  const groups: Record<string, Record<string, string>> = {};
  for (const [key, value] of Object.entries(colors)) {
    const match = key.match(/^([a-z]+)-\d+$/);
    const group = match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : 'Other';
    if (!groups[group]) groups[group] = {};
    groups[group][key] = value;
  }
  return groups;
}

// ─── Story components ───────────────────────────────────────────────────────────

function ThemeColorsStory({ mode }: { mode: 'light' | 'dark' }) {
  const colors = mode === 'light' ? themeColorsLight : themeColorsDark;
  const groups = groupThemeColors(colors as Record<string, string>);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Tag color={mode === 'light' ? 'blue' : 'purple'}>{mode.toUpperCase()} MODE</Tag>
      </div>
      {Object.entries(groups).map(([group, groupColors]) => (
        <ColorGroup key={group} title={group} colors={groupColors} />
      ))}
    </div>
  );
}

function PaletteStory() {
  const groups = groupPaletteColors(baseColorPalettes as Record<string, string>);
  return (
    <div>
      {Object.entries(groups).map(([group, colors]) => (
        <ColorGroup key={group} title={group} colors={colors} />
      ))}
    </div>
  );
}

function DataTableColorsStory({ mode }: { mode: 'light' | 'dark' }) {
  const colors = mode === 'light' ? dataTableColorsLight : dataTableColorsDark;
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Tag color={mode === 'light' ? 'blue' : 'purple'}>{mode.toUpperCase()} MODE</Tag>
      </div>
      <ColorGroup title="Data Table" colors={colors as Record<string, string>} />
    </div>
  );
}

// ─── Meta ───────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Figma color tokens — 1-Colors collection. Light & Dark modes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ThemeLight: Story = {
  name: 'Theme Colors — Light',
  render: () => <ThemeColorsStory mode="light" />,
};

export const ThemeDark: Story = {
  name: 'Theme Colors — Dark',
  render: () => <ThemeColorsStory mode="dark" />,
};

export const BasePalettes: Story = {
  name: 'Base Color Palettes',
  render: () => <PaletteStory />,
};

export const DataTableLight: Story = {
  name: 'Data Table Colors — Light',
  render: () => <DataTableColorsStory mode="light" />,
};

export const DataTableDark: Story = {
  name: 'Data Table Colors — Dark',
  render: () => <DataTableColorsStory mode="dark" />,
};
