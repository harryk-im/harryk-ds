import { Button, Heading } from "@harryk-ds/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "페이지나 섹션의 제목을 렌더링하는 컴포넌트예요.",
          "",
          "`as`는 **의미 계층**을, `size`는 **보이는 크기**를 따로 담당해요. 두 값이 분리돼 있어서 문서 구조를 흐트러뜨리지 않고도 원하는 크기로 보여줄 수 있어요.",
          "",
          '`<button>`이나 `<label>` 안처럼 `h1`~`h6`을 넣을 수 없는 자리에는 `div`·`p`·`span`을 쓸 수 있어요. 이때는 `level`을 반드시 받아서 `role="heading"`과 `aria-level`로 제목 의미를 지켜줘요.',
        ].join("\n"),
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "div", "p", "span"],
      description:
        "사용할 HTML 태그를 선택해요. `div`·`p`·`span`을 고르면 `level`이 필요해요.",
    },
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description:
        "제목의 계층 레벨이에요. `as`가 `div`·`p`·`span`일 때만 쓰고, `h1`~`h6`일 때는 태그에 이미 담겨 있어서 받지 않아요.",
    },
    size: {
      control: { type: "select" },
      options: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      description:
        "제목의 크기를 선택해요. 지정하지 않으면 제목 레벨에 맞는 크기가 적용돼요.",
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

export const H5: Story = {
  args: {
    as: "h5",
    children: "H5 제목 (md)",
  },
};

export const H6: Story = {
  args: {
    as: "h6",
    children: "H6 제목 (sm)",
  },
};

// 전체 계층을 한눈에 비교하는 스토리
export const Hierarchy: Story = {
  args: {
    children: "제목 계층",
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "`size`를 지정하지 않으면 제목 레벨에 맞는 크기가 적용돼요. 레벨 1은 `3xl`, 레벨 6은 `sm`이에요.",
      },
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Heading as="h1">H1 메인 제목 (3xl)</Heading>
      <Heading as="h2">H2 섹션 제목 (2xl)</Heading>
      <Heading as="h3">H3 서브 제목 (xl)</Heading>
      <Heading as="h4">H4 상세 제목 (lg)</Heading>
      <Heading as="h5">H5 제목 (md)</Heading>
      <Heading as="h6">H6 제목 (sm)</Heading>
    </div>
  ),
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
          "태그의 계층 구조는 유지하되, 시각적인 크기만 변경하고 싶을 때 `size` prop을 사용해요. 화면에 보이는 크기가 바뀌어도 스크린 리더가 읽는 제목 레벨은 그대로예요.",
      },
    },
  },
};

// h 태그를 쓸 수 없는 자리를 위한 스토리들
export const SemanticDiv: Story = {
  args: {
    as: "div",
    level: 2,
    children: "div로 렌더링한 2단계 제목",
  },
  parameters: {
    docs: {
      description: {
        story:
          '`as`를 `div`·`p`·`span`으로 지정하면 `level`이 필요해요. 이 값이 `role="heading"`과 `aria-level`로 이어져서, 태그는 달라도 스크린 리더에는 제목으로 읽혀요. 크기도 같은 레벨의 `h` 태그와 똑같이 맞춰져요.',
      },
    },
  },
};

export const InsideButton: Story = {
  args: {
    children: "버튼 안 제목",
  },
  parameters: {
    docs: {
      description: {
        story:
          '`<button>` 안에는 `h1`~`h6`을 넣을 수 없어요. 이럴 때 `as="span"`과 `level`을 함께 쓰면 마크업 규칙을 지키면서 제목 의미도 남길 수 있어요.\n\n색이 있는 배경 위에 올릴 때는 대비를 확인해주세요. `Heading`의 기본 색은 `black`이라 파란 버튼 위에서는 3.71:1까지 떨어져요. 이 예시는 버튼이 정한 글자색을 물려받게 해서 5.36:1을 유지해요.',
      },
    },
  },
  render: () => (
    <Button color="blue" variant="fill" size="lg">
      {/*
        Heading의 기본 색은 black이라 파란 배경 위에서는 대비가 3.71:1까지 떨어져요.
        레벨 3(20px·bold)은 큰 텍스트로 쳐서 간신히 통과하지만, 레벨이 낮아지거나
        weight를 normal로 바꾸면 바로 AA 미달이에요.
        Button이 정한 흰 글자색을 그대로 물려받게 해서 5.36:1을 지켜요.
      */}
      <Heading as="span" level={3} style={{ color: "inherit" }}>
        결제 수단 변경
      </Heading>
    </Button>
  ),
};
