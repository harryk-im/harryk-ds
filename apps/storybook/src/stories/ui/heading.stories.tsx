import { Heading } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "페이지나 섹션의 제목을 렌더링하는 컴포넌트예요. `as` prop에 따라 적절한 HTML 태그로 변환됩니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "div"],
      description: "사용할 HTML 태그를 선택해요.",
    },
    size: {
      control: { type: "select" },
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description:
        "제목의 크기를 선택해요. 지정하지 않으면 태그에 맞는 기본값이 적용돼요.",
    },
    color: {
      control: { type: "select" },
      options: ["black", "grey", "lightGrey"],
      description: "제목의 색상을 선택해요.",
    },
    weight: {
      control: { type: "select" },
      options: ["bold", "normal"],
      description: "제목의 굵기를 선택해요.",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "텍스트 정렬을 선택해요.",
    },
    children: {
      control: { type: "text" },
      description: "제목으로 표시할 내용이에요.",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    as: "h1",
    children: "Heading 기본 스토리에요",
  },
};

// Tags (Hierarchy) 스토리들
export const H1: Story = {
  args: {
    as: "h1",
    children: "H1 메인 제목 (3xl)",
  },
};

export const H2: Story = {
  args: {
    as: "h2",
    children: "H2 섹션 제목 (2xl)",
  },
};

export const H3: Story = {
  args: {
    as: "h3",
    children: "H3 서브 제목 (xl)",
  },
};

export const H4: Story = {
  args: {
    as: "h4",
    children: "H4 상세 제목 (lg)",
  },
};

// Color 스토리들
export const Black: Story = {
  args: {
    color: "black",
    children: "Black Heading",
  },
};

export const Grey: Story = {
  args: {
    color: "grey",
    children: "Grey Heading",
  },
};

export const LightGrey: Story = {
  args: {
    color: "lightGrey",
    children: "Light Grey Heading",
  },
};

// Alignment 스토리들
export const AlignCenter: Story = {
  args: {
    align: "center",
    children: "중앙 정렬된 제목",
  },
  parameters: {
    layout: "padded",
  },
};

export const AlignRight: Story = {
  args: {
    align: "right",
    children: "우측 정렬된 제목",
  },
  parameters: {
    layout: "padded",
  },
};

// Size Override 스토리
export const SizeOverride: Story = {
  args: {
    as: "h1",
    size: "sm",
    children: "h1 태그이지만 sm 크기로 보여짐",
  },
  parameters: {
    docs: {
      description: {
        story:
          "태그의 계층 구조는 유지하되, 시각적인 크기만 변경하고 싶을 때 `size` prop을 사용해요.",
      },
    },
  },
};
