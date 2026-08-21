# 컴포넌트 테스트 스펙 (Component Testing Spec)

이 문서는 **UI 컴포넌트**의 테스트를 작성할 때 준수해야 할 검증 범위와 규약을 정의해요.
공통 원칙(실패할 수 있는 테스트, TDD, 레이어 경계)은 [testing.md](./testing.md)를 먼저 읽어주세요.

---

## 1. 파일 구조 및 네이밍

- **위치**: 컴포넌트와 **같은 폴더에 위치**해요. → `packages/ui/src/components/{name}/{name}.test.tsx`
- **describe 블록**: `describe("{ComponentName}", ...)` 형태로 컴포넌트명을 그대로 사용해요.
- **it 설명**: 구현이 아닌 **사용자 관점의 행동**을 해요체로 적어요.
  - 옳은 예: `"loading이면 클릭이 막혀요"`
  - 틀린 예: `"disabled 속성이 true가 돼요"`

---

## 2. 검증 범위 (Verification Scope)

각 UI 컴포넌트는 아래 6개 범주를 기준으로 필요한 항목을 테스트해요.
전부 채울 필요는 없지만 **① 렌더링·⑤ 접근성은 필수**이고, 상태나 상호작용이 있는 컴포넌트는 **⑥ 위험·엣지 케이스도 반드시** 포함해요.
각 항목은 "이걸 깨뜨리는 버그가 무엇일지" 떠올릴 수 있을 때만 의미가 있어요.

### ① 렌더링 & 시맨틱 (필수)
- 올바른 role과 접근 가능한 이름(name)으로 렌더링되나요?
- children이 화면에 노출되나요?
- 시맨틱 태그(`<button>`, `<h1>` 등)를 사용하나요?

```tsx
render(<Button>클릭</Button>);
expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
```

### ② Props → 속성/aria 변화
- variant/state props가 **관찰 가능한 속성**(aria-*, disabled, type 등)으로 이어지나요?
- **금지**: variant가 특정 vanilla-extract 클래스명을 갖는지 검증하지 마세요. 해시가 바뀌면 깨져요. 외형은 Storybook에서 수동으로 확인해요.

```tsx
render(<Button loading>저장</Button>);
const button = screen.getByRole("button");
expect(button).toBeDisabled();
expect(button).toHaveAttribute("aria-busy", "true");
```

### ③ 상호작용 (Interaction)
- 클릭/키보드 입력이 기대한 핸들러를 호출하나요? (`@testing-library/user-event` 사용)
- **무음 장애 차단**: `disabled`/`loading` 상태에서 `onClick`이 호출되지 **않아야** 해요.

```tsx
const onClick = vi.fn();
const user = userEvent.setup();

render(<Button loading onClick={onClick}>저장</Button>);
await user.click(screen.getByRole("button"));
expect(onClick).not.toHaveBeenCalled();
```

### ④ 계약 유지 (API Contract)
- `ref`가 실제 DOM 요소로 전달되나요? (`forwardRef` 계약)
- 사용자 `className`이 내부 스타일과 **병합**되나요? (덮어쓰지 않아요)
- 명시하지 않은 나머지 props(`...props`)가 루트 요소로 전달되나요?

```tsx
const ref = React.createRef<HTMLButtonElement>();
render(
  <Button ref={ref} className="my-class" data-testid="save">
    저장
  </Button>
);

const button = screen.getByRole("button");
expect(ref.current).toBeInstanceOf(HTMLButtonElement); // forwardRef 계약
expect(button).toHaveAttribute("data-testid", "save"); // ...props 전달
expect(button).toHaveClass("my-class");                // className 병합

// toHaveClass 만으로는 덮어썼는지 못 잡아요. 내부 클래스가 함께 남아 있는지도 확인해요.
expect(button.className.trim().split(/\s+/).length).toBeGreaterThan(1);
```

### ⑤ 접근성 (a11y, 필수)

`axe`는 **정적 위반**만 잡아요(색 대비, 누락된 라벨 등). 키보드 함정·포커스 순서·"Escape로 닫히는가" 같은 **동적 계약은 못 잡아요.** 그래서 axe는 최소선일 뿐, 아래 계약을 상호작용 테스트로 함께 검증해요.

