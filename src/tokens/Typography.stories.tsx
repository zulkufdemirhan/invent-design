import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography, Divider, Tag } from 'antd';
import {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeightPx,
  textStyles,
} from './typography';
import { themeColorsLight } from './colors';

const { Title } = Typography;

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface RowProps {
  label: string;
  size: number;
  lh: number;
  weight: number;
  tag?: string;
}

function TypeRow({ label, size, lh, weight, tag }: RowProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '160px 80px 80px 80px 1fr',
        alignItems: 'center',
        gap: 16,
        padding: '10px 0',
        borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
      }}
    >
      <span style={{ fontFamily, fontSize: 12, color: themeColorsLight.colorTextSecondary }}>{label}</span>
      <span style={{ fontFamily, fontSize: 12, color: themeColorsLight.colorTextTertiary }}>{size}px</span>
      <span style={{ fontFamily, fontSize: 12, color: themeColorsLight.colorTextTertiary }}>{lh}px</span>
      <span style={{ fontFamily, fontSize: 12, color: themeColorsLight.colorTextTertiary }}>{weight}</span>
      <span style={{ fontFamily, fontSize: size, lineHeight: `${lh}px`, fontWeight: weight }}>
        {tag ?? 'The quick brown fox jumps over the lazy dog'}
      </span>
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design Tokens/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography tokens from Figma — 3-Typography collection. Font: **Inter**. Weights: 400 / 500 / 600 / 700.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Font Family ──────────────────────────────────────────────────────────────

export const FontFamily: Story = {
  name: 'Font Family',
  render: () => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ fontFamily, fontSize: 48, fontWeight: 700, color: themeColorsLight.colorText }}>Inter</span>
        <Tag color="blue">Design System Font</Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {([
          ['Regular — 400', fontWeight.normal],
          ['Medium — 500', fontWeight.medium],
          ['Semi Bold — 600', fontWeight.semiStrong],
          ['Bold — 700', fontWeight.strong],
        ] as const).map(([label, weight]) => (
          <div key={label} style={{ fontFamily, fontSize: 20, fontWeight: weight, color: themeColorsLight.colorText }}>
            {label} — AaBbCcDdEeFfGg 0123456789
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Type Scale ───────────────────────────────────────────────────────────────

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 80px 80px 80px 1fr',
          gap: 16,
          padding: '8px 0',
          borderBottom: `2px solid ${themeColorsLight.colorBorder}`,
          marginBottom: 4,
        }}
      >
        {['Token', 'Size', 'Line H.', 'Weight', 'Preview'].map((h) => (
          <span key={h} style={{ fontFamily, fontSize: 11, fontWeight: fontWeight.medium, color: themeColorsLight.colorTextTertiary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Headings */}
      <div style={{ fontFamily, fontSize: 11, fontWeight: fontWeight.medium, color: themeColorsLight.colorTextSecondary, padding: '8px 0 4px' }}>HEADINGS</div>
      <TypeRow label="fontSizeHeading1" size={fontSize.fontSizeHeading1} lh={lineHeightPx.lineHeightHeading1} weight={fontWeight.strong}  tag="Heading 1 — 24px" />
      <TypeRow label="fontSizeHeading2" size={fontSize.fontSizeHeading2} lh={lineHeightPx.lineHeightHeading2} weight={fontWeight.strong}  tag="Heading 2 — 20px" />
      <TypeRow label="fontSizeHeading3" size={fontSize.fontSizeHeading3} lh={lineHeightPx.lineHeightHeading3} weight={fontWeight.strong}  tag="Heading 3 — 18px" />
      <TypeRow label="fontSizeHeading4" size={fontSize.fontSizeHeading4} lh={lineHeightPx.lineHeightHeading4} weight={fontWeight.strong}  tag="Heading 4 — 16px" />
      <TypeRow label="fontSizeHeading5" size={fontSize.fontSizeHeading5} lh={lineHeightPx.lineHeightHeading5} weight={fontWeight.semiStrong} tag="Heading 5 — 14px" />

      {/* Body */}
      <div style={{ fontFamily, fontSize: 11, fontWeight: fontWeight.medium, color: themeColorsLight.colorTextSecondary, padding: '12px 0 4px' }}>BODY</div>
      <TypeRow label="fontSizeXL"  size={fontSize.fontSizeXL}  lh={lineHeightPx.lineHeightXL}  weight={fontWeight.normal} />
      <TypeRow label="fontSizeLG"  size={fontSize.fontSizeLG}  lh={lineHeightPx.lineHeightLG}  weight={fontWeight.normal} />
      <TypeRow label="fontSize"    size={fontSize.fontSize}    lh={lineHeightPx.lineHeight}     weight={fontWeight.normal} tag="Base — 13px (default)" />
      <TypeRow label="fontSizeSM"  size={fontSize.fontSizeSM}  lh={lineHeightPx.lineHeightSM}  weight={fontWeight.normal} />
      <TypeRow label="fontSizeXS"  size={fontSize.fontSizeXS}  lh={lineHeightPx.lineHeightXS}  weight={fontWeight.normal} />
    </div>
  ),
};

// ─── Text Styles ──────────────────────────────────────────────────────────────

export const TextStyles: Story = {
  name: 'Composite Text Styles',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {(Object.entries(textStyles) as [keyof typeof textStyles, React.CSSProperties][]).map(([name, style]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 24,
            padding: '12px 0',
            borderBottom: `1px solid ${themeColorsLight.colorBorderSecondary}`,
          }}
        >
          <code style={{ fontFamily: 'monospace', fontSize: 11, color: themeColorsLight.colorPrimary, minWidth: 120 }}>
            textStyles.{name}
          </code>
          <span style={{ ...style, color: themeColorsLight.colorText }}>
            The quick brown fox — {style.fontSize}px / {style.lineHeight} / {style.fontWeight}
          </span>
        </div>
      ))}
    </div>
  ),
};

// ─── Usage Example ────────────────────────────────────────────────────────────

export const Usage: Story = {
  name: 'Usage Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      <div>
        <Title level={1} style={{ ...textStyles.heading1, margin: 0 }}>Dashboard Overview</Title>
        <Divider style={{ margin: '12px 0' }} />
      </div>
      <p style={{ ...textStyles.base, color: themeColorsLight.colorText }}>
        This example demonstrates how typography tokens compose into a real UI layout.
        All sizes, weights, and line heights come directly from the Figma token export.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...textStyles.sm, color: themeColorsLight.colorTextSecondary }}>SECTION LABEL</span>
        <span style={{ ...textStyles.heading4, color: themeColorsLight.colorText }}>Monthly Revenue</span>
        <span style={{ ...textStyles.heading2, color: themeColorsLight.colorSuccessText }}>$248,560</span>
        <span style={{ ...textStyles.xs, color: themeColorsLight.colorTextSecondary }}>+12.3% vs. last month</span>
      </div>
    </div>
  ),
};
