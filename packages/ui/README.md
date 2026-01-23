# @harryk-ds/ui

[![npm version](https://img.shields.io/npm/v/@harryk-ds/ui.svg)](https://www.npmjs.com/package/@harryk-ds/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Harryk 디자인 시스템의 핵심 UI 컴포넌트 라이브러리예요.

## 📦 설치

```bash
# npm
npm install @harryk-ds/ui

# pnpm
pnpm add @harryk-ds/ui

# yarn
yarn add @harryk-ds/ui
```

### Peer Dependencies

이 패키지를 사용하려면 다음 의존성이 필요해요.

```bash
npm install react@^19.0.0 react-dom@^19.0.0
```

## 🚀 사용법

### 기본 사용

```tsx
import { Button } from "@harryk-ds/ui";

function App() {
  return (
    <Button color="primary" variant="fill" size="md">
      클릭하세요
    </Button>
  );
}
```

### TypeScript 지원

완전한 TypeScript 지원을 제공해요.

```tsx
import type { ButtonProps } from "@harryk-ds/ui";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🎨 컴포넌트

### Button

다양한 색상, 스타일, 크기를 선택할 수 있는 버튼 컴포넌트예요.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'primary' \| 'secondary'` | `'primary'` | 버튼의 색상을 선택해요. |
| `variant` | `'fill' \| 'outline'` | `'fill'` | 버튼의 스타일을 선택해요. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼의 크기를 선택해요. |
| `children` | `React.ReactNode` | - | 버튼에 표시할 내용이에요. |
| `...props` | `ButtonHTMLAttributes` | - | HTML button 요소의 모든 속성을 지원해요. |

#### 색상 옵션

- `primary`: 주요 액션에 사용하는 파란색이에요.
- `secondary`: 보조 액션에 사용하는 회색이에요.

#### 스타일 옵션

- `fill`: 배경색이 채워진 기본 스타일이에요.
- `outline`: 테두리만 있는 스타일이에요.

#### 크기 옵션

- `sm`: 작은 크기예요.
- `md`: 기본 크기예요.
- `lg`: 큰 크기예요.

#### 예시

```tsx
import { Button } from "@harryk-ds/ui";

// 기본 버튼
<Button>기본 버튼</Button>

// 색상과 스타일 지정
<Button color="primary" variant="fill" size="lg">
  Primary Fill 버튼
</Button>

<Button color="primary" variant="outline" size="md">
  Primary Outline 버튼
</Button>

<Button color="secondary" variant="fill" size="sm">
  Secondary 버튼
</Button>

// 이벤트 핸들러
<Button onClick={() => console.log("clicked")}>
  클릭하세요
</Button>

// 비활성화 상태
<Button disabled>비활성화된 버튼</Button>
```

## 🎨 스타일링

이 패키지는 **Vanilla Extract**를 사용해 타입 안전한 CSS-in-JS를 제공해요.

### 커스텀 스타일


1. `인라인 스타일` 통해 커스터 마이징이 가능해요.

``` tsx
<Button style={{ backgroundColor: 'blue' }} color="primary">
  커스텀 스타일 버튼
</Button>
```

2. `className` prop을 통해 커스터 마이징이 가능해요.

```tsx
<Button className="my-custom-class" color="primary">
  커스텀 스타일 버튼
</Button>
```



## 📚 문서

더 자세한 문서와 인터랙티브 예제는 Storybook에서 확인할 수 있어요.

- [Storybook 문서](https://github.com/harryk-im/harryk-ds#readme)
- [컴포넌트 가이드라인](../../ARCHITECTURE.md)

## 🏗️ 개발

### 요구사항

- Node.js 24+
- pnpm 8+

### 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/harryk-im/harryk-ds.git
cd harryk-ds

# 의존성 설치
pnpm install

# UI 패키지 개발 모드
pnpm dev:ui

# UI 패키지 빌드
pnpm build:ui

# 타입 체크
pnpm --filter @harryk-ds/ui type-check
```

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**

```bash
packages/ui/src/components/ui-component/
├── ui-component.tsx
├── ui-component.css.ts  # Vanilla Extract 스타일
├── ui-component.types.ts # 타입 정의
└── index.ts
```

2. **Export 추가**

```typescript
// packages/ui/src/components/index.ts
export { UiComponent } from "./ui-component";
```

3. **빌드 및 테스트**

```bash
pnpm build:ui
```

4. **Storybook 스토리 작성**

```bash
# apps/storybook/src/stories/ui/ui-component.stories.tsx
```

## 🔧 기술 스택

- **React**: 19.x
- **TypeScript**: 5.9.x
- **CSS-in-JS**: Vanilla Extract 1.17
- **빌드 도구**: Vite 7.x

## 📦 패키지 구조

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.css.ts
│   │   │   ├── button.types.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/           # 공통 스타일 토큰
│   │   └── tokens/
│   │       ├── colors.css.ts
│   │       └── typography.css.ts
│   └── index.ts
├── dist/                 # 빌드 결과물
└── package.json
```

## 💬 피드백

아직 정식 오픈 전이에요. 아이디어나 피드백이 있다면 [GitHub Issues](https://github.com/harryk-im/harryk-ds/issues)에서 공유해 주세요!

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](../../LICENSE) 파일을 참조하세요.

## 🔗 관련 패키지

- [@harryk-ds/motion](../motion/README.md) - 애니메이션 컴포넌트
- [@harryk-ds/storybook](../../apps/storybook/README.md) - 컴포넌트 문서

## 📞 문의

- **Author**: harryk-im
- **Repository**: [github.com/harryk-im/harryk-ds](https://github.com/harryk-im/harryk-ds)
- **Issues**: [github.com/harryk-im/harryk-ds/issues](https://github.com/harryk-im/harryk-ds/issues)