- **자동 위반 0건**: `expect(await axe(container)).toHaveNoViolations()`
- **접근 가능한 이름**: 요소가 올바른 이름을 갖고, 장식 요소가 이름을 오염시키지 않나요? (`toHaveAccessibleName`)
- **키보드 조작**: Tab으로 도달하고 Enter/Space로 활성화되나요? `disabled`는 포커스·활성화가 막히나요?
- **포커스 관리**: (모달 등) 열릴 때 포커스가 옮겨지고, Escape로 닫히며, 닫힌 뒤 트리거로 돌아오나요?
- **ARIA 상태의 진실성**: `aria-busy`/`aria-expanded`/`aria-pressed`가 실제 상태와 일치하나요? 장식 레이어에 `aria-hidden`이 있나요?

```tsx
import { axe } from "vitest-axe";

const { container } = render(<Button>클릭</Button>);
expect(await axe(container)).toHaveNoViolations();
expect(screen.getByRole("button")).toHaveAccessibleName("클릭");
```

> **주의**: `axe`가 색 대비 위반을 잡는다고 해서 안심하면 안 돼요. vanilla-extract가 클래스로 색을 주입하고 jsdom이 계산된 색을 해석하지 못해서, 실제로는 상당수 조합이 자동 검출되지 않아요. 대비는 별도로 감사해야 해요.

### ⑥ 위험 및 엣지 케이스 (Risk & Edge Cases)

정상 경로가 아니라 **깨질 만한 곳**을 노려요. 이 범주가 "실패할 수 있는 테스트"의 핵심이에요.

- **극단 입력**: 빈 children, 아주 긴 텍스트에도 role·구조·접근 이름이 유지되나요?
- **상태 충돌 조합**: `disabled + loading`처럼 상반되거나 겹치는 상태에서도 안전하게 동작하나요?
- **중복·연속 이벤트**: `loading` 중 연타나 빠른 더블클릭에 핸들러가 과호출되지 않나요?
- **무음 장애**: 막아야 할 동작이 조용히 실행되거나, 실행돼야 할 동작이 소리 없이 무시되지 않나요?
- **회귀 가드**: 과거에 발생한 버그를 **재현하는 실패 테스트**를 남겨 재발을 막아요.

```tsx
// loading 중에는 몇 번을 눌러도 onClick이 새지 않아야 해요.
const onClick = vi.fn();
const user = userEvent.setup();

render(<Button loading onClick={onClick}>저장</Button>);
await user.click(screen.getByRole("button"));
await user.click(screen.getByRole("button"));
expect(onClick).not.toHaveBeenCalled();
```

---

## 3. 도구 & Import

| 목적 | 도구 |
|------|------|
| 렌더 & 조회 | `@testing-library/react` (`render`, `screen`) |
| 사용자 상호작용 | `@testing-library/user-event` |
| 접근성 | `vitest-axe` (`axe`, `toHaveNoViolations`) |

---

## 4. 조회 우선순위 (Query Priority)

접근성 친화적인 순서로 요소를 찾아요. 위쪽을 우선 사용해요.

1. `getByRole` (가장 권장 — 접근성 트리 기반)
2. `getByLabelText` / `getByPlaceholderText`
3. `getByText`
4. `getByTestId` (다른 방법이 없을 때만 최후의 수단)

> `container.querySelector`나 클래스명 기반 조회는 지양해요. 구현 세부에 결합돼요.

---

## 5. 컴포넌트 테스트 안티 패턴 (하지 말 것)

- **해시 클래스명 스냅샷**: vanilla-extract가 생성한 클래스명을 `toBe`/스냅샷으로 고정하지 마세요.
- **픽셀/색상 검증**: 자동화 범위 밖이에요. "Button이 `blue[300]`을 쓰는가" 같은 외형은 Storybook에서 수동으로 확인하고 Vitest에서는 하지 마세요.
- **구현 세부 검증**: 내부 state·함수 호출 횟수 등 사용자가 관측할 수 없는 것을 테스트하지 마세요.
