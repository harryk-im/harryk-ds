# 패키지 배포 전략

## 개요

이 워크플로우는 `develop` 브랜치가 `main` 브랜치로 머지될 때, **변경된 패키지만 자동으로 npm에 배포**합니다.

## 동작 방식

1. **변경 감지**: `main` 브랜치에 푸시가 발생하면, 이전 커밋과 비교하여 변경된 패키지를 감지합니다.
2. **선택적 빌드**: 변경된 패키지만 빌드합니다.
3. **자동 배포**: 변경된 패키지만 npm에 배포합니다.

## 변경 감지 규칙

다음 조건에 해당하는 파일 변경이 감지되면 해당 패키지가 변경된 것으로 간주됩니다:

- `packages/ui/` 하위 파일 변경 (단, `dist/`, `node_modules/` 제외)
- `packages/motion/` 하위 파일 변경 (단, `dist/`, `node_modules/` 제외)

## 버전 관리

- 만약 현재 버전이 이미 npm에 배포되어 있다면, 자동으로 패치 버전을 증가시킵니다.
  - 예: `0.1.0` → `0.1.1`

## 설정 필요 사항

GitHub Actions Secrets에 다음을 설정해야 합니다:

- `NPM_TOKEN`: npm 발행 권한이 있는 토큰

## 사용 예시

### 시나리오 1: @harryk-ds/ui만 변경

```bash
# develop 브랜치에서
git checkout develop
# packages/ui/src/components/Button.tsx 수정
git commit -am "feat: Button 컴포넌트 개선"
git push origin develop

# main으로 머지
git checkout main
git merge develop
git push origin main
```

결과: `@harryk-ds/ui`만 npm에 배포됩니다.

### 시나리오 2: @harryk-ds/motion만 변경

```bash
# packages/motion/src/components/FadeIn.tsx 수정
git commit -am "feat: FadeIn 애니메이션 개선"
git push origin develop

# main으로 머지
git checkout main
git merge develop
git push origin main
```

결과: `@harryk-ds/motion`만 npm에 배포됩니다.

## 수동 버전 관리

변경사항이 있을 때는 Changesets를 사용하여 버전을 관리할 수 있습니다:

```bash
# 변경사항 추가
pnpm changeset

# 버전 업데이트
pnpm changeset:version

# 수동 배포 (워크플로우가 자동 배포하므로 일반적으로 불필요)
pnpm changeset:publish
```

## 트러블슈팅

### 배포가 실행되지 않는 경우

1. GitHub Actions 로그에서 "변경된 패키지" 확인
2. `packages/**` 경로의 파일이 실제로 변경되었는지 확인
3. `dist/` 폴더 변경만으로는 감지되지 않음 (소스 코드 변경 필요)

### 버전 충돌

만약 같은 버전이 이미 npm에 배포되어 있으면 자동으로 패치 버전이 증가합니다.
더 정교한 버전 관리를 원한다면 Changesets를 사용하세요.

