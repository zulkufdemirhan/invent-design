import type { Meta, StoryObj } from '@storybook/react';
import { DataTableContainer } from './DataTableContainer';
import { themeColorsLight } from '@/tokens/colors';
import { textStyles } from '@/tokens/typography';

const meta: Meta<typeof DataTableContainer> = {
  title: 'DataTable/DataTableContainer',
  component: DataTableContainer,
  parameters: { layout: 'padded' },
  argTypes: {
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof DataTableContainer>;

export const Default: Story = {
  args: {
    height: 320,
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          ...textStyles.sm,
          color: themeColorsLight.colorTextTertiary,
        }}
      >
        DataSheet cells render here
      </div>
    ),
  },
};

export const FullHeight: Story = {
  args: {
    height: '100%',
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: 200,
          ...textStyles.sm,
          color: themeColorsLight.colorTextTertiary,
        }}
      >
        Fills parent container height
      </div>
    ),
  },
};
