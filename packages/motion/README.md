# @harryk-ds/motion

[![npm version](https://img.shields.io/npm/v/@harryk-ds/motion.svg)](https://www.npmjs.com/package/@harryk-ds/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Harryk 디자인 시스템의 애니메이션 및 모션 컴포넌트 라이브러리입니다. Framer Motion 기반으로 제작되었습니다.

## 📦 설치

```bash
# npm
npm install @harryk-ds/motion

# pnpm
pnpm add @harryk-ds/motion

# yarn
yarn add @harryk-ds/motion
```

### Peer Dependencies

이 패키지를 사용하려면 다음 의존성이 필요해요.

```bash
npm install react@^19.0.0 react-dom@^19.0.0
```

## 🚀 사용법

### 기본 사용

```tsx
import { FadeIn } from '@harryk-ds/motion';

function App() {
  return (
    <FadeIn direction="up" duration={0.6}>
      <div>페이드인 애니메이션이 적용된 컨텐츠</div>
    </FadeIn>
  );
}
```

### TypeScript 지원

완전한 TypeScript 지원을 제공합니다:

```tsx
import type { FadeInProps } from '@harryk-ds/motion';

const MyComponent: React.FC<FadeInProps> = (props) => {
  return <FadeIn {...props} />;
};
```

## 🎨 컴포넌트

### FadeIn

다양한 방향과 설정을 지원하는 페이드인 애니메이션 컴포넌트입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | 애니메이션이 적용될 자식 요소 (필수) |
| `duration` | `number` | `0.6` | 애니메이션 지속 시간 (초) |
| `delay` | `number` | `0` | 애니메이션 시작 지연 시간 (초) |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'none'` | `'up'` | 페이드인 방향 |
| `distance` | `number` | `20` | 이동 거리 (픽셀) |
| `...props` | `HTMLMotionProps<'div'>` | - | Framer Motion div props |

#### 예시

```tsx
import { FadeIn } from '@harryk-ds/motion';

// 아래에서 위로 페이드인
<FadeIn direction="up" duration={0.6}>
  <h1>안녕하세요!</h1>
</FadeIn>

// 왼쪽에서 오른쪽으로 페이드인
<FadeIn direction="right" duration={0.8} delay={0.2}>
  <p>텍스트 내용</p>
</FadeIn>

// 방향 없이 페이드만
<FadeIn direction="none" duration={1.0}>
  <div>페이드 온리</div>
</FadeIn>

// 커스텀 거리
<FadeIn direction="left" distance={50}>
  <div>더 긴 거리 이동</div>
</FadeIn>

// 여러 애니메이션 순차 실행
<>
  <FadeIn delay={0}>
    <div>첫 번째</div>
  </FadeIn>
  <FadeIn delay={0.2}>
    <div>두 번째</div>
  </FadeIn>
  <FadeIn delay={0.4}>
    <div>세 번째</div>
  </FadeIn>
</>
```

### 고급 사용

Framer Motion의 `HTMLMotionProps`를 상속하므로 모든 motion props를 사용할 수 있습니다:

```tsx
<FadeIn
  direction="up"
  duration={0.6}
  style={{ margin: '20px' }}
  className="my-class"
  onAnimationComplete={() => console.log('완료!')}
>
  <div>컨텐츠</div>
</FadeIn>
```

## 🎬 애니메이션 가이드

### 지속 시간 권장사항

- **짧은 애니메이션 (0.2-0.3초)**: 버튼 hover, 작은 UI 요소
- **보통 애니메이션 (0.4-0.6초)**: 일반 페이드인, 카드 등장
- **긴 애니메이션 (0.8-1.2초)**: 페이지 전환, 대형 요소

### 방향 선택 가이드

- **`up`**: 가장 일반적, 페이지 로딩 시 추천
- **`down`**: 헤더나 상단 요소에 적합
- **`left/right`**: 슬라이드 효과가 필요할 때
- **`none`**: 단순 페이드만 필요할 때

### 성능 최적화

```tsx
// ✅ 좋은 예: 한 번만 실행되는 초기 애니메이션
<FadeIn direction="up">
  <HeavyComponent />
</FadeIn>

// ⚠️ 주의: 조건부 렌더링으로 반복 실행
{show && (
  <FadeIn direction="up">
    <Component />
  </FadeIn>
)}
```

## 📚 문서

더 자세한 문서와 인터랙티브 예제는 Storybook에서 확인하세요:

- [Storybook 문서](https://github.com/harryk-im/harryk-ds#readme)
- [컴포넌트 가이드라인](../../ARCHITECTURE.md)
- [Framer Motion 공식 문서](https://www.framer.com/motion/)

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

# Motion 패키지 개발 모드
pnpm dev:motion

# Motion 패키지 빌드
pnpm build:motion

# 타입 체크
pnpm --filter @harryk-ds/motion type-check
```

### 새 컴포넌트 추가

1. **컴포넌트 파일 생성**

```bash
packages/motion/src/components/YourAnimation/
├── YourAnimation.tsx
└── index.ts
```

2. **Export 추가**

```typescript
// packages/motion/src/components/index.ts
export { YourAnimation } from './YourAnimation';
```

3. **빌드 및 테스트**

```bash
pnpm build:motion
```

4. **Storybook 스토리 작성**

```bash
# apps/storybook/src/stories/YourAnimation.stories.tsx
```

## 🔧 기술 스택

- **React**: 19.x
- **TypeScript**: 5.9.x
- **애니메이션**: Framer Motion 11.x
- **빌드 도구**: Vite 7.x

## 📦 패키지 구조

```
packages/motion/
├── src/
│   ├── components/
│   │   ├── FadeIn/
│   │   │   ├── FadeIn.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/            # 커스텀 훅 (향후 확장)
│   ├── utils/            # 유틸리티 함수 (향후 확장)
│   └── index.ts
├── dist/                 # 빌드 결과물
└── package.json
```

## 🎯 향후 계획

다음 컴포넌트들이 추가될 예정입니다:

- **Slide**: 슬라이드 애니메이션
- **Scale**: 크기 변화 애니메이션
- **Rotate**: 회전 애니메이션
- **Stagger**: 순차 애니메이션
- **useInView**: 뷰포트 감지 훅
- **useScroll**: 스크롤 애니메이션 훅

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소 Fork
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-animation`)
3. 변경사항 커밋 (`git commit -m 'Add amazing animation'`)
4. 브랜치에 Push (`git push origin feature/amazing-animation`)
5. Pull Request 생성

### 컴포넌트 작성 가이드라인

- **성능**: 60fps 유지
- **접근성**: `prefers-reduced-motion` 지원
- **타입 안전성**: 완전한 TypeScript 지원
- **문서화**: Props 설명 및 예시 제공

## 📝 라이선스

MIT License - 자세한 내용은 [LICENSE](../../LICENSE) 파일을 참조하세요.

## 🔗 관련 패키지

- [@harryk-ds/ui](../ui/README.md) - UI 컴포넌트
- [@harryk-ds/storybook](../../apps/storybook/README.md) - 컴포넌트 문서

## 📞 문의

- **Author**: harryk-im
- **Repository**: [github.com/harryk-im/harryk-ds](https://github.com/harryk-im/harryk-ds)
- **Issues**: [github.com/harryk-im/harryk-ds/issues](https://github.com/harryk-im/harryk-ds/issues)

---

**Animate with Joy! 🎬✨**

