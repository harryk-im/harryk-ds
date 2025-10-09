# 아키텍처 가이드

## 📐 모노레포 구조

### 개요

Harryk 디자인 시스템은 **중앙 집중형 스토리 관리** 패턴을 사용하는 모노레포입니다.

```
harryk-ds/
├── packages/          # 배포용 컴포넌트 라이브러리
│   ├── ui/           # UI 컴포넌트
│   └── motion/       # 애니메이션 컴포넌트
└── apps/             # 내부 도구 및 문서
    └── storybook/    # 컴포넌트 문서화
```

## 🎯 설계 결정

### 1. 중앙 집중형 vs Co-located Stories

우리는 **중앙 집중형** 방식을 선택했습니다:

#### ✅ 선택한 방식: 중앙 집중형

```
apps/storybook/
  src/stories/
    Button.stories.tsx      ← 모든 스토리 여기
    FadeIn.stories.tsx      ← 모든 스토리 여기

packages/ui/
  src/components/Button/
    Button.tsx              ← 순수 컴포넌트만
  package.json              ← Storybook 의존성 없음
```

**장점:**

- ✅ 의존성 중복 제거
- ✅ 패키지 번들 크기 최소화
- ✅ 순수한 컴포넌트 라이브러리 유지
- ✅ Storybook 업데이트가 한 곳에서만 필요
- ✅ 문서화와 개발 관심사 분리

**단점:**

- ⚠️ 컴포넌트와 스토리가 물리적으로 분리
- ⚠️ import 경로가 상대 경로가 아닌 workspace 경로

#### ❌ 선택하지 않은 방식: Co-located Stories

```
packages/ui/
  src/components/Button/
    Button.tsx
    Button.stories.tsx      ← 컴포넌트와 함께
  package.json              ← Storybook devDependencies 필요
```

**장점:**

- ✅ 컴포넌트와 문서가 함께 위치
- ✅ 상대 경로 import

**단점:**

- ❌ 각 패키지에 Storybook 의존성 중복
- ❌ 번들 크기 증가
- ❌ 의존성 버전 관리 복잡도 증가

### 2. 의존성 관리

#### 컴포넌트 패키지 (packages/\*)

```json
{
  "dependencies": {
    // 런타임에 필요한 의존성만
    "@vanilla-extract/css": "^1.17.4" // ui 패키지
  },
  "peerDependencies": {
    // 호스트 앱이 제공해야 하는 의존성
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^11.0.0" // motion 패키지
  },
  "devDependencies": {
    // 빌드 도구만
    "vite": "^7.1.7",
    "typescript": "~5.9.3"
    // ❌ Storybook 의존성 없음
  }
}
```

#### Storybook 앱 (apps/storybook)

```json
{
  "dependencies": {
    // Workspace 패키지
    "@harryk-ds/ui": "workspace:*",
    "@harryk-ds/motion": "workspace:*",
    "framer-motion": "^11.0.0" // motion 패키지의 peer dependency
  },
  "devDependencies": {
    // Storybook 관련 의존성 모두 여기에
    "@storybook/react": "^8.4.7",
    "@storybook/addon-essentials": "^8.4.7"
    // ...
  }
}
```

## 🔄 워크플로우

### 새 컴포넌트 추가

1. **컴포넌트 작성**

```bash
# packages/ui/src/components/NewComponent/
NewComponent.tsx
NewComponent.css.ts  # Vanilla Extract (선택)
index.ts
```

2. **Export 추가**

```typescript
// packages/ui/src/components/index.ts
export { NewComponent } from "./NewComponent";

// packages/ui/src/index.ts
export * from "./components";
```

3. **빌드**

```bash
pnpm build
```

4. **스토리 작성**

```typescript
// apps/storybook/src/stories/NewComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NewComponent } from "@harryk-ds/ui"; // ← workspace dependency

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

### 컴포넌트 업데이트

1. 컴포넌트 수정
2. `pnpm build` (패키지 재빌드)
3. Storybook이 자동으로 핫 리로드

**중요**: Storybook은 빌드된 패키지를 사용하므로, 컴포넌트 변경 시 반드시 재빌드 필요!

### 개발 팁

```bash
# 터미널 1: 컴포넌트 watch 모드
pnpm dev

# 터미널 2: Storybook
pnpm storybook
```

## 🔍 의존성 분석

### 현재 구조

```
루트 (harryk-ds/)
├── devDependencies: 공통 도구
│   ├── @biomejs/biome
│   └── husky
│
├── packages/ui/
│   ├── dependencies: @vanilla-extract/css
│   ├── peerDependencies: react, react-dom
│   └── devDependencies: vite, typescript
│
├── packages/motion/
│   ├── peerDependencies: react, react-dom, framer-motion
│   └── devDependencies: vite, typescript, framer-motion
│
└── apps/storybook/
    ├── dependencies: workspace packages + peer deps
    └── devDependencies: 모든 Storybook 관련
```

### 중복 제거 결과

| 의존성             | 이전 (Co-located) | 현재 (Centralized) |
| ------------------ | ----------------- | ------------------ |
| `@storybook/*`     | 3곳               | 1곳                |
| `@storybook/react` | 3곳               | 1곳                |
| 번들 크기 증가     | +5MB/패키지       | 0                  |

## 🚀 배포 전략

### npm 패키지 배포

```bash
# UI 패키지 배포
cd packages/ui
npm publish

# Motion 패키지 배포
cd packages/motion
npm publish
```

**배포 내용:**

- `dist/` 폴더만 (빌드 결과)
- `package.json`
- `README.md`
- ❌ 스토리 파일 제외
- ❌ Storybook 의존성 제외

### Storybook 배포

```bash
# Vercel
pnpm build-storybook
# → apps/storybook/storybook-static/
```

**배포 설정:**

- Build Command: `pnpm build-storybook`
- Output Directory: `apps/storybook/storybook-static`

## 📚 참고 사례

비슷한 패턴을 사용하는 디자인 시스템:

1. **Radix UI** - 중앙 집중형 문서
2. **shadcn/ui** - 별도 문서 사이트
3. **Vercel Design System** - 중앙 집중형 Storybook

Co-located 패턴을 사용하는 경우:

1. **Chakra UI** - 각 패키지에 스토리 포함
2. **Adobe Spectrum** - 각 패키지에 문서 포함

## 🔮 향후 고려사항

### 스케일링

패키지가 많아지면:

```
apps/storybook/src/stories/
  ui/
    Button.stories.tsx
    Input.stories.tsx
  motion/
    FadeIn.stories.tsx
    Slide.stories.tsx
  layout/
    Grid.stories.tsx
```

### 테스팅

```
apps/storybook/src/stories/
  Button.stories.tsx
  Button.test.tsx  # Storybook 기반 테스트
```

### 다국어 지원

```
apps/storybook/src/
  stories/
  locales/
    ko.json
    en.json
```

---

**결론**: 현재 구조는 패키지 순수성, 의존성 최소화, 그리고 유지보수성 사이의 최적의 균형을 제공합니다.
