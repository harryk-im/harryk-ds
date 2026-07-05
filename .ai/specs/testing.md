# 테스트 스펙 (Testing Spec)

이 문서는 `packages/ui` 컴포넌트의 테스트를 작성할 때 준수해야 할 **검증 범위**와 **팀 규약**을 정의해요.
`tester.md` 페르소나가 참조하는 단일 원천(SSOT)이에요.

---

## 0. 테스트 레이어 경계 (가장 먼저 읽어주세요)

자동화 테스트(**Vitest 레이어**)는 **"외형"이 아니라 "행동과 계약"만 검증**해요.
픽셀·색상·레이아웃 같은 **시각적 결과는 자동화 범위 밖**이며, 지금은 Storybook에서 **수동으로** 확인해요.
이 경계를 지켜야 스타일이 바뀌어도 깨지지 않는 견고한 테스트가 돼요.

| 대상 | 방식 | 책임 | 여기서 하지 말 것 |
|------|------|------|------------------|
| **행동/계약** | Vitest + RTL + vitest-axe (자동) | 렌더 시맨틱, props→속성/aria 변화, 상호작용, 접근성 | 픽셀·색상·해시 클래스명 검증 |
| **외형/시각** | Storybook (수동 확인) | 픽셀, 색상, 레이아웃, variant 외형 | — |

> **핵심 원칙**: "사용자가 보고 만지는 계약"을 검증해요. "어떻게 구현했는지"나 "픽셀이 몇 인지"는 자동화 테스트에서 검증하지 않아요.

---

## 1. 파일 구조 및 네이밍

- **위치**: 컴포넌트와 **같은 폴더에 코로케이션**해요. → `packages/ui/src/components/{name}/{name}.test.tsx`
- **describe 블록**: `describe("{ComponentName}", ...)` 형태로 컴포넌트명을 그대로 사용해요.
- **it 설명**: 구현이 아닌 **사용자 관점의 행동**을 해요체로 적어요.
  - 🙆 `"loading이면 클릭이 막혀요"`
  - 🙅 `"disabled 속성이 true가 돼요"`

---

## 2. 검증 범위 (Verification Scope)

각 UI 컴포넌트는 아래 5개 범주를 기준으로 필요한 항목을 테스트해요.
모든 컴포넌트가 5개를 전부 채울 필요는 없지만, **①과 ⑤는 필수**예요.

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
- ⚠️ **금지**: variant가 특정 vanilla-extract 클래스명을 갖는지 검증하지 마세요. 해시가 바뀌면 깨져요. 외형은 Storybook에서 수동으로 확인해요.

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
render(<Button ref={ref} data-testid="save">저장</Button>);
expect(ref.current).toBeInstanceOf(HTMLButtonElement);
expect(screen.getByRole("button")).toHaveClass("my-class"); // className 병합 확인 시
```

### ⑤ 접근성 (a11y, 필수)
- `vitest-axe`로 자동 접근성 위반이 **0건**인지 확인해요.
- 로딩/장식 요소의 aria가 올바른가요? (`aria-busy`, `aria-hidden` 등)

```tsx
import { axe } from "vitest-axe";

const { container } = render(<Button>클릭</Button>);
expect(await axe(container)).toHaveNoViolations();
```

---

## 3. 표준 도구 & Import

| 목적 | 도구 |
|------|------|
| 렌더 & 조회 | `@testing-library/react` (`render`, `screen`) |
| 사용자 상호작용 | `@testing-library/user-event` |
| 접근성 | `vitest-axe` (`axe`, `toHaveNoViolations`) |
| 매처 | `@testing-library/jest-dom` (setup에서 전역 확장) |
| 러너 | `vitest` (`describe`/`it`/`expect`/`vi`는 `globals: true`로 전역) |

- 설정은 `packages/ui/vitest.config.ts`, 전역 매처는 `vitest.setup.ts`에서 관리해요.
- 실행: `pnpm --filter @harryk-ds/ui test` (감시 모드는 `test:watch`).

---

## 4. 조회 우선순위 (Query Priority)

접근성 친화적인 순서로 요소를 찾아요. 위쪽을 우선 사용해요.

1. `getByRole` (가장 권장 — 접근성 트리 기반)
2. `getByLabelText` / `getByPlaceholderText`
3. `getByText`
4. `getByTestId` (다른 방법이 없을 때만 최후의 수단)

> ⚠️ `container.querySelector`나 클래스명 기반 조회는 지양해요. 구현 세부에 결합돼요.

---

## 5. 안티 패턴 (하지 말 것)

- **해시 클래스명 스냅샷**: vanilla-extract가 생성한 클래스명을 `toBe`/스냅샷으로 고정하지 마세요.
- **픽셀/색상 검증**: 자동화 범위 밖이에요. Storybook에서 수동으로 확인하고 Vitest에서는 하지 마세요.
- **구현 세부 검증**: 내부 state·함수 호출 횟수 등 사용자가 관측할 수 없는 것을 테스트하지 마세요.
- **불안정한 대기**: 임의의 `setTimeout` 대신 `findBy*`/`waitFor`를 사용해요.
