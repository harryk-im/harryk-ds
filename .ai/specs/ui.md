# UI 컴포넌트 구현 스펙

이 문서는 `packages/ui` 패키지에 새로운 컴포넌트를 추가하거나 수정할 때 준수해야 할 기술적 표준을 정의해요.

---

## 🏗️ 파일 구조 및 네이밍

컴포넌트 폴더(`packages/ui/src/components/{name}/`)는 아래 구조를 엄격히 따라야 해요.

- `{name}.tsx`: React 컴포넌트 본체.
- `{name}.css.ts`: Vanilla Extract 스타일 정의.
- `{name}.types.ts`: TypeScript 인터페이스/타입 정의.
- `{name}.context.ts`: (선택) 하위 컴포넌트와 상태를 공유할 경우.
- `index.ts`: 깔끔한 외부 노출을 위한 엔트리.

---

## ⚛️ React 구현 패턴

### 1. forwardRef (Ref 전달)
모든 컴포넌트는 외부에서 DOM 요소에 직접 접근할 수 있도록 `React.forwardRef`를 사용해 구현해요.

```tsx
export const MyComponent = React.forwardRef<HTMLElement, Props>(
  ({ children, ...props }, ref) => {
    return <div ref={ref} {...props}>{children}</div>;
  }
);
MyComponent.displayName = "MyComponent";
```

### 2. Props 확장
사용자 정의 Props 외에도, 해당 컴포넌트가 렌더링하는 기본 HTML 요소의 속성을 확장해서 제공해요.

```typescript
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
}
```

---

## 🎨 스타일링 (Vanilla Extract)

### 1. oklch 색상 토큰
색상은 하드코딩하지 않고 `oklch` 기반의 `COLORS` 토큰을 사용해요.
- 위치: `packages/ui/src/styles/tokens/colors.ts`

### 2. recipe 패턴
컴포넌트의 변형(Variants)은 `recipe` 함수를 이용해 선언적으로 관리해요. 이때, 타입 추론 최적화와 가독성을 위해 스타일 객체를 `as const`로 먼저 상언하는 패턴을 권장해요.

```typescript
// {name}.css.ts
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "../../styles";

// 1. 스타일 객체를 as const로 별도 선언
export const buttonBase = {
  transition: '0.2s',
  borderRadius: '8px',
  cursor: 'pointer',
} as const;

export const buttonColor = {
  primary: { color: COLORS.blue[500] },
  secondary: { color: COLORS.grey[500] },
} as const;

// 2. recipe 함수에서 조합
export const myStyle = recipe({
  base: buttonBase,
  variants: {
    color: buttonColor,
    size: {
      sm: { fontSize: '12px' },
      md: { fontSize: '16px' },
    }
  },
  // 3. 복합 변형(Compound Variants) 처리
  compoundVariants: [
    {
      variants: { color: 'primary', size: 'sm' },
      style: { fontWeight: 'bold' }
    }
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  }
});
```

---

## 🔄 스타일 상속 (Context)

복합 컴포넌트(Compound Components)에서는 상위 컴포넌트의 스타일 설정을 하위 요소가 자동으로 물려받을 수 있도록 **Context 패턴**을 권장해요.

- `useResolvedParagraphStyle` 훅을 참고하여 `props > defaults > context > fallback` 순서의 우선순위 로직을 구현해주세요.
- 위치: `packages/ui/src/components/paragraph/paragraph.context.ts`
