import { Button } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 색상, 스타일, 크기를 선택할 수 있는 버튼이에요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "버튼의 색상을 선택해요.",
    },
    variant: {
      control: { type: "select" },
      options: ["fill", "outline"],
      description: "버튼의 스타일을 선택해요.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼의 크기를 선택해요.",
    },
    children: {
      control: { type: "text" },
      description: "버튼에 표시할 텍스트예요.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼을 비활성화해요.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "버튼",
  },
};

// Color 스토리들
export const Primary: Story = {
  args: {
    color: "primary",
    children: "Primary",
  },
  parameters: {
    docs: {
      description: {
        story: "주요 액션에 사용하는 기본 색상이에요.",
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    children: "Secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "보조 액션에 사용하는 색상이에요.",
      },
    },
  },
};

// Variant 스토리들
export const Fill: Story = {
  args: {
    variant: "fill",
    children: "Fill",
  },
  parameters: {
    docs: {
      description: {
        story: "배경색이 채워진 기본 스타일이에요.",
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
  parameters: {
    docs: {
      description: {
        story: "테두리만 있는 스타일이에요.",
      },
    },
  },
};

// Size 스토리들
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 버튼이에요.",
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 크기의 버튼이에요.",
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
  parameters: {
    docs: {
      description: {
        story: "큰 크기의 버튼이에요.",
      },
    },
  },
};

// 상태 스토리들
export const Disabled: Story = {
  args: {
    children: "비활성화",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "사용할 수 없는 상태의 버튼이에요.",
      },
    },
  },
};

// 조합 스토리들
export const PrimaryOutline: Story = {
  args: {
    color: "primary",
    variant: "outline",
    children: "Primary Outline",
  },
  parameters: {
    docs: {
      description: {
        story: "Primary 색상의 Outline 스타일이에요.",
      },
    },
  },
};

export const SecondaryOutline: Story = {
  args: {
    color: "secondary",
    variant: "outline",
    children: "Secondary Outline",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary 색상의 Outline 스타일이에요.",
      },
    },
  },
};
