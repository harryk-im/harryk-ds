import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { axe } from "vitest-axe";
import { Heading } from "./heading";
import { headingStyle } from "./heading.css";
import type {
  HeadingLevel,
  HeadingNativeTag,
  HeadingRoleTag,
} from "./heading.types";

const NATIVE_TAGS: { tag: HeadingNativeTag; level: HeadingLevel }[] = [
  { tag: "h1", level: 1 },
  { tag: "h2", level: 2 },
  { tag: "h3", level: 3 },
  { tag: "h4", level: 4 },
  { tag: "h5", level: 5 },
  { tag: "h6", level: 6 },
];

const ROLE_TAGS: { tag: HeadingRoleTag }[] = [
  { tag: "div" },
  { tag: "p" },
  { tag: "span" },
];

const LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5, 6];

describe("Heading", () => {
  // ① 렌더링 & 시맨틱 (필수)
  describe("렌더링 & 시맨틱", () => {
    it("children 텍스트를 보여줘요", () => {
      render(<Heading>메인 제목</Heading>);

      expect(screen.getByText("메인 제목")).toBeInTheDocument();
    });

    it("as를 생략하면 h1으로 렌더링돼요", () => {
      render(<Heading>메인 제목</Heading>);

      expect(screen.getByRole("heading", { level: 1 }).tagName).toBe("H1");
    });

    it.each(NATIVE_TAGS)(
      "$tag는 레벨 $level 제목으로 읽혀요",
      ({ tag, level }) => {
        render(<Heading as={tag}>제목</Heading>);

        expect(
          screen.getByRole("heading", { level, name: "제목" })
        ).toBeInTheDocument();
      }
    );

    it.each(ROLE_TAGS)(
      "$tag도 level을 받으면 그 레벨의 제목으로 읽혀요",
      ({ tag }) => {
        render(
          <Heading as={tag} level={3}>
            제목
          </Heading>
        );

        expect(
          screen.getByRole("heading", { level: 3, name: "제목" })
        ).toBeInTheDocument();
      }
    );
  });

  // ② Props → 속성/aria 변화
  // size·color·weight·align은 해시 클래스명만 바꾸는 순수 외형이라 검증하지 않아요.
  // 시각적 확인은 Storybook의 몫이에요. 여기서는 관찰 가능한 속성만 다뤄요.
  describe("Props와 aria", () => {
    it.each(ROLE_TAGS)(
      "$tag에는 role과 aria-level이 항상 함께 붙어요",
      ({ tag }) => {
        // aria-level 없이 role="heading"만 있으면 axe가 aria-required-attr로 잡고,
        // 스크린 리더도 계층을 읽지 못해요. 둘은 반드시 짝이어야 해요.
        render(
          <Heading as={tag} level={2}>
            제목
          </Heading>
        );

        const heading = screen.getByText("제목");
        expect(heading).toHaveAttribute("role", "heading");
        expect(heading).toHaveAttribute("aria-level", "2");
      }
    );

    it.each(LEVELS)("level %i이 그대로 aria-level로 이어져요", (level) => {
      render(
        <Heading as="div" level={level}>
          제목
        </Heading>
      );

      expect(screen.getByRole("heading", { level })).toBeInTheDocument();
    });

    it.each(NATIVE_TAGS)(
      "$tag에는 중복되는 role·aria-level을 덧붙이지 않아요",
      ({ tag }) => {
        render(<Heading as={tag}>제목</Heading>);

        const heading = screen.getByRole("heading");
        expect(heading).not.toHaveAttribute("role");
        expect(heading).not.toHaveAttribute("aria-level");
      }
    );
  });

  // ③ 상호작용
  // Heading은 클릭·키보드 조작이 없는 표시용 요소예요.
  // 다만 페이지 이동 뒤 제목으로 포커스를 옮기는 패턴을 받쳐줘야 해요.
  describe("상호작용", () => {
    it("tabIndex를 주면 포커스를 옮길 수 있어요", () => {
      render(<Heading tabIndex={-1}>메인 제목</Heading>);

      const heading = screen.getByRole("heading");
      heading.focus();

      expect(heading).toHaveFocus();
    });

    it("tabIndex가 없으면 탭 순서에 끼어들지 않아요", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Heading>메인 제목</Heading>
          <a href="#next">다음</a>
        </>
      );

      await user.tab();

      expect(screen.getByRole("link", { name: "다음" })).toHaveFocus();
    });
  });

  // ④ 계약 유지 (API Contract)
  describe("계약(Contract)", () => {
    it("ref를 실제 h 요소로 전달해요", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      render(<Heading ref={ref}>제목</Heading>);

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it("div·span으로 렌더링해도 ref를 그 요소로 전달해요", () => {
      const divRef = React.createRef<HTMLDivElement>();
      const spanRef = React.createRef<HTMLSpanElement>();
      render(
        <>
          <Heading as="div" level={2} ref={divRef}>
            div 제목
          </Heading>
          <Heading as="span" level={3} ref={spanRef}>
            span 제목
          </Heading>
        </>
      );

      expect(divRef.current).toBeInstanceOf(HTMLDivElement);
      expect(spanRef.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("as를 바꾸면 ref가 새 요소를 가리켜요", () => {
      const ref = React.createRef<HTMLHeadingElement>();
      const { rerender } = render(
        <Heading as="h1" ref={ref}>
          제목
        </Heading>
      );
      expect(ref.current?.tagName).toBe("H1");

      rerender(
        <Heading as="h2" ref={ref}>
          제목
        </Heading>
      );

      expect(ref.current?.tagName).toBe("H2");
    });

    it("사용자 className을 내부 스타일과 함께 병합해요", () => {
      render(<Heading className="custom">제목</Heading>);

      expect(screen.getByRole("heading")).toHaveClass(
        headingStyle({
          size: "3xl",
          color: "black",
          weight: "bold",
          align: "left",
        }),
        "custom"
      );
    });

    it("지정하지 않은 속성은 루트 요소로 전달돼요", () => {
      render(
        <Heading title="섹션 제목" data-testid="heading">
          제목
        </Heading>
      );

      const heading = screen.getByRole("heading");
      expect(heading).toHaveAttribute("title", "섹션 제목");
      expect(heading).toHaveAttribute("data-testid", "heading");
    });

    it("size를 바꿔도 제목 레벨은 그대로예요", () => {
      // as는 의미 계층, size는 보이는 크기예요. 이 둘이 다시 묶이면
      // 크기를 조절하려다 문서 구조가 조용히 바뀌어요.
      render(
        <Heading as="h3" size="2xs">
          작게 보이는 h3
        </Heading>
      );

      expect(
        screen.getByRole("heading", { level: 3, name: "작게 보이는 h3" })
      ).toBeInTheDocument();
    });

    it("div·span도 size와 무관하게 level이 유지돼요", () => {
      render(
        <Heading as="div" level={5} size="3xl">
          크게 보이는 5단계 제목
        </Heading>
      );

      expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument();
    });
  });

  // ⑤ 접근성 (필수) — 정적(axe) + 동적(이름·포커스)
  describe("접근성", () => {
    it.each(NATIVE_TAGS)(
      "$tag 제목에서 접근성 위반이 없어요",
      async ({ tag }) => {
        const { container } = render(<Heading as={tag}>제목</Heading>);

        expect(await axe(container)).toHaveNoViolations();
      }
    );

    it.each(ROLE_TAGS)(
      "$tag 제목에서 접근성 위반이 없어요",
      async ({ tag }) => {
        const { container } = render(
          <Heading as={tag} level={2}>
            제목
          </Heading>
        );

        expect(await axe(container)).toHaveNoViolations();
      }
    );

    it("children 텍스트가 그대로 접근 가능한 이름이 돼요", () => {
      render(<Heading>분기별 실적</Heading>);

      expect(screen.getByRole("heading")).toHaveAccessibleName("분기별 실적");
    });
  });

  // ⑥ 위험 및 엣지 케이스 (Risk & Edge Cases)
  describe("위험 · 엣지 케이스", () => {
    it("아주 긴 텍스트도 잘리지 않고 그대로 남아요", () => {
      // 좁은 화면에서 줄바꿈되는 모습은 외형이라 Storybook에서 확인해요.
      const long = "아주 긴 제목 ".repeat(100);
      render(<Heading>{long}</Heading>);

      expect(screen.getByRole("heading")).toHaveTextContent(long.trim());
    });

    it("children이 없어도 에러 없이 렌더링돼요", () => {
      render(<Heading data-testid="heading" />);

      expect(screen.getByTestId("heading").tagName).toBe("H1");
    });

    it("중첩 요소를 넣어도 접근 가능한 이름이 유지돼요", () => {
      render(
        <Heading>
          분기별 <span>실적</span>
        </Heading>
      );

      expect(screen.getByRole("heading")).toHaveAccessibleName("분기별 실적");
    });
  });
});
