import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { borderRadius, padding, margin } from './spacing';
import { fontFamily } from './typography';
import { themeColorsLight } from './colors';

const meta: Meta = {
  title: 'Design Tokens/Spacing & Radius',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing and border radius tokens from the Figma **2-Spacing & Radius** collection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sectionTitle = (text: string) => (
  <h3
    style={{
      fontFamily,
      fontSize: 11,
      fontWeight: 600,
      color: '#8d8f99',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
      margin: '24px 0 12px',
    }}
  >
    {text}
  </h3>
);

const tokenLabel = (name: string, value: string | number) => (
  <div style={{ fontFamily, fontSize: 11, color: '#8d8f99', marginTop: 6 }}>
    <span style={{ fontWeight: 600, color: '#3d3f4a' }}>{name}</span>
    <span style={{ marginLeft: 6, color: '#a6a8b2' }}>{value}px</span>
  </div>
);

// ─── Border Radius ────────────────────────────────────────────────────────────

export const BorderRadius: Story = {
  name: 'Border Radius',
  render: () => (
    <div>
      {sectionTitle('Border Radius')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
        {(Object.entries(borderRadius) as [string, number][]).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: themeColorsLight.colorPrimaryBg,
                border: `2px solid ${themeColorsLight.colorPrimary}`,
                borderRadius: value,
              }}
            />
            {tokenLabel(name, value)}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Padding ──────────────────────────────────────────────────────────────────

export const Padding: Story = {
  name: 'Padding',
  render: () => (
    <div>
      {sectionTitle('Padding')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
        {(Object.entries(padding) as [string, number][]).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Outer box */}
            <div
              style={{
                background: themeColorsLight.colorPrimaryBg,
                border: `1px dashed ${themeColorsLight.colorPrimaryBorder}`,
                padding: value,
                display: 'inline-flex',
              }}
            >
              {/* Inner box */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: themeColorsLight.colorPrimary,
                  borderRadius: 3,
                }}
              />
            </div>
            {tokenLabel(name, value)}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Margin ───────────────────────────────────────────────────────────────────

export const Margin: Story = {
  name: 'Margin',
  render: () => (
    <div>
      {sectionTitle('Margin')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
        {(Object.entries(margin) as [string, number][]).map(([name, value]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f7', padding: 4, borderRadius: 4 }}>
              {/* Box A */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: themeColorsLight.colorPrimary,
                  borderRadius: 3,
                  flexShrink: 0,
                }}
              />
              {/* Gap representing margin */}
              <div
                style={{
                  width: value,
                  height: 20,
                  background: `repeating-linear-gradient(
                    90deg,
                    ${themeColorsLight.colorPrimaryBg} 0px,
                    ${themeColorsLight.colorPrimaryBg} 2px,
                    transparent 2px,
                    transparent 4px
                  )`,
                  flexShrink: 0,
                }}
              />
              {/* Box B */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: themeColorsLight.colorPrimary,
                  borderRadius: 3,
                  flexShrink: 0,
                }}
              />
            </div>
            {tokenLabel(name, value)}
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── All Tokens ───────────────────────────────────────────────────────────────

export const AllTokens: Story = {
  name: 'All Tokens',
  render: () => (
    <div>
      {/* Border Radius table */}
      {sectionTitle('Border Radius')}
      <table style={{ fontFamily, fontSize: 13, borderCollapse: 'collapse', width: '100%', maxWidth: 480 }}>
        <thead>
          <tr style={{ background: '#f5f5f7' }}>
            {['Token', 'Value', 'Preview'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#3d3f4a', borderBottom: `1px solid ${themeColorsLight.colorBorder}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.entries(borderRadius) as [string, number][]).map(([name, value], i) => (
            <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '8px 12px', color: themeColorsLight.colorPrimary, fontWeight: 500 }}>{name}</td>
              <td style={{ padding: '8px 12px', color: '#3d3f4a' }}>{value}px</td>
              <td style={{ padding: '8px 12px' }}>
                <div style={{ width: 32, height: 32, background: themeColorsLight.colorPrimaryBg, border: `2px solid ${themeColorsLight.colorPrimary}`, borderRadius: value }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Padding table */}
      {sectionTitle('Padding')}
      <table style={{ fontFamily, fontSize: 13, borderCollapse: 'collapse', width: '100%', maxWidth: 480 }}>
        <thead>
          <tr style={{ background: '#f5f5f7' }}>
            {['Token', 'Value'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#3d3f4a', borderBottom: `1px solid ${themeColorsLight.colorBorder}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.entries(padding) as [string, number][]).map(([name, value], i) => (
            <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '8px 12px', color: themeColorsLight.colorPrimary, fontWeight: 500 }}>{name}</td>
              <td style={{ padding: '8px 12px', color: '#3d3f4a' }}>{value}px</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Margin table */}
      {sectionTitle('Margin')}
      <table style={{ fontFamily, fontSize: 13, borderCollapse: 'collapse', width: '100%', maxWidth: 480 }}>
        <thead>
          <tr style={{ background: '#f5f5f7' }}>
            {['Token', 'Value'].map((h) => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, color: '#3d3f4a', borderBottom: `1px solid ${themeColorsLight.colorBorder}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(Object.entries(margin) as [string, number][]).map(([name, value], i) => (
            <tr key={name} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '8px 12px', color: themeColorsLight.colorPrimary, fontWeight: 500 }}>{name}</td>
              <td style={{ padding: '8px 12px', color: '#3d3f4a' }}>{value}px</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
