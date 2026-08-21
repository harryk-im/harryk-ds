import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { axe } from "vitest-axe";
import { Button } from "./button";
import { buttonStyle } from "./button.css";

describe("Button", () => {
  // ① 렌더링 & 시맨틱 (필수)
  describe("렌더링 & 시맨틱", () => {
    it("버튼 역할과 children 텍스트를 렌더링해요", () => {
      render(<Button>클릭</Button>);

      expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
    });

    it("기본 type은 button이에요", () => {
      // 네이티브 기본값은 submit이라, 이 기본값이 빠지면 폼에서 의도치 않게
      // 제출이 일어나요. 기본값을 지우면 이 테스트가 빨갛게 돼요.
      render(<Button>클릭</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  // ② Props → 속성/aria 변화
  // color·size·fullWidth는 해시 클래스명만 바꾸는 순수 외형이라 검증하지 않아요.
  // 시각적 확인은 Storybook의 몫이에요. 여기서는 관찰 가능한 속성만 다뤄요.
  describe("Props와 상태", () => {
    it("type을 지정하면 그 값을 사용해요", () => {
      render(<Button type="submit">전송</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("disabled면 비활성화돼요", () => {
      render(<Button disabled>비활성</Button>);

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("loading이면 비활성화되고 aria-busy를 표시해요", () => {
      render(<Button loading>저장 중</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("loading이 아니면 aria-busy가 false예요", () => {
      render(<Button>클릭</Button>);

      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "false");
    });

    it("weak 스타일은 장식 레이어를 추가하고 fill은 추가하지 않아요", () => {
      const { rerender } = render(<Button variant="weak">취소</Button>);
      expect(
        screen.getByRole("button").querySelector('[aria-hidden="true"]')
      ).toBeInTheDocument();

      rerender(<Button variant="fill">확인</Button>);
      expect(
        screen.getByRole("button").querySelector('[aria-hidden="true"]')
      ).toBeNull();
    });
  });

  // ③ 상호작용
  describe("상호작용", () => {
    it("클릭하면 onClick 핸들러를 호출해요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={onClick}>확인</Button>);
      await user.click(screen.getByRole("button"));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("키보드 Enter로 활성화돼요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={onClick}>확인</Button>);
      await user.tab();
      await user.keyboard("{Enter}");

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("키보드 Space로 활성화돼요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={onClick}>확인</Button>);
      await user.tab();
      await user.keyboard("[Space]");

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("disabled면 클릭이 막혀요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={onClick}>
          비활성
        </Button>
      );
      await user.click(screen.getByRole("button"));

      expect(onClick).not.toHaveBeenCalled();
    });

    it("loading이면 클릭이 막혀요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button loading onClick={onClick}>
          저장
        </Button>
      );
      await user.click(screen.getByRole("button"));

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // ④ 계약 유지 (API Contract)
  describe("계약(Contract)", () => {
    it("ref를 실제 button 요소로 전달해요", () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>저장</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("사용자 className을 내부 스타일과 함께 병합해요", () => {
      render(<Button className="custom">저장</Button>);

      expect(screen.getByRole("button")).toHaveClass(buttonStyle({}), "custom");
    });

    it("지정하지 않은 속성은 button 요소로 전달돼요", () => {
      render(
        <Button data-testid="save" aria-label="저장 버튼">
          저장
        </Button>
      );

      const button = screen.getByRole("button", { name: "저장 버튼" });
      expect(button).toHaveAttribute("data-testid", "save");
    });
  });

  // ⑤ 접근성 (필수) — 정적(axe) + 동적(키보드·포커스·이름)
  describe("접근성", () => {
    it.each([
      { label: "기본", ui: <Button>클릭</Button> },
      { label: "loading", ui: <Button loading>저장 중</Button> },
      { label: "weak", ui: <Button variant="weak">취소</Button> },
    ])("$label 상태에서 접근성 위반이 없어요", async ({ ui }) => {
      const { container } = render(ui);

      expect(await axe(container)).toHaveNoViolations();
    });

    it("접근 가능한 이름은 children에서 와요", () => {
      render(<Button>저장하기</Button>);

      expect(screen.getByRole("button")).toHaveAccessibleName("저장하기");
    });

    it("weak의 장식 레이어는 접근 이름을 오염시키지 않아요", () => {
      // backdrop이 aria-hidden을 잃으면 접근 이름에 섞여 이 단언이 깨져요.
      render(<Button variant="weak">취소</Button>);

      expect(screen.getByRole("button")).toHaveAccessibleName("취소");
    });

    it("활성 상태면 키보드로 포커스할 수 있어요", async () => {
      const user = userEvent.setup();
      render(<Button>확인</Button>);

      await user.tab();

      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("disabled면 키보드 포커스에서 건너뛰어져요", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Button disabled>비활성</Button>
          <a href="#next">다음</a>
        </>
      );

      await user.tab();

      // 실제 disabled 대신 aria-disabled로 바꾸면 버튼이 포커스를 받아
      // 이 테스트가 빨갛게 돼요 — 진짜 disabled를 강제하는 회귀 가드예요.
      expect(screen.getByRole("link", { name: "다음" })).toHaveFocus();
    });
  });

  // ⑥ 위험 및 엣지 케이스 (Risk & Edge Cases)
  describe("위험 · 엣지 케이스", () => {
    it("아주 긴 텍스트에도 역할과 접근 이름이 유지돼요", () => {
      const long = "저장".repeat(100);
      render(<Button>{long}</Button>);

      expect(screen.getByRole("button", { name: long })).toBeInTheDocument();
    });

    it("disabled와 loading이 함께 걸려도 안전하게 막혀요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled loading onClick={onClick}>
          저장
        </Button>
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");

      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });

    it("loading 중 연타·더블클릭에도 onClick이 새지 않아요", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button loading onClick={onClick}>
          저장
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);
      await user.click(button);
      await user.dblClick(button);

      // 로딩 상태의 무음 장애(중복 제출) 가드예요.
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
