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

### 1. NPM_TOKEN 생성 및 설정

npm 스코프 패키지를 배포하려면 올바른 권한을 가진 토큰이 필요합니다.

#### 토큰 생성 방법:

```bash
# npm에 로그인
npm login

# Automation 토큰 생성 (CI/CD용, 추천)
npm token create --type=automation

# 또는 Read-Write 토큰 생성
npm token create
```

#### 토큰 확인:

생성된 토큰은 다음 권한을 가져야 합니다:
- ✅ Package publishing 권한
- ✅ Organization/Scope 접근 권한 (있는 경우)

#### GitHub Secrets 설정:

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. `NPM_TOKEN` 추가 (위에서 생성한 토큰 값)

### 2. npm 스코프 확인

스코프 패키지 (`@harryk-ds/ui`, `@harryk-ds/motion`)를 처음 배포할 때:
- 스코프는 자동으로 생성됩니다 (`--access public` 플래그 사용)
- npm 계정에 해당 스코프 접근 권한이 있어야 합니다

### 3. 로컬에서 테스트

배포 전 로컬에서 테스트:

```bash
# npm 로그인 확인
npm whoami

# 인증 토큰 설정
export NPM_TOKEN="your-token-here"
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

# 배포 테스트 (dry-run)
cd packages/ui
npm publish --access public --dry-run
```

## 트러블슈팅

### "Scope not found" 에러

이 에러는 다음 이유로 발생할 수 있습니다:

1. **NPM_TOKEN이 올바르지 않음**
   - GitHub Secrets에 `NPM_TOKEN`이 올바르게 설정되었는지 확인
   - 토큰이 만료되지 않았는지 확인
   - 토큰에 패키지 발행 권한이 있는지 확인

2. **npm 계정 권한 부족**
   - npm 웹사이트에서 스코프 접근 권한 확인
   - `npm whoami`로 로그인된 계정 확인

3. **스코프가 아직 생성되지 않음**
   - 첫 배포 시 스코프는 자동 생성되어야 하지만, 실패할 수 있음
   - 수동으로 npm 웹사이트에서 확인

### 해결 방법

1. **토큰 재생성**
   ```bash
   # 기존 토큰 삭제 (선택사항)
   npm token revoke <token-id>

   # 새 토큰 생성
   npm token create --type=automation
   ```

2. **로컬에서 수동 배포 시도**
   ```bash
   cd packages/ui
   npm publish --access public
   ```

   성공하면 토큰과 권한은 정상입니다.

3. **워크플로우 로그 확인**
   - GitHub Actions 로그에서 `.npmrc` 내용 확인
   - `npm whoami` 출력 확인
   - 인증 토큰이 올바르게 설정되었는지 확인

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
