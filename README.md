# Harryk 디자인 시스템 📚

[![CI Pipeline](https://github.com/harryk-im/harryk-ds/actions/workflows/ci.yml/badge.svg)](https://github.com/harryk-im/harryk-ds/actions/workflows/ci.yml)
[![Chromatic](https://github.com/harryk-im/harryk-ds/actions/workflows/chromatic.yml/badge.svg)](https://github.com/harryk-im/harryk-ds/actions/workflows/chromatic.yml)

**Harryk 디자인 시스템**은 일관성 있고 재사용 가능한 UI 컴포넌트들을 제공하는 모노레포 기반 디자인 시스템입니다.

## 🏗️ 프로젝트 구조

```
harryk-ds/
├── packages/                    # 컴포넌트 패키지들
│   ├── ui/                     # UI 컴포넌트 (@harryk-ds/ui)
│   │   └── src/components/
│   │       └── Button/         # 버튼 컴포넌트
│   └── motion/                 # 모션 컴포넌트 (@harryk-ds/motion)
│       └── src/components/
│           └── FadeIn/         # 페이드인 애니메이션
└── apps/                       # 애플리케이션들
    └── storybook/              # Storybook 문서화 (@harryk-ds/storybook)
        └── src/stories/        # 모든 스토리 파일
```

### 아키텍처 원칙

이 프로젝트는 **중앙 집중형 스토리 관리** 방식을 채택했습니다:

- **컴포넌트 패키지** (`packages/*`): 순수한 컴포넌트 라이브러리

  - Storybook 의존성 없음
  - 가벼운 번들 크기
  - 독립적인 배포 가능

- **Storybook 앱** (`apps/storybook`): 문서화 전용
  - 모든 스토리 파일 포함
  - Storybook 의존성 집중
  - 의존성 중복 제거

## 🚀 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

#### Storybook 실행 (추천)

```bash
pnpm storybook
```

http://localhost:6006 에서 컴포넌트들을 확인할 수 있습니다.

#### 컴포넌트 개발 모드

```bash
pnpm dev
```

### 3. 빌드

```bash
# 모든 패키지 빌드
pnpm build

# Storybook 정적 사이트 빌드 (배포용)
pnpm build-storybook
```

## 📦 패키지들

### @harryk-ds/ui

기본 UI 컴포넌트들을 포함합니다.

**컴포넌트:**

- `Button` - 다양한 variant와 size를 지원하는 버튼

**기술 스택:**

- React 19
- TypeScript
- Vanilla Extract CSS
- Vite

### @harryk-ds/motion

애니메이션 컴포넌트들을 포함합니다.

**컴포넌트:**

- `FadeIn` - 다양한 방향과 설정을 지원하는 페이드인 애니메이션

**기술 스택:**

- React 19
- TypeScript
- Framer Motion
- Vite

## 🛠️ 사용 방법

### 패키지 설치

```bash
# UI 컴포넌트
npm install @harryk-ds/ui

# 모션 컴포넌트
npm install @harryk-ds/motion
```

### 컴포넌트 사용

```tsx
import { Button } from "@harryk-ds/ui";
import { FadeIn } from "@harryk-ds/motion";

function App() {
  return (
    <FadeIn direction="up" duration={0.6}>
      <Button variant="primary" size="lg">
        안녕하세요!
      </Button>
    </FadeIn>
  );
}
```

## 📖 문서화

모든 컴포넌트의 상세한 문서는 Storybook에서 확인할 수 있습니다:

```bash
pnpm storybook
```

각 컴포넌트별로 다음을 제공합니다:

- 사용법 및 예시
- Props API 문서
- 인터랙티브 컨트롤
- 접근성 가이드라인

## 🎨 디자인 토큰

### 색상

- Primary: `#2196f3`
- Secondary: `#9e9e9e`
- Success: `#4caf50`
- Warning: `#ff9800`
- Error: `#f44336`

### 타이포그래피

- Font Family: system-ui, -apple-system, sans-serif
- Font Sizes: 12px, 14px, 16px, 18px, 24px, 32px

### 간격

- Spacing Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 🔧 개발

### 스크립트

```bash
# 개발
pnpm dev                 # 모든 패키지 워치 모드
pnpm dev:ui             # UI 패키지만 개발
pnpm dev:motion         # Motion 패키지만 개발

# 빌드
pnpm build              # 모든 패키지 빌드
pnpm build:ui           # UI 패키지만 빌드
pnpm build:motion       # Motion 패키지만 빌드

# Storybook
pnpm storybook          # Storybook 개발 서버
pnpm build-storybook    # Storybook 정적 빌드

# Chromatic (시각적 테스트)
pnpm chromatic          # Chromatic 배포 및 시각적 테스트
pnpm chromatic:ci       # CI 환경용 Chromatic 실행

# 유틸리티
pnpm type-check         # 타입 체크
pnpm lint               # 린트 검사
pnpm lint:fix           # 린트 자동 수정
pnpm clean              # 빌드 파일 및 node_modules 정리
```

### 기술 스택

- **언어**: TypeScript 5.9
- **UI 라이브러리**: React 19
- **빌드 도구**: Vite 7
- **패키지 매니저**: pnpm 8 (workspace)
- **CSS-in-JS**: Vanilla Extract (UI 패키지)
- **애니메이션**: Framer Motion 11 (Motion 패키지)
- **문서화**: Storybook 8 + Chromatic
- **린터/포맷터**: Biome 2.2
- **Git Hooks**: Husky 9
- **CI/CD**: GitHub Actions
- **Node.js**: 22

## 🚀 배포

### Chromatic 설정

1. **Chromatic 계정 생성**
   - [chromatic.com](https://www.chromatic.com/)에서 계정 생성
   - GitHub 저장소 연결

2. **프로젝트 토큰 설정**
   ```bash
   # 환경 변수 파일 생성
   cp env.example .env
   # CHROMATIC_PROJECT_TOKEN에 발급받은 토큰 입력
   ```

3. **GitHub Secrets 설정**
   - Repository Settings > Secrets and variables > Actions
   - `CHROMATIC_PROJECT_TOKEN` 추가

4. **Chromatic 배포**
   ```bash
   pnpm chromatic
   ```

### Storybook 배포 (Vercel)

1. **Vercel 프로젝트 생성**

   ```bash
   vercel --prod
   ```

2. **빌드 설정**

   - Build Command: `pnpm build-storybook`
   - Output Directory: `apps/storybook/storybook-static`
   - Root Directory: `/`

3. **환경 변수** (필요시)
   ```
   NODE_VERSION=22
   ```

### npm 패키지 배포

```bash
# UI 패키지 배포
cd packages/ui
npm publish

# Motion 패키지 배포
cd packages/motion
npm publish
```

### CI/CD 파이프라인

GitHub Actions를 통해 자동화된 CI/CD 파이프라인이 구성되어 있습니다:

#### CI Pipeline (`.github/workflows/ci.yml`)

**트리거**: main, develop 브랜치로의 push 또는 PR

**작업 내용**:
1. **Lint and Type Check**
   - Biome를 통한 코드 린팅
   - TypeScript 타입 체크

2. **Build**
   - 모든 패키지 빌드 검증
   - Storybook 정적 빌드
   - 빌드 결과물 아티팩트 업로드 (7일 보관)

#### Chromatic Deployment (`.github/workflows/chromatic.yml`)

**트리거**: main, develop 브랜치로의 PR 생성 시

**작업 내용**:
- Storybook 빌드 및 Chromatic 배포
- TurboSnap 활성화 (변경된 스토리만 처리)
- 시각적 회귀 테스트는 스킵 (`skip: 'chromatic'`)
- PR 리뷰용 Storybook 미리보기 제공

**특징**:
- ✅ 의존성 캐싱으로 빌드 시간 단축
- ✅ Node.js 22 환경에서 실행
- ✅ 병렬 처리로 효율적인 CI 실행
- ✅ PR에서 자동 실패 방지 (`exitZeroOnChanges`)

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 Authors

- **harryk-im** - _Initial work_

---

**Happy Coding! 🎉**
