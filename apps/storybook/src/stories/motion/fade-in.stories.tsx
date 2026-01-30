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
          "FadeIn 컴포넌트는 화면에 요소가 부드럽게 나타나도록 도와줘요. 여러 방향과 속도를 조절할 수 있어, 버튼 같은 UI 요소에 생동감을 더하고 싶을 때 사용하면 좋아요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "range", min: 0.1, max: 2, step: 0.1 },
      description: "애니메이션이 지속되는 시간이에요. (초 단위)",
    },
    delay: {
      control: { type: "range", min: 0, max: 2, step: 0.1 },
      description:
        "애니메이션이 시작되기 전까지 기다리는 시간이에요. (초 단위)",
    },
    direction: {
      control: { type: "select" },
      options: ["up", "down", "left", "right", "none"],
      description: "요소가 어느 방향에서 나타날지 선택해주세요.",
    },
    distance: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description:
        "처음 위치에서 얼마나 떨어져서 시작할지 정해주세요. (픽셀 단위)",
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
        story: "가장 기본적인 페이드인 효과예요.",
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
        story: "위치 이동 없이 제자리에서 투명도만 부드럽게 변해요.",
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
      <FadeIn delay={0.06} direction="up">
        <Button size="sm">First</Button>
      </FadeIn>
      <FadeIn delay={0.12} direction="up">
        <Button size="sm">Second</Button>
      </FadeIn>
      <FadeIn delay={0.18} direction="up">
        <Button size="sm">Third</Button>
      </FadeIn>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "여러 요소에 시간차를 두고 효과를 적용하면, 화면이 더욱 리듬감 있고 풍성해 보여요.",
      },
    },
  },
};
