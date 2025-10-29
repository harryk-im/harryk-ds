import { Button } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button 컴포넌트는 다양한 variant와 size를 지원하는 기본 버튼 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "outline"],
      description: "버튼의 스타일 variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼의 크기",
    },
    children: {
      control: { type: "text" },
      description: "버튼 내부 텍스트",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼 비활성화 상태",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "기본 버튼",
  },
};

// Variant 스토리들
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "기본 버튼",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "윤곽선 버튼",
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: "sm",
    children: "작은 버튼",
  },
};
export const Medium: Story = {
  args: {
    size: "md",
    children: "중간 버튼",
  },
};
export const Large: Story = {
  args: {
    size: "lg",
    children: "큰 버튼",
  },
};

// 상태 스토리들
export const Disabled: Story = {
  args: {
    children: "비활성화된 버튼",
    disabled: true,
  },
};
