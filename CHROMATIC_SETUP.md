# Chromatic 설정 가이드 🎨

이 문서는 Harryk 디자인 시스템에서 Chromatic을 설정하고 사용하는 방법을 설명합니다.

## 📋 목차

1. [Chromatic이란?](#chromatic이란)
2. [초기 설정](#초기-설정)
3. [로컬 개발](#로컬-개발)
4. [CI/CD 설정](#cicd-설정)
5. [시각적 테스트 워크플로우](#시각적-테스트-워크플로우)
6. [모범 사례](#모범-사례)
7. [문제 해결](#문제-해결)

## Chromatic이란?

Chromatic은 Storybook과 통합되어 시각적 회귀 테스트를 제공하는 서비스입니다:

- **시각적 테스트**: UI 컴포넌트의 시각적 변경사항을 자동으로 감지
- **크로스 브라우저 테스트**: 다양한 브라우저와 뷰포트에서 테스트
- **협업 도구**: 디자이너와 개발자 간의 UI 리뷰 프로세스 지원
- **자동화**: CI/CD 파이프라인과 통합하여 자동화된 테스트

## 초기 설정

### 1. Chromatic 계정 생성

1. [chromatic.com](https://www.chromatic.com/)에 접속
2. GitHub 계정으로 로그인
3. 새 프로젝트 생성 및 GitHub 저장소 연결

### 2. 프로젝트 토큰 발급

1. Chromatic 대시보드에서 프로젝트 선택
2. **Manage** > **Configure** > **Setup** 페이지로 이동
3. **Project token** 복사

### 3. 환경 변수 설정

```bash
# 루트 디렉토리에서 환경 변수 파일 생성
cp env.example .env

# .env 파일에 토큰 추가
CHROMATIC_PROJECT_TOKEN=your_actual_token_here
```

### 4. GitHub Secrets 설정

1. GitHub 저장소 > **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** 클릭
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Secret: 발급받은 토큰 입력

## 로컬 개발

### 기본 사용법

```bash
# Chromatic에 Storybook 배포 및 시각적 테스트
pnpm chromatic

# 변경된 스토리만 테스트 (TurboSnap)
pnpm chromatic --only-changed

# 특정 브랜치와 비교
pnpm chromatic --branch-name feature/new-component
```

### 개발 워크플로우

1. **컴포넌트 개발**
   ```bash
   # Storybook 개발 서버 실행
   pnpm storybook
   ```

2. **스토리 작성**
   ```tsx
   // Button.stories.tsx
   export const Primary: Story = {
     args: {
       variant: 'primary',
       children: 'Button',
     },
   }
   ```

3. **로컬 테스트**
   ```bash
   # Chromatic에 배포하여 시각적 테스트
   pnpm chromatic
   ```

## CI/CD 설정

### GitHub Actions 워크플로우

프로젝트에는 이미 다음 워크플로우가 설정되어 있습니다:

#### `.github/workflows/chromatic.yml`
- **트리거**: `main`, `develop` 브랜치 푸시 및 PR
- **기능**:
  - TurboSnap 활성화 (변경된 스토리만 테스트)
  - main 브랜치에서 자동 승인
  - PR에서 UI 테스트 상태 체크

#### `.github/workflows/ci.yml`
- **트리거**: 모든 푸시 및 PR
- **기능**:
  - 린트 및 타입 체크
  - 패키지 빌드
  - Vitest 테스트 실행

### 브랜치 전략

```
main (production)
├── develop (staging)
└── feature/* (development)
```

- **feature 브랜치**: 개발 중인 기능, Chromatic에서 변경사항 리뷰
- **develop 브랜치**: 통합 테스트, 자동 배포
- **main 브랜치**: 프로덕션 배포, 자동 승인

## 시각적 테스트 워크플로우

### 1. 변경사항 감지

```bash
# 새로운 기능 브랜치 생성
git checkout -b feature/new-button-variant

# 컴포넌트 수정
# ...

# Chromatic 테스트 실행
pnpm chromatic
```

### 2. 리뷰 프로세스

1. **Chromatic 대시보드**에서 변경사항 확인
2. **Accept** 또는 **Deny** 결정
3. **Comments** 추가로 피드백 제공

### 3. 승인 및 병합

```bash
# 변경사항이 승인되면 PR 생성
git push origin feature/new-button-variant

# GitHub에서 PR 생성
# Chromatic 상태 체크 통과 후 병합
```

## 모범 사례

### 스토리 작성

```tsx
// 좋은 예: 다양한 상태를 테스트
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
}

// 좋은 예: 반응형 테스트
export const ResponsiveLayout: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        desktop: { name: 'Desktop', styles: { width: '1024px', height: '768px' } },
      },
    },
  },
}
```

### Chromatic 최적화

```tsx
// 애니메이션 비활성화 (일관된 스냅샷을 위해)
export const WithAnimation: Story = {
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
}

// 특정 뷰포트에서만 테스트
export const MobileOnly: Story = {
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
}

// 스냅샷 지연 (로딩 완료 대기)
export const AsyncComponent: Story = {
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
}
```

### 성능 최적화

```bash
# TurboSnap 활용 (변경된 파일만 테스트)
pnpm chromatic --only-changed

# 특정 스토리만 테스트
pnpm chromatic --only-story-names="Button/*"

# 빌드 재사용
pnpm build-storybook
pnpm chromatic --storybook-build-dir=storybook-static
```

## 문제 해결

### 일반적인 문제

#### 1. 토큰 인증 오류
```bash
Error: HTTP 401: Unauthorized
```
**해결책**:
- `.env` 파일의 토큰 확인
- GitHub Secrets 설정 확인

#### 2. 빌드 실패
```bash
Error: Storybook build failed
```
**해결책**:
```bash
# 로컬에서 빌드 테스트
pnpm build-storybook

# 의존성 재설치
pnpm install

# 캐시 정리
pnpm clean
```

#### 3. 스냅샷 불일치
```bash
Warning: Visual differences detected
```
**해결책**:
- Chromatic 대시보드에서 변경사항 리뷰
- 의도된 변경사항이면 **Accept**
- 의도되지 않은 변경사항이면 코드 수정

#### 4. TurboSnap 문제
```bash
Warning: TurboSnap disabled due to missing stats
```
**해결책**:
```bash
# stats.json 파일 생성 확인
pnpm build-storybook --stats-json

# Webpack stats 설정 확인 (Angular의 경우)
# angular.json에서 webpackStatsJson: true 설정
```

### 디버깅 팁

```bash
# 상세 로그 출력
pnpm chromatic --debug

# 로컬 빌드 테스트
pnpm chromatic --dry-run

# 특정 브랜치와 비교
pnpm chromatic --branch-name main
```

### 지원 및 문의

- **Chromatic 문서**: [chromatic.com/docs](https://www.chromatic.com/docs)
- **Storybook 문서**: [storybook.js.org](https://storybook.js.org)
- **GitHub Issues**: 프로젝트 관련 문제 보고

---

**Happy Testing! 🎨✨**




