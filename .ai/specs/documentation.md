# 문서화 스펙 (Documentation Spec)

모든 코드와 컴포넌트는 누구나 쉽게 이해하고 사용할 수 있도록 명확하게 문서화되어야 해요.

---

## Storybook 가이드

우리는 **중앙 집중형** 스토리 관리 방식을 사용해요.

### 1. 스토리 위치
- UI 컴포넌트: `apps/storybook/src/stories/ui/{name}.stories.tsx`
- Motion 컴포넌트: `apps/storybook/src/stories/motion/{name}.stories.tsx`

### 2. 작성 규칙
- `Meta` 객체에 컴포넌트의 제목과 타입을 정의해요.
- `argTypes`를 통해 Storybook UI에서 Props를 제어할 수 있게 설정해요.
- `tags: ["autodocs"]`를 포함하여 자동 문서 생성을 활성화해요.

---

## JSDoc 가이드

컴포넌트 파일과 타입 파일 두 곳에 항상 JSDoc 주석을 달아주세요. 이는 IDE에서의 힌트와 자동화된 문서 생성의 원천이 돼요.

### 1. 컴포넌트 (`.tsx`)
컴포넌트 상단에는 전체적인 역할 설명과 친절한 `@example` 기반의 사용 예시 코드를 포함해요.

```tsx
/**
 * 다양한 색상, 스타일, 크기를 선택할 수 있는 버튼이에요.
 *
 * @example
 * ```tsx
 * // 기본 사용법
 * <Button>클릭하세요</Button>
 *
 * // 크기 지정
 * <Button size="lg">큰 버튼</Button>
 * ```
 */
export const Button = React.forwardRef(...)
```

### 2. 컴포넌트 타입 및 Props (`.types.ts`)
Props 인터페이스의 각 속성과 리터럴 유니온 타입에 구체적인 역할을 명시해요.
선택적 속성(Optional Prop)의 경우 `@default` 태그를 사용하여 기본값을 반드시 적어주세요.

```tsx
/**
 * 버튼의 크기를 지정해요.
 * - `sm`: 작은 크기예요.
 * - `md`: 기본 크기예요.
 * - `lg`: 큰 크기예요.
 */
export type ButtonSize = keyof typeof buttonSize;

/**
 * Button 컴포넌트의 Props예요.
 */
export interface ButtonProps {
  /**
   * 버튼의 크기를 선택해요.
   * @default "md"
   */
  size?: ButtonSize;
}
```

---
