import { FadeIn } from "@harryk-ds/motion";
import { Button } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Motion/FadeIn",
  component: FadeIn,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FadeIn 컴포넌트는 Framer Motion을 사용한 페이드 인 애니메이션 컴포넌트입니다. 다양한 방향과 설정을 지원하며, `Button` 등의 UI 요소에 생동감을 더할 때 유용합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "range", min: 0.1, max: 2, step: 0.1 },
      description: "애니메이션 지속 시간 (초)",
    },
    delay: {
      control: { type: "range", min: 0, max: 2, step: 0.1 },
      description: "애니메이션 시작 전 지연 시간 (초)",
    },
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right", "none"],
      description: "나타날 방향",
    },
    distance: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "초기 이동 거리 (px)",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          minHeight: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: <Button>Fade In</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: "기본적인 FadeIn 효과입니다.",
      },
    },
  },
};

// 방향별 스토리
export const FromBottom: Story = {
  args: {
    direction: "up",
    children: <Button>Up Direction</Button>,
  },
};

export const FromTop: Story = {
  args: {
    direction: "down",
    children: <Button>Down Direction</Button>,
  },
};

export const FromLeft: Story = {
  args: {
    direction: "left",
    children: <Button>Left Direction</Button>,
  },
};

export const FromRight: Story = {
  args: {
    direction: "right",
    children: <Button>Right Direction</Button>,
  },
};

export const NoMovement: Story = {
  args: {
    direction: "none",
    children: <Button size="lg">Only Opacity</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: "움직임 없이 제자리에서 투명도만 변화하는 효과입니다.",
      },
    },
  },
};

// 시간 설정 스토리
export const SlowMotion: Story = {
  args: {
    duration: 1.5,
    children: <Button size="lg">Slow Motion (1.5s)</Button>,
  },
};

export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: <Button size="lg">Delayed (0.5s)</Button>,
  },
};

// 활용 예시
export const GroupAnimation: Story = {
  args: {
    children: null,
  },
  render: (_args) => (
    <div style={{ display: "flex", gap: "10px" }}>
      <FadeIn delay={0.1} direction="up">
        <Button size="sm">First</Button>
      </FadeIn>
      <FadeIn delay={0.2} direction="up">
        <Button size="sm">Second</Button>
      </FadeIn>
      <FadeIn delay={0.3} direction="up">
        <Button size="sm">Third</Button>
      </FadeIn>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "여러 요소에 순차적인 딜레이를 주어 리듬감 있는 UI를 구성할 수 있습니다.",
      },
    },
  },
};
