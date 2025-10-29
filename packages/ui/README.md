# @harryk-ds/ui

[![npm version](https://img.shields.io/npm/v/@harryk-ds/ui.svg)](https://www.npmjs.com/package/@harryk-ds/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Harryk 디자인 시스템의 핵심 UI 컴포넌트 라이브러리입니다.

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

이 패키지는 다음 의존성들이 필요합니다:

```bash
# npm
npm install react@^19.0.0 react-dom@^19.0.0

# pnpm
pnpm add react@^19.0.0 react-dom@^19.0.0

# yarn
yarn add react@^19.0.0 react-dom@^19.0.0
```

## 🚀 사용법

### 기본 사용

```tsx
import { Button } from '@harryk-ds/ui';
import '@harryk-ds/ui/dist/ui.css'; // 스타일 import

function App() {
  return (
    <Button variant="primary" size="md">
      클릭하세요
    </Button>
  );
}
```

### TypeScript 지원

완전한 TypeScript 지원을 제공합니다:

```tsx
import type { ButtonProps } from '@harryk-ds/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## 🎨 컴포넌트

### Button

다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | 버튼 스타일 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `children` | `React.ReactNode` | - | 버튼 내용 |
| `...props` | `ButtonHTMLAttributes` | - | 기본 button HTML 속성 |

#### 예시

```tsx
import { Button } from '@harryk-ds/ui';

// Primary 버튼
<Button variant="primary" size="lg">
  Primary Button
</Button>

// Secondary 버튼
<Button variant="secondary" size="md">
  Secondary Button
</Button>

// Outline 버튼
<Button variant="outline" size="sm">
  Outline Button
</Button>

// 이벤트 핸들러
<Button onClick={() => console.log('clicked')}>
  Click Me
</Button>

// Disabled 상태
<Button disabled>
  Disabled
</Button>
```

## 🎨 스타일링

이 패키지는 **Vanilla Extract**를 사용하여 타입 안전한 CSS-in-JS를 제공합니다.

### CSS Import

```tsx
// 필수: 스타일 파일을 import 해야 합니다
import '@harryk-ds/ui/dist/ui.css';
```

### 커스텀 스타일

컴포넌트는 `className` prop을 통해 추가 스타일링이 가능합니다:

```tsx
<Button className="my-custom-class" variant="primary">
  Custom Styled Button
</Button>
```

## 📚 문서

더 자세한 문서와 인터랙티브 예제는 Storybook에서 확인하세요:

- [Storybook 문서](https://github.com/harryk-im/harryk-ds#readme)
- [컴포넌트 가이드라인](../../ARCHITECTURE.md)

## 🏗️ 개발

### 요구사항

- Node.js 22+
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
packages/ui/src/components/YourComponent/
├── YourComponent.tsx
├── YourComponent.css.ts  # Vanilla Extract 스타일
└── index.ts
```

2. **Export 추가**

```typescript
// packages/ui/src/components/index.ts
export { YourComponent } from './YourComponent';
```

3. **빌드 및 테스트**

```bash
pnpm build:ui
```

4. **Storybook 스토리 작성**

```bash
# apps/storybook/src/stories/YourComponent.stories.tsx
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
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/           # 공통 스타일 (향후 확장)
│   └── index.ts
├── dist/                 # 빌드 결과물
└── package.json
```

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](../../LICENSE) 파일을 참조하세요.

## 🔗 관련 패키지

- [@harryk-ds/motion](../motion/README.md) - 애니메이션 컴포넌트
- [@harryk-ds/storybook](../../apps/storybook/README.md) - 컴포넌트 문서

## 📞 문의

- **Author**: harryk-im
- **Repository**: [github.com/harryk-im/harryk-ds](https://github.com/harryk-im/harryk-ds)
- **Issues**: [github.com/harryk-im/harryk-ds/issues](https://github.com/harryk-im/harryk-ds/issues)

---

**Happy Coding! 🎉**

