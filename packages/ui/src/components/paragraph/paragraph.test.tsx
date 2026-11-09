import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { axe } from "vitest-axe";
import { Paragraph } from "./paragraph";
import { paragraphLinkStyle, paragraphStyle } from "./paragraph.css";

const expectedText = (variants: Parameters<typeof paragraphStyle>[0] = {}) =>
  paragraphStyle({ size: "md", color: "black", weight: "normal", ...variants });

describe("Paragraph", () => {
  // ① 렌더링 & 시맨틱
  describe("렌더링 & 시맨틱", () => {
    it("문단(p)으로 children을 보여줘요", () => {
      render(<Paragraph>안녕하세요</Paragraph>);

      expect(screen.getByRole("paragraph")).toHaveTextContent("안녕하세요");
    });

    it("Text는 문단 안에 들어갈 수 있는 인라인 요소(span)로 보여줘요", () => {
      render(
        <Paragraph>
          <Paragraph.Text>강조</Paragraph.Text>
        </Paragraph>
      );

      expect(screen.getByText("강조").tagName).toBe("SPAN");
    });

    it("Link는 링크 역할과 접근 가능한 이름을 가져요", () => {
      render(<Paragraph.Link href="/docs">문서 보기</Paragraph.Link>);

      expect(screen.getByRole("link", { name: "문서 보기" })).toHaveAttribute(
        "href",
        "/docs"
      );
    });
  });

  // ② Props → 속성 변화
  describe("Props와 상태", () => {
    it("Link는 target과 rel을 기본으로 추가하지 않아요", () => {
      render(<Paragraph.Link href="/docs">문서 보기</Paragraph.Link>);

      const link = screen.getByRole("link", { name: "문서 보기" });
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("Link에 명시한 target과 rel을 그대로 전달해요", () => {
      render(
        <Paragraph.Link href="/docs" target="_blank" rel="noopener noreferrer">
          문서 보기
        </Paragraph.Link>
      );

      const link = screen.getByRole("link", { name: "문서 보기" });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("Link에 target을 넘기면 그 값을 따라요", () => {
      render(
        <Paragraph.Link href="/docs" target="_self">
          문서 보기
        </Paragraph.Link>
      );

      expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
    });

    it("Paragraph에 정한 스타일을 하위 Text가 물려받아요", () => {
      render(
        <Paragraph size="lg" color="grey" weight="bold">
          <Paragraph.Text>상속</Paragraph.Text>
        </Paragraph>
      );

      expect(screen.getByText("상속")).toHaveClass(
        expectedText({ size: "lg", color: "grey", weight: "bold" })
      );
    });

    it("Text에 직접 넘긴 props가 부모 스타일보다 우선해요", () => {
      render(
        <Paragraph size="lg" color="grey">
          <Paragraph.Text color="dark">덮어쓰기</Paragraph.Text>
        </Paragraph>
      );

      expect(screen.getByText("덮어쓰기")).toHaveClass(
        expectedText({ size: "lg", color: "dark" })
      );
    });

    it("Link는 부모 색상과 상관없이 파란색을 쓰고, 크기·굵기는 물려받아요", () => {
      render(
        <Paragraph size="sm" color="grey" weight="bold">
          <Paragraph.Link href="/docs">문서 보기</Paragraph.Link>
        </Paragraph>
      );

      const link = screen.getByRole("link");
      expect(link).toHaveClass(
        expectedText({ size: "sm", color: "blue", weight: "bold" })
      );
      expect(link).toHaveClass(
        paragraphLinkStyle({ color: "blue", size: "sm" })
      );
    });

    it("Link에 color를 넘기면 hover 스타일도 그 색상을 따라가요", () => {
      render(
        <Paragraph.Link href="/docs" color="grey">
          문서 보기
        </Paragraph.Link>
      );

      expect(screen.getByRole("link")).toHaveClass(
        paragraphLinkStyle({ color: "grey", size: "md" })
      );
    });

    it("Paragraph 밖에서 쓴 Text는 기본 스타일(md, black, normal)을 써요", () => {
      render(<Paragraph.Text>단독</Paragraph.Text>);

      expect(screen.getByText("단독")).toHaveClass(expectedText());
    });
  });

  // ③ 상호작용
  describe("상호작용", () => {
    it("Link를 누르면 onClick을 호출해요", async () => {
      const onClick = vi.fn((event: React.MouseEvent) =>
        event.preventDefault()
      );
      const user = userEvent.setup();

      render(
        <Paragraph.Link href="#section" onClick={onClick}>
          이동
        </Paragraph.Link>
      );
      await user.click(screen.getByRole("link"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Tab으로 Link에 도달하고 Enter로 열 수 있어요", async () => {
      const onClick = vi.fn((event: React.MouseEvent) =>
        event.preventDefault()
      );
      const user = userEvent.setup();

      render(
        <Paragraph>
          본문과{" "}
          <Paragraph.Link href="#section" onClick={onClick}>
            이동
          </Paragraph.Link>
        </Paragraph>
      );
      await user.tab();
      expect(screen.getByRole("link")).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Text는 Tab 순서에 끼어들지 않아요", async () => {
      const user = userEvent.setup();

      render(
        <Paragraph>
          <Paragraph.Text>강조</Paragraph.Text>
          <Paragraph.Link href="#section">이동</Paragraph.Link>
        </Paragraph>
      );
      await user.tab();

      expect(screen.getByRole("link")).toHaveFocus();
    });
  });

  // ④ 계약 유지
  describe("API 계약", () => {
    it("ref가 각 요소의 DOM으로 전달돼요", () => {
      const pRef = React.createRef<HTMLParagraphElement>();
      const spanRef = React.createRef<HTMLSpanElement>();
      const aRef = React.createRef<HTMLAnchorElement>();

      render(
        <Paragraph ref={pRef}>
          <Paragraph.Text ref={spanRef}>텍스트</Paragraph.Text>
          <Paragraph.Link ref={aRef} href="/docs">
            링크
          </Paragraph.Link>
        </Paragraph>
      );

      expect(pRef.current).toBeInstanceOf(HTMLParagraphElement);
      expect(spanRef.current).toBeInstanceOf(HTMLSpanElement);
      expect(aRef.current).toBeInstanceOf(HTMLAnchorElement);
      expect(pRef.current).toBe(screen.getByRole("paragraph"));
      expect(spanRef.current).toBe(screen.getByText("텍스트"));
      expect(aRef.current).toBe(screen.getByRole("link"));
    });

    it("사용자 className을 내부 스타일과 병합해요", () => {
      render(
        <Paragraph className="p-class">
          <Paragraph.Text className="text-class">텍스트</Paragraph.Text>
          <Paragraph.Link href="/docs" className="link-class">
            링크
          </Paragraph.Link>
        </Paragraph>
      );

      expect(screen.getByRole("paragraph")).toHaveClass(
        expectedText(),
        "p-class"
      );
      expect(screen.getByText("텍스트")).toHaveClass(
        expectedText(),
        "text-class"
      );
      expect(screen.getByRole("link")).toHaveClass(
        expectedText({ color: "blue" }),
        paragraphLinkStyle({ color: "blue", size: "md" }),
        "link-class"
      );
    });

    it("나머지 props를 루트 요소로 전달해요", () => {
      render(
        <Paragraph title="소개" aria-live="polite">
          <Paragraph.Text data-testid="text" lang="en">
            Hello
          </Paragraph.Text>
          <Paragraph.Link href="/docs" data-track="docs-link">
            링크
          </Paragraph.Link>
        </Paragraph>
      );

      const paragraph = screen.getByRole("paragraph");
      expect(paragraph).toHaveAttribute("title", "소개");
      expect(paragraph).toHaveAttribute("aria-live", "polite");
      expect(screen.getByTestId("text")).toHaveAttribute("lang", "en");
      expect(screen.getByRole("link")).toHaveAttribute(
        "data-track",
        "docs-link"
      );
    });
  });

  // ⑤ 접근성
  describe("접근성", () => {
    it("Text와 Link를 함께 써도 접근성 위반이 없어요", async () => {
      const { container } = render(
        <Paragraph>
          본문 <Paragraph.Text weight="bold">강조</Paragraph.Text>{" "}
          <Paragraph.Link href="https://example.com">외부 링크</Paragraph.Link>
        </Paragraph>
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it("글자 없는 Link도 aria-label로 이름을 줄 수 있어요", () => {
      render(<Paragraph.Link href="/docs" aria-label="문서 보기" />);

      expect(screen.getByRole("link")).toHaveAccessibleName("문서 보기");
    });
  });

  // ⑥ 위험 및 엣지 케이스
  describe("위험 및 엣지 케이스", () => {
    it("한 Text의 덮어쓰기가 형제 Text로 새지 않아요", () => {
      render(
        <Paragraph color="grey">
          <Paragraph.Text color="blue">첫째</Paragraph.Text>
          <Paragraph.Text>둘째</Paragraph.Text>
        </Paragraph>
      );

      expect(screen.getByText("둘째")).toHaveClass(
        expectedText({ color: "grey" })
      );
    });

    it("children 없이도 문단 구조를 유지해요", () => {
      render(<Paragraph />);

      expect(screen.getByRole("paragraph")).toBeEmptyDOMElement();
    });
  });
});
