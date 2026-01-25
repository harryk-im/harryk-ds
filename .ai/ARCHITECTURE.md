# 아키텍처 가이드

## 📐 모노레포 구조

### 개요

Harryk 디자인 시스템은 **중앙 집중형으로 스토리를 관리**하는 모노레포 구조예요.

```
harryk-ds/
├── packages/         # 배포용 컴포넌트 라이브러리
│   ├── ui/           # UI 컴포넌트
│   └── motion/       # 애니메이션 컴포넌트
├── apps/             # 내부 도구 및 문서
│   └── storybook/    # 컴포넌트 문서화
└── .github/workflows/
    ├── chromatic.yml     # 시각적 회귀 테스트
    ├── quality-check.yml # 린트·타입·빌드 체크
    └── release.yml       # Changesets를 이용한 릴리즈
```

---


## 🛠️ 기술 스택

| 영역 | 도구 | 버전 |
|------|------|------|
| **패키지 관리** | pnpm workspace | 10 |
| **빌드** | Vite + vite-plugin-dts | 7.1+ |
| **스타일 (ui)** | Vanilla Extract + recipes | 1.17+ |
| **애니메이션 (motion)** | Framer Motion | 11.0+ |
| **린트/포맷** | Biome | 2.2.5 |
| **Git Hooks** | Husky | 9.1+ |
| **릴리즈** | Changesets | 2.29+ |
| **문서화** | Storybook + Chromatic | 8.4+ |
| **React** | React 19 | 19.0+ |

---


## 📁 패키지별 구조

### `packages/ui` 컴포넌트 구조

UI 컴포넌트는 아래와 같은 파일 구조 패턴을 사용해요.

```
packages/ui/src/
├── components/
│   └── {component-name}/
│       ├── {component-name}.tsx        # React 컴포넌트 (forwardRef 패턴)
│       ├── {component-name}.css.ts     # Vanilla Extract 스타일 (recipe 패턴)
│       ├── {component-name}.types.ts   # TypeScript 타입 정의
│       └── index.ts                    # export
└── styles/
    └── tokens/
        ├── colors.css.ts       # 색상 토큰
        └── typography.css.ts   # 타이포그래피 토큰
```

#### 컴포넌트 작성 규칙

1. **forwardRef 패턴**을 사용해서 ref를 전달할 수 있게 만들어요.
2. **Props 인터페이스**는 HTML 요소 속성을 확장해서 정의해요.
3. **JSDoc 주석**을 달아 각 Props를 친절하게 설명해주세요.
4. **displayName**을 꼭 명시해주세요.

```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = "primary", variant = "fill", size = "md", ...props }, ref) => {
    return <button ref={ref} className={buttonStyle({ color, variant, size })} {...props} />;
  }
);
Button.displayName = "Button";
```

### `packages/ui` 스타일 토큰

스타일은 Vanilla Extract의 `recipe` 패턴으로 관리해요.

```typescript
// tokens/colors.css.ts
export const COLORS = {
  primary: "#678EDC",
  gray: { 900: "#1D1D1D", 600: "#515151", 300: "#E1E1E1" },
  // ...
} as const;

// component.css.ts
export const buttonStyle = recipe({
  base: buttonBase,
  variants: { color: buttonColors, variant: buttonVariants, size: buttonSizes },
  compoundVariants: [/* ... */],
});
```

### `packages/motion` 컴포넌트 구조

> ⚠️ Motion 패키지의 파일 구조는 아직 다듬고 있는 단계예요.

현재 구조는 이래요.

```
packages/motion/src/
├── components/
│   └── {component-name}/
│       ├── {component-name}.tsx    # React FC 컴포넌트
│       └── index.ts
├── hooks/                      # 애니메이션 훅을 준비 중이에요
└── utils/                      # 유틸리티 함수를 준비 중이에요
```

---

## 🎯 설계 결정

### 1. 중앙 집중식 vs 개별 위치 스토리 관리

우리는 스토리를 **한곳으로 모아서 관리**하기로 했어요.

#### ✅ 선택한 방식: 중앙 집중형

```
apps/storybook/src/stories/
├── ui/
│   ├── button.stories.tsx
│   └── badge.stories.tsx
└── motion/    # 만드는 중이에요
    └── fade-in.stories.tsx
```

**좋은 점:**

