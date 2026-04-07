'use client';

import React, { useRef } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { lightTheme } from '@/theme/antdTheme';

export default function AntdRegistry({ children }: { children: React.ReactNode }) {
  const cache = useRef(createCache());

  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache.current, true) }}
    />
  ));

  return (
    <StyleProvider cache={cache.current}>
      <ConfigProvider theme={lightTheme}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
