import { themeColorsLight } from '@/tokens/colors';
import { textStyles } from '@/tokens/typography';
import { padding } from '@/tokens/spacing';

export default function HomePage() {
  return (
    <div
      style={{
        padding: padding.paddingLG,
        display: 'flex',
        flexDirection: 'column',
        gap: padding.paddingSM,
      }}
    >
      <h1 style={{ ...textStyles.heading3, color: themeColorsLight.colorText, margin: 0 }}>
        Welcome to invent.ai
      </h1>
      <p style={{ ...textStyles.base, color: themeColorsLight.colorTextSecondary, margin: 0 }}>
        Select a module from the menu to get started.
      </p>
    </div>
  );
}
