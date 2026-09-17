import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { axe } from "vitest-axe";
import { Badge } from "./badge";
import { badgeStyle } from "./badge.css";

describe("Badge", () => {
  // ① 렌더링 & 시맨틱 (필수)
  describe("렌더링 & 시맨틱", () => {
    it("children 텍스트를 보여줘요", () => {
      render(<Badge>새 글</Badge>);

      expect(screen.getByText("새 글")).toBeInTheDocument();
    });

    it("인라인 span으로 렌더링돼요 (버튼·문단 안에 넣을 수 있어요)", () => {
      render(<Badge>새 글</Badge>);

      expect(screen.getByText("새 글").tagName).toBe("SPAN");
    });

    it("숫자 0도 숨기지 않고 그대로 보여줘요", () => {
      render(<Badge>{0}</Badge>);

      expect(screen.getByText("0")).toBeInTheDocument();
    });
  });

  // ② Props → 속성/aria 변화
  // color·variant·size는 해시 클래스명만 바꾸는 순수 외형이라 검증하지 않아요.
  // 시각적 확인은 Storybook의 몫이에요.

  // ③ 상호작용
  // Badge는 상호작용이 없는 표시용 요소예요. 포커스를 받지 않는 계약은 ⑤에서 다뤄요.

  // ④ 계약 유지 (API Contract)
  describe("계약(Contract)", () => {
    it("ref를 실제 span 요소로 전달해요", () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>새 글</Badge>);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("사용자 className을 내부 스타일과 함께 병합해요", () => {
      render(<Badge className="custom">새 글</Badge>);

      expect(screen.getByText("새 글")).toHaveClass(badgeStyle({}), "custom");
    });

    it("지정하지 않은 속성은 span 요소로 전달돼요", () => {
      render(
        <Badge title="새로 올라온 글" data-testid="badge">
          새 글
        </Badge>
      );

      const badge = screen.getByText("새 글");
      expect(badge).toHaveAttribute("title", "새로 올라온 글");
      expect(badge).toHaveAttribute("data-testid", "badge");
    });
  });

  // ⑤ 접근성 (필수) — 정적(axe) + 동적(역할 전달·포커스)
  describe("접근성", () => {
    it.each([
      { label: "fill", ui: <Badge>새 글</Badge> },
      { label: "weak", ui: <Badge variant="weak">임시 저장</Badge> },
      { label: "빈 fill", ui: <Badge /> },
      { label: "빈 weak", ui: <Badge variant="weak" /> },
    ])("$label 배지에서 접근성 위반이 없어요", async ({ ui }) => {
      const { container } = render(ui);

      expect(await axe(container)).toHaveNoViolations();
    });

    it("role과 aria 속성을 넘기면 스크린 리더가 찾을 수 있는 상태 영역이 돼요", () => {
      render(
        <Badge role="status" aria-label="읽지 않은 알림 3개">
          3
        </Badge>
      );

      expect(
        screen.getByRole("status", { name: "읽지 않은 알림 3개" })
      ).toHaveTextContent("3");
    });

    it("키보드 포커스를 받지 않고 다음 요소로 넘어가요", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Badge>새 글</Badge>
          <a href="#next">다음</a>
        </>
      );

      await user.tab();

      expect(screen.getByRole("link", { name: "다음" })).toHaveFocus();
    });
  });

  // ⑥ 위험 및 엣지 케이스 (Risk & Edge Cases)
  describe("위험 · 엣지 케이스", () => {
    it("아주 긴 텍스트도 잘리지 않고 그대로 남아요", () => {
      // nowrap으로 넘치는 모습은 외형이라 Storybook에서 확인해요.
      const long = "새 글".repeat(100);
      render(<Badge>{long}</Badge>);

      expect(screen.getByText(long)).toBeInTheDocument();
    });

    it.each([
      { label: "fill", variant: "fill" as const },
      { label: "weak", variant: "weak" as const },
    ])(
      "$label 배지는 children이 없어도 에러 없이 렌더링돼요",
      ({ variant }) => {
        render(<Badge variant={variant} data-testid="badge" />);

        expect(screen.getByTestId("badge").tagName).toBe("SPAN");
      }
    );
  });
});
