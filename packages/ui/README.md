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
    <Button color="blue" variant="fill" size="md">
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
| `color` | `'blue' \| 'red' \| 'grey'` | `'blue'` | 버튼의 색상을 선택해요. |
| `variant` | `'fill' \| 'weak'` | `'fill'` | 버튼의 스타일을 선택해요. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼의 크기를 선택해요. |
| `fullWidth` | `boolean` | `false` | 버튼이 부모 너비를 가득 채우도록 해요. |
| `loading` | `boolean` | `false` | 로딩 상태예요. `true`이면 버튼 동작이 막혀요(disabled). |
| `children` | `React.ReactNode` | - | 버튼에 표시할 내용이에요. |
| `...props` | `ButtonHTMLAttributes` | - | HTML button 요소의 모든 속성을 지원해요. |

#### 색상 옵션

- `blue`: 주요 액션에 사용하는 파란색이에요.
- `red`: 위험하거나 주의가 필요한 액션에 사용하는 빨간색이에요.
- `grey`: 보조 액션에 사용하는 회색이에요.

#### 스타일 옵션

- `fill`: 배경색이 채워진 기본 스타일이에요.
- `weak`: 흰 배경 위에 반투명 색상 배경 레이어를 덧입힌 스타일이에요.

#### 크기 옵션

- `sm`: 작은 크기예요.
- `md`: 기본 크기예요.
- `lg`: 큰 크기예요.

#### 예시

```tsx
import { Button } from "@harryk-ds/ui";

// 기본 버튼 (blue · fill · md)
<Button>기본 버튼</Button>

// 색상과 스타일, 크기 지정
<Button color="blue" variant="fill" size="lg">
  Blue Fill 버튼
</Button>

<Button color="grey" variant="weak" size="md">
  Grey Weak 버튼
</Button>

<Button color="red" variant="fill" size="sm">
  Red 버튼
</Button>

// 부모 너비를 가득 채우기
<Button fullWidth>전체 너비 버튼</Button>

// 로딩 상태 (동작이 막혀요)
<Button loading>저장 중</Button>

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
<Button style={{ backgroundColor: 'blue' }} color="blue">
  커스텀 스타일 버튼
</Button>
```

2. `className` prop을 통해 커스터 마이징이 가능해요.

```tsx
<Button className="my-custom-class" color="blue">
  커스텀 스타일 버튼
</Button>
```

### 컬러 토큰

색상은 `oklch` 기반의 `COLORS` 토큰으로 제공해요. 계열마다 100~900 아홉 단계가 있고, **숫자가 클수록 어두워요.**

```tsx
import { COLORS, withOpacity } from "@harryk-ds/ui";

COLORS.blue[500]                    // oklch(53% 0.125 263.18)
COLORS.lightGrey[300]               // 배경용 밝은 회색
withOpacity(COLORS.blue[500], 0.4)  // 임의의 투명도가 필요할 때
```

용도에 따라 두 갈래로 나뉘어요.

| 계열 | 쓰는 자리 |
|------|-----------|
| `blue` · `red` · `grey` | 텍스트, 보더, 솔리드 배경처럼 **또렷하게 잡히는 자리** |
| `lightGrey` | 페이지·카드·hover 처럼 **뒤로 물러나는 배경** |

`blue` · `red` · `grey` 는 같은 명도 사다리를 공유해요. 그래서 `blue[500]` 과 `grey[500]` 은 비슷한 시각적 무게를 가져서, 계열만 바꿔 끼워도 균형이 유지돼요. `lightGrey` 는 배경 전용이라 더 밝고 촘촘한 사다리를 따로 써요.

이 밖에 각 계열의 `Alpha15` 변형과 `black` · `white` 를 제공해요.

#### 토큰을 수정할 때 (기여자용)

컬러 토큰은 **손으로 적지 않고 생성해요.** 사람이 편집하는 파일은 `colors.source.ts` 하나뿐이에요.

```bash
pnpm build:colors    # colors.ts 와 tokens.json 을 다시 생성해요
pnpm check:colors    # 생성 결과가 커밋된 내용과 같은지 확인해요 (CI 가 돌려요)
```

> **`colors.ts` 와 `tokens.json` 을 직접 편집하지 마세요.** 다음 생성 때 사라져요.

Figma·Token Studio 에서는 `packages/ui/tokens.json` 을 가져다 쓰면 돼요. Token Studio 포맷(`$type` / `$value`)이에요.

## 📚 문서

더 자세한 문서와 인터랙티브 예제는 Storybook에서 확인할 수 있어요.

- [Storybook 문서](https://github.com/harryk-im/harryk-ds#readme)
- [컴포넌트 가이드라인](../../.ai/architecture.md)

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
├── ui-component.css.ts    # Vanilla Extract 스타일
├── ui-component.types.ts  # 타입 정의
├── ui-component.test.tsx  # 행동·계약·접근성 테스트
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
├── scripts/
│   └── build-colors.ts             # 컬러 토큰 생성기
├── src/
│   ├── components/
│   │   ├── badge/
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.css.ts
│   │   │   ├── button.types.ts
│   │   │   ├── button.test.tsx
│   │   │   └── index.ts
│   │   ├── heading/
│   │   ├── modal/
│   │   ├── paragraph/              # context.ts 로 스타일을 물려줘요
│   │   └── index.ts
│   ├── styles/
│   │   ├── foundation/             # withOpacity 등 스타일 헬퍼
│   │   └── tokens/                 # 디자인 토큰
│   │       ├── colors.source.ts    # 컬러 토큰 SSOT (사람이 편집해요)
│   │       ├── colors.ts           # 생성물 (직접 편집하지 마세요)
│   │       ├── typography.ts
│   │       ├── spacing.ts
│   │       └── radii.ts
│   └── index.ts
├── tokens.json                     # Figma / Token Studio 용 (생성물)
├── dist/                           # 빌드 결과물
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

