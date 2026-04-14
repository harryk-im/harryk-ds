# 아키텍처 가이드

## 📐 모노레포 구조

### 개요

Harryk 디자인 시스템은 **중앙 집중형으로 스토리를 관리**하는 모노레포 구조예요.

```
harryk-ds/
├── packages/         # 배포용 컴포넌트 라이브러리
│   ├── ui/           # UI 컴포넌트
│   └── motion/       # 애니메이션 컴포넌트
├── apps/             # 내부 도구 및 문서
│   └── storybook/    # 컴포넌트 문서화
└── .github/workflows/
    ├── chromatic.yml     # 시각적 회귀 테스트
    ├── quality-check.yml # 린트·타입·빌드 체크
    └── release.yml       # Changesets를 이용한 릴리즈
```

---


## 🛠️ 기술 스택

| 영역 | 도구 | 버전 |
|------|------|------|
| **패키지 관리** | pnpm workspace | 10 |
| **빌드** | Vite + vite-plugin-dts | 7.1+ |
| **스타일 (ui)** | Vanilla Extract + recipes | 1.17+ |
| **애니메이션 (motion)** | Framer Motion | 11.0+ |
| **린트/포맷** | Biome | 2.2.5 |
| **Git Hooks** | Husky | 9.1+ |
| **릴리즈** | Changesets | 2.29+ |
| **문서화** | Storybook + Chromatic | 8.4+ |
| **React** | React 19 | 19.0+ |

---


## 📁 패키지별 구조 및 규칙

상세한 구현 규칙과 아키텍처 스펙은 각 전문 영역별 문서에서 최신 상태로 관리돼요.

- **UI 컴포넌트 표준**: [ui.md](./specs/ui.md) (packages/ui)
- **애니메이션 표준**: [motion.md](./specs/motion.md) (packages/motion)
- **문서화 및 스토리북**: [documentation.md](./specs/documentation.md) (apps/storybook)

---

## 🔄 워크플로우

### 1. 제품 개발 프로세스
새로운 컴포넌트를 추가하거나 기능을 개선할 때의 단계별 가이드는 [문서화 스펙](./specs/documentation.md)을 참고해주세요.

### 2. CI/CD 및 배포
- **코드 품질**: GitHub Actions(`quality-check.yml`)를 통해 린트, 타입, 빌드를 체크해요.
- **시각적 테스트**: Chromatic(`chromatic.yml`)을 통해 스토리북 배포와 시각적 회귀 테스트를 진행해요.
- **배포**: Changesets(`release.yml`)를 활용해 버전을 관리하고 npm에 배포해요.

---

## 🤖 AI 워크플로우

우리 프로젝트는 AI 협업의 효율을 위해 **페르소나 라우팅 시스템**을 운영해요.

1. **router.md**: 모든 페르소나의 정의와 라우팅 규칙이 담긴 SSOT 문서예요.
2. **Targeted Deep Dive**: AI는 작업 성격에 맞게 위 **"패키지별 표준(Specs)"** 문서로 직접 접근하여 규칙을 읽어요. 이를 통해 토큰 소모를 최소화하고 정확도를 높여요.
3. **동기화**: `pnpm ai:sync` 명령어로 모든 AI 설정을 동기화해요.

---

**결론**: harryk-ds는 명확하게 분리된 지식 모듈과 지능적인 AI 워크플로우를 통해 지속 가능한 성장을 지향해요.
