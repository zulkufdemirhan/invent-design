import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { lightTheme, darkTheme } from '../src/theme/antdTheme';

const preview: Preview = {
  globalTypes: {
    colorMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorMode: 'light',
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.colorMode === 'dark';
      const selectedTheme = isDark ? darkTheme : lightTheme;
      const algorithm = isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

      return (
        <ConfigProvider theme={{ ...selectedTheme, algorithm }}>
          <div
            style={{
              background: isDark ? '#17171a' : '#ffffff',
              padding: '24px',
              minHeight: '100vh',
              color: isDark ? '#e3e5ed' : '#2d2e33',
            }}
          >
            <Story />
          </div>
        </ConfigProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
