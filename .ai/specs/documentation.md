# 문서화 스펙 (Documentation Spec)

모든 코드와 컴포넌트는 누구나 쉽게 이해하고 사용할 수 있도록 명확하게 문서화되어야 해요.

---

## 📚 Storybook 가이드

우리는 **중앙 집중형** 스토리 관리 방식을 사용해요.

### 1. 스토리 위치
- UI 컴포넌트: `apps/storybook/src/stories/ui/{name}.stories.tsx`
- Motion 컴포넌트: `apps/storybook/src/stories/motion/{name}.stories.tsx`

### 2. 작성 규칙
- `Meta` 객체에 컴포넌트의 제목과 타입을 정의해요.
- `argTypes`를 통해 Storybook UI에서 Props를 제어할 수 있게 설정해요.
- `tags: ["autodocs"]`를 포함하여 자동 문서 생성을 활성화해요.

---

## 📝 JSDoc 가이드

컴포넌트와 Props에는 항상 JSDoc 주석을 달아주세요. 이는 IDE에서의 힌트와 자동화된 문서 생성의 원천이 돼요.

- **컴포넌트**: 전체적인 역할과 예제 코드를 포함해요.
- **Props**: 각 속성이 어떤 역할을 하는지 정중한 '해요체'로 설명해요.

```tsx
/**
 * 클릭 시 이벤트를 발생시키는 기본 버튼이에요.
 * @param color - 버튼의 주 테마 색상을 결정해요.
 */
```

---
