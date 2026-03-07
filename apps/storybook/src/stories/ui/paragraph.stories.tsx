import { Paragraph } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "문단 단위의 텍스트를 렌더링하기 위한 컴포넌트예요. Paragraph.Text와 Paragraph.Link를 조합하여 사용할 수 있어요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description: "텍스트의 크기를 선택해요.",
    },
    color: {
      control: { type: "select" },
      options: ["black", "grey", "lightGrey", "blue"],
      description: "텍스트의 색상을 선택해요.",
    },
    bold: {
      control: { type: "boolean" },
      description: "텍스트의 굵기를 설정해요.",
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "이것은 기본적인 Paragraph 컴포넌트입니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "가장 기본적인 Paragraph 사용법이에요.",
      },
    },
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: `Paragraph.Text와 Paragraph.Link를 조합한 복합적인 구성이에요.

- 부모 \`Paragraph\`에서 정의한 \`size="md"\`, \`color="black"\` 스타일이 하위 \`Text\` 요소들에게 **상속**돼요.
- \`Link\` 컴포넌트는 부모의 색상을 무시하고 **고유의 링크 색상(blue)**을 유지해요.`,
      },
    },
  },
  render: (args) => (
    <Paragraph {...args}>
      <Paragraph.Text>부모의 스타일을 상속받는 텍스트와 </Paragraph.Text>
      <Paragraph.Link href="https://github.com/harryk-im/harryk-ds">
        링크
      </Paragraph.Link>
      <Paragraph.Text bold>가 포함된 문단입니다.</Paragraph.Text>
      Paragraph 컴포넌트만 내부에서 Text, Link 컴포넌트 없이도 사용이 가능해요.
    </Paragraph>
  ),
  args: {
    size: "md",
    color: "black",
  },
};

export const Overrides: Story = {
  parameters: {
    docs: {
      description: {
        story: `하위 요소에서 개별적으로 스타일을 덮어쓸(Override) 수 있어요.

- 첫 번째 \`Text\`는 \`color="grey"\`와 \`bold\`를 적용해 부모 스타일과 차별화를 뒀어요.
- \`Link\`에도 \`color="black"\`을 직접 지정하면, 기본 링크 색상인 파란색 대신 **검은색 링크**를 만들 수 있어요.`,
      },
    },
  },
  render: (args) => (
    <Paragraph {...args}>
      <Paragraph.Text bold color="grey">
        이 부분만 굵고 회색입니다.
      </Paragraph.Text>
      <br />
      <Paragraph.Text size="xs">이 부분은 매우 작습니다.</Paragraph.Text>
      <br />
      <Paragraph.Link href="#" color="black">
        이 링크는 검은색으로 오버라이드되었습니다.
      </Paragraph.Link>
    </Paragraph>
  ),
  args: {
    size: "lg",
    color: "lightGrey",
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "제공되는 다양한 사이즈를 한눈에 확인해보세요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Paragraph size="2xs">2XS (2xs)</Paragraph>
      <Paragraph size="xs">Extra Small (xs)</Paragraph>
      <Paragraph size="sm">Small (sm)</Paragraph>
      <Paragraph size="md">Medium (md)</Paragraph>
      <Paragraph size="lg">Large (lg)</Paragraph>
      <Paragraph size="xl">Extra Large (xl)</Paragraph>
      <Paragraph size="2xl">2XL</Paragraph>
      <Paragraph size="3xl">3XL</Paragraph>
    </div>
  ),
};

export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: "제공되는 4가지 색상이에요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Paragraph color="black">Black (Default)</Paragraph>
      <Paragraph color="grey">Grey</Paragraph>
      <Paragraph color="lightGrey">Light Grey</Paragraph>
      <Paragraph color="blue">Blue</Paragraph>
    </div>
  ),
};

export const Standalone: Story = {
  parameters: {
    docs: {
      description: {
        story: "Paragraph.Text와 Paragraph.Link는 독립적으로도 사용 가능해요.",
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
      }}
    >
      <Paragraph.Text size="lg" bold color="blue">
        독립적으로 사용된 Paragraph.Text
      </Paragraph.Text>
      <Paragraph.Link href="#" size="md">
        독립적으로 사용된 Paragraph.Link
      </Paragraph.Link>
    </div>
  ),
};
