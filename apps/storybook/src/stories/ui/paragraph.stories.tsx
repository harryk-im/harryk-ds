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
          "문단 단위의 텍스트를 보여주는 컴포넌트예요. Paragraph.Text, Paragraph.Link와 함께 쓸 수 있어요.",
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
      options: ["black", "dark", "grey", "blue"],
      description: "텍스트의 색상을 선택해요.",
    },
    weight: {
      control: { type: "select" },
      options: ["bold", "normal"],
      description: "텍스트의 굵기를 선택해요.",
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "기본 Paragraph 컴포넌트예요.",
  },
  parameters: {
    docs: {
      description: {
        story: "Paragraph를 가장 간단하게 쓰는 방법이에요.",
      },
    },
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: `Paragraph.Text와 Paragraph.Link를 함께 쓴 예시예요.

- 부모 \`Paragraph\`에 정한 \`size="md"\`, \`color="black"\` 스타일을 하위 \`Text\`가 **그대로 물려받아요**.
- \`Link\`는 부모 색상과 상관없이 **링크 색상(blue)**으로 보여요.`,
      },
    },
  },
  render: (args) => (
    <Paragraph {...args}>
      <Paragraph.Text>부모 스타일을 물려받은 텍스트와 </Paragraph.Text>
      <Paragraph.Link href="https://github.com/harryk-im/harryk-ds">
        링크
      </Paragraph.Link>
      <Paragraph.Text weight="bold">가 들어 있는 문단이에요.</Paragraph.Text>
      Text나 Link 없이 글자만 넣어도 돼요.
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
        story: `하위 요소마다 스타일을 따로 덮어쓸(Override) 수 있어요.

- 첫 번째 \`Text\`는 \`color="dark"\`와 \`weight="bold"\`로 부모 스타일과 다르게 보여줘요.
- \`Link\`에 \`color="black"\`을 넣으면 기본 파란색 대신 **검은색 링크**를 만들 수 있어요.`,
      },
    },
  },
  render: (args) => (
    <Paragraph {...args}>
      <Paragraph.Text weight="bold" color="dark">
        이 부분만 굵고 짙은 회색이에요.
      </Paragraph.Text>
      <br />
      <Paragraph.Text size="xs">이 부분은 아주 작아요.</Paragraph.Text>
      <br />
      <Paragraph.Link href="#" color="black">
        이 링크는 검은색으로 바꿨어요.
      </Paragraph.Link>
    </Paragraph>
  ),
  args: {
    size: "lg",
    color: "grey",
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: "모든 크기를 한눈에 비교해보세요.",
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
        story: "쓸 수 있는 색상은 4가지예요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Paragraph color="black">Black (Default)</Paragraph>
      <Paragraph color="dark">Dark</Paragraph>
      <Paragraph color="grey">Grey</Paragraph>
      <Paragraph color="blue">Blue</Paragraph>
    </div>
  ),
};

export const LinkHoverColors: Story = {
  parameters: {
    docs: {
      description: {
        story: `\`Paragraph.Link\`에 마우스를 올리면 글자색만 바뀌어요.

| color | 기본 | hover |
|---|---|---|
| \`blue\` (기본) | \`blue[500]\` | \`blue[600]\` |
| \`black\` | \`black\` | \`black\` |
| \`dark\` | \`grey[900]\` | \`black\` |
| \`grey\` | \`grey[600]\` | \`grey[700]\` |`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Paragraph.Link href="#">Blue (Default)</Paragraph.Link>
      <Paragraph.Link href="#" color="black">
        Black
      </Paragraph.Link>
      <Paragraph.Link href="#" color="dark">
        Dark
      </Paragraph.Link>
      <Paragraph.Link href="#" color="grey">
        Grey
      </Paragraph.Link>
    </div>
  ),
};

export const Standalone: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Paragraph.Text와 Paragraph.Link는 Paragraph 없이 따로 써도 돼요.",
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
      <Paragraph.Text size="lg" weight="bold" color="blue">
        Paragraph 없이 쓴 Paragraph.Text
      </Paragraph.Text>
      <Paragraph.Link href="#" size="md">
        Paragraph 없이 쓴 Paragraph.Link
      </Paragraph.Link>
    </div>
  ),
};
