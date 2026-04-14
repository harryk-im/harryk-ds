# Motion 컴포넌트 구현 스펙

이 문서는 `packages/motion` 패키지에 애니메이션 컴포넌트를 추가할 때 준수해야 할 표준을 정의해요.

---

## 🏗️ 파일 구조 및 네이밍

애니메이션 로직과 React 컴포넌트를 명확히 분리해요.

- `{name}.tsx`: React 컴포넌트 본체 (framer-motion의 `motion` 컴포넌트 활용).
- `{name}.motion.ts`: 애니메이션 `Variants` 및 관련 토큰 정의.
- `{name}.types.ts`: TypeScript 인터페이스/타입 정의.
- `index.ts`: export.

---

## 🎭 애니메이션 구현 패턴

### 1. Variants 분리
테스트와 재사용성을 위해 모든 애니메이션 객체(`Variants`)는 `.motion.ts` 파일에 따로 작성해요.

```typescript
// {name}.motion.ts
export const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
```

### 2. 가독성 중심의 Props
사용자가 복잡한 애니메이션 설정을 직접 하지 않아도 되도록, 추상화된 Props(예: `duration`, `delay`, `direction`)를 제공해요.

### 3. forwardRef 준수
UI 컴포넌트와 마찬가지로 `forwardRef`를 사용하며, 내부에서는 `motion` 컴포넌트에 ref를 전달해요.

---

## 📐 애니메이션 토큰

거리(distance), 시간(duration), 타이밍 함수(easing) 등은 하드코딩하지 않고 상수를 사용해 일관성을 유지해요.
- 현재 초기 개발 단계이며, 점진적으로 공통 애니메이션 토큰을 `/utils`로 추출할 예정이에요.
