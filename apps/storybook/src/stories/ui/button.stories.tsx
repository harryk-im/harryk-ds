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
        story: "주요 액션에 사용하는 파란색이에요.",
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
        story: "삭제처럼 주의가 필요한 액션에 사용하는 빨간색이에요.",
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
        story: "보조 액션에 사용하는 회색이에요.",
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
          "흰 배경 위에 옅은 색 레이어를 덧입힌 스타일이에요. 덜 강조되는 액션에 적합해요.",
      },
    },
  },
};

// 상태 스토리
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
      <Button color="blue">Blue</Button>
      <Button color="red">Red</Button>
      <Button color="grey">Grey</Button>
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
        <Button color="blue" variant="fill">
          Blue Fill
        </Button>
        <Button color="red" variant="fill">
          Red Fill
        </Button>
        <Button color="grey" variant="fill">
          Grey Fill
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <Button color="blue" variant="weak">
          Blue Weak
        </Button>
        <Button color="red" variant="weak">
          Red Weak
        </Button>
        <Button color="grey" variant="weak">
          Grey Weak
        </Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "제공되는 3가지 크기예요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
