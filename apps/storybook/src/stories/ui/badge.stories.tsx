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
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 사용법이에요. (blue · fill · md)",
      },
    },
  },
};

// Color 스토리들
export const Blue: Story = {
  args: {
    color: "blue",
    children: "Blue",
  },
  parameters: {
    docs: {
      description: {
        story: "주요 정보에 사용하는 파란색이에요.",
      },
    },
  },
};

export const Red: Story = {
  args: {
    color: "red",
    children: "Red",
  },
  parameters: {
    docs: {
      description: {
        story: "오류나 경고처럼 주의가 필요한 정보에 사용하는 빨간색이에요.",
      },
    },
  },
};

export const Grey: Story = {
  args: {
    color: "grey",
    children: "Grey",
  },
  parameters: {
    docs: {
      description: {
        story: "보조 정보에 사용하는 회색이에요.",
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

export const Weak: Story = {
  args: {
    variant: "weak",
    children: "Weak",
  },
  parameters: {
    docs: {
      description: {
        story:
          "옅은 바닥 위에 반투명 색상 레이어를 덧입힌 스타일이에요. 덜 강조되는 정보에 적합해요.",
      },
    },
  },
};

// 조합 모음 스토리들
export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: "제공되는 3가지 색상이에요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Badge color="blue">Blue</Badge>
      <Badge color="red">Red</Badge>
      <Badge color="grey">Grey</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "색상별 fill · weak 스타일을 한눈에 비교해보세요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <Badge color="blue" variant="fill">
          Blue Fill
        </Badge>
        <Badge color="red" variant="fill">
          Red Fill
        </Badge>
        <Badge color="grey" variant="fill">
          Grey Fill
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <Badge color="blue" variant="weak">
          Blue Weak
        </Badge>
        <Badge color="red" variant="weak">
          Red Weak
        </Badge>
        <Badge color="grey" variant="weak">
          Grey Weak
        </Badge>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "제공되는 4가지 크기예요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Badge size="xs">XSmall</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
