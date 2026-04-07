import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary', 'dashed', 'text', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    danger: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    ghost: { control: 'boolean' },
    block: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
    type: 'default',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    type: 'primary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    type: 'primary',
    danger: true,
  },
};

export const Dashed: Story = {
  args: {
    label: 'Dashed',
    type: 'dashed',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    type: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    type: 'primary',
    loading: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    type: 'primary',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    type: 'primary',
    size: 'small',
  },
};