- ✅ 의존성 중복을 없앨 수 있어요.
- ✅ 패키지 번들 크기를 가장 작게 유지해요.
- ✅ 컴포넌트 라이브러리를 순수하게 관리할 수 있어요.
- ✅ 한곳에서만 Storybook을 업데이트하면 돼요.
- ✅ 문서화와 개발의 관심사를 명확히 나누었어요.

**아쉬운 점:**

- ⚠️ 컴포넌트와 스토리가 물리적으로 떨어져 있어요.
- ⚠️ import할 때 상대 경로가 아닌 workspace 경로를 써야 해요.

### 2. 의존성 관리

#### `packages/ui`

```json
{
  "dependencies": {
    "@vanilla-extract/css": "^1.17.4",
    "@vanilla-extract/recipes": "^0.5.7"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

#### `packages/motion`

```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0"
  }
}
```

#### `apps/storybook`

```json
{
  "dependencies": {
    "@harryk-ds/ui": "workspace:*",
    "@harryk-ds/motion": "workspace:*",
    "framer-motion": "^11.0.0"
  }
}
```

---

## 🔄 워크플로우

### 새 UI 컴포넌트 추가할 때

1. **컴포넌트 작성** (`packages/ui/src/components/`)

아래 구조로 파일을 만들어요.
```bash
NewComponent/
├── new-component.tsx
├── new-component.css.ts
├── new-component.types.ts
└── index.ts
```

2. **Export 추가**

```typescript
// packages/ui/src/components/index.ts
export * from "./new-component";
```

3. **빌드**

```bash
pnpm build
```

4. **스토리 작성** (`apps/storybook/src/stories/ui/`)

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { NewComponent } from "@harryk-ds/ui";

const meta = {
  title: "UI/NewComponent",
  component: NewComponent,
} satisfies Meta<typeof NewComponent>;

export default meta;
```

5. **테스트**

```bash
pnpm storybook
```

### 개발 팁

이렇게 두 작업을 동시에 띄워두고 개발하면 편해요.
```bash
# 터미널 1: 컴포넌트 번들을 계속 감시해요
pnpm dev

# 터미널 2: Storybook을 실행해요
pnpm storybook
```

---

## 🔁 CI/CD 파이프라인

### 코드 품질 체크 (`quality-check.yml`)

PR을 올리거나 main·develop 브랜치에 푸시하면 실행돼요.

1. **린트** (`pnpm lint`) - Biome을 사용해요.
2. **타입 체크** (`pnpm type-check`)
3. **빌드** (`pnpm build`)

### Chromatic 시각 테스트 (`chromatic.yml`)

PR을 올릴 때 Storybook 배포와 시각적 회귀 테스트를 진행해요.

- **TurboSnap**을 켜서 바뀐 스토리만 효율적으로 테스트해요.
- PR 코멘트에 Storybook과 Chromatic URL을 자동으로 달아드려요.

### 릴리즈 (`release.yml`)

Changesets를 활용해 버전을 관리하고 npm에 패키지를 배포해요.

---

## 🚀 배포 전략

### npm 패키지 배포

```bash
# Changesets로 버전을 관리하고 배포해요
pnpm changeset
pnpm changeset:version
pnpm changeset:publish
```

**배포 결과물:**

- `dist/` 폴더 안의 빌드 파일들
- `package.json`
- `README.md`
- ❌ 스토리 파일은 포함하지 않아요.
- ❌ Storybook 관련 의존성은 제외해요.

### Storybook 배포

Chromatic이 매번 자동으로 배포해줘요.

---

## 📚 참고 사례

우리와 비슷한 패턴으로 구성된 곳들이에요.

1. **Radix UI** - 문서를 중앙에서 관리해요.
2. **shadcn/ui** - 별도의 문서 사이트를 운영해요.
3. **Vercel Design System** - Storybook을 중앙 집중형으로 관리해요.

---

## 🔮 향후 고려사항

### `packages/motion` 구조 다듬기
fade-in.tsx 구현을 마무리한 뒤 초기 개발 패턴을 더 꼼꼼히 문서화할 계획이에요.

---

**결론**: 지금의 구조는 패키지의 순수함을 지키면서도, 의존성을 최소화하고 유지보수하기 가장 좋은 균형을 갖추고 있어요.
