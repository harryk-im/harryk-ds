# @harryk-ds/storybook

Harryk 디자인 시스템의 Storybook 문서화 앱입니다.

## 🎯 목적

이 앱은 다음 목적으로 사용됩니다:

1. **컴포넌트 문서화** - UI/Motion 패키지의 모든 컴포넌트 문서
2. **인터랙티브 테스트** - 컴포넌트 props를 실시간으로 조작하며 테스트
3. **비주얼 테스팅** - 다양한 상태의 컴포넌트 시각적 확인
4. **배포용 사이트** - Vercel을 통한 정적 사이트 배포

## 📁 구조

```
apps/storybook/
├── .storybook/           # Storybook 설정
│   ├── main.ts          # 메인 설정
│   └── preview.ts       # 프리뷰 설정
├── src/
│   ├── stories/         # 모든 스토리 파일
│   │   ├── Button.stories.tsx
│   │   └── FadeIn.stories.tsx
│   └── Introduction.mdx # 소개 페이지
└── package.json
```

## 🏗️ 아키텍처 원칙

### 중앙 집중형 스토리 관리

이 프로젝트는 **중앙 집중형 스토리 관리** 방식을 채택했습니다:

**✅ 장점:**

- Storybook 의존성이 apps/storybook에만 존재
- packages/ui와 packages/motion은 순수한 컴포넌트 라이브러리로 유지
- 의존성 중복 제거로 번들 크기 최소화
- 문서화와 개발 관심사 분리

**📝 스토리 작성 방법:**

```typescript
// apps/storybook/src/stories/YourComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { YourComponent } from "@harryk-ds/ui"; // workspace dependency 사용

const meta = {
  title: "UI/YourComponent",
  component: YourComponent,
  // ...
} satisfies Meta<typeof YourComponent>;

export default meta;
// ...
```

## 🚀 사용법

### 개발 서버

```bash
# 루트에서
pnpm storybook

# 또는 이 디렉토리에서
pnpm run storybook
```

→ http://localhost:6006

### 빌드

```bash
# 루트에서
pnpm build-storybook

# 또는 이 디렉토리에서
pnpm run build-storybook
```

빌드 결과는 `storybook-static/` 폴더에 생성됩니다.

## 📦 의존성

이 패키지는 다음 workspace 패키지들에 의존합니다:

- `@harryk-ds/ui` - UI 컴포넌트
- `@harryk-ds/motion` - 모션 컴포넌트

**중요**: 스토리를 작성하기 전에 반드시 패키지를 빌드하세요. 그래야 변경사항이 Storybook에 잘 반영돼요.

```bash
pnpm build
```

## 🌐 배포 (Vercel)

### 설정

1. **Build Command**: `pnpm build-storybook`
2. **Output Directory**: `apps/storybook/storybook-static`
3. **Root Directory**: `/`
4. **Install Command**: `pnpm install`

### 환경 변수 (선택사항)

```
NODE_VERSION=20
```

## 🎨 스토리 작성 가이드

### 1. 기본 구조

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { YourComponent } from "@harryk-ds/ui";

const meta = {
  title: "Category/YourComponent",
  component: YourComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "컴포넌트 설명",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### 2. 스토리 정의

```typescript
export const Default: Story = {
  args: {
    // props
  },
};

export const WithCustomRender: Story = {
  render: () => <YourComponent />,
};
```

### 3. 카테고리 구조

- **Welcome/** - 소개 및 가이드
- **UI/** - UI 컴포넌트
- **Motion/** - 모션 컴포넌트

## 🔧 커스터마이징

### Addon 추가

`.storybook/main.ts`에서 addon을 추가할 수 있습니다:

```typescript
addons: [
  "@storybook/addon-essentials",
  "@storybook/addon-docs",
  "@storybook/addon-a11y", // 접근성 테스트
],
```

### Theme 설정

`.storybook/preview.ts`에서 테마를 설정할 수 있습니다.

## 📚 참고 자료

- [Storybook 공식 문서](https://storybook.js.org/)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
