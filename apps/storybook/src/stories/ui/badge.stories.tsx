import { Badge } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "다양한 색상, 스타일, 크기를 선택할 수 있는 뱃지예요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "뱃지의 색상을 선택해요.",
    },
    variant: {
      control: { type: "select" },
      options: ["fill", "outline", "weak"],
      description: "뱃지의 스타일을 선택해요.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "뱃지의 크기를 선택해요.",
    },
    children: {
      control: { type: "text" },
      description: "뱃지에 표시할 텍스트예요.",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: "뱃지",
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
        story: "주요 정보에 사용하는 기본 색상이에요.",
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
        story: "보조 정보에 사용하는 색상이에요.",
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

export const Weak: Story = {
  args: {
    variant: "weak",
    children: "Weak",
  },
  parameters: {
    docs: {
      description: {
        story: "배경색이 반투명한 스타일이에요.",
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
        story: "작은 크기의 뱃지예요.",
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
        story: "중간 크기의 뱃지예요.",
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
        story: "큰 크기의 뱃지예요.",
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

export const PrimaryWeak: Story = {
  args: {
    color: "primary",
    variant: "weak",
    children: "Primary Weak",
  },
  parameters: {
    docs: {
      description: {
        story: "Primary 색상의 Weak 스타일이에요. 배경이 반투명해요.",
      },
    },
  },
};

export const SecondaryWeak: Story = {
  args: {
    color: "secondary",
    variant: "weak",
    children: "Secondary Weak",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary 색상의 Weak 스타일이에요. 배경이 반투명해요.",
      },
    },
  },
};
