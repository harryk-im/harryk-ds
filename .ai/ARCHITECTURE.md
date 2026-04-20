# 아키텍처 가이드

## 모노레포 구조

### 개요

Harryk 디자인 시스템은 **중앙 집중형으로 스토리를 관리**하는 모노레포 구조예요.

```
harryk-ds/
├── packages/         # 배포용 패키지 (ui, motion)
├── apps/storybook    # 컴포넌트 문서화 및 테스트
└── .github/          # CI/CD (Chromatic, Release 등)
```

상세한 파일 구조는 AI 혹은 사용자가 직접 탐색(`ls`)하여 파악하는 것을 권장해요.

---

## 기술 스택 (Core)

| 영역 | 도구 |
|------|------|
| **패키지 관리** | pnpm workspace |
| **빌드** | Vite |
| **스타일** | Vanilla Extract |
| **애니메이션** | Framer Motion |
| **린트/포맷** | Biome |
| **문서화** | Storybook + Chromatic |
| **릴리즈** | Changesets |

---

## 패키지별 상세 스펙

상세한 구현 규칙은 각 전문 영역별 문서에서 최신 상태로 관리돼요.

- **UI 표준**: [ui.md](./specs/ui.md)
- **애니메이션 표준**: [motion.md](./specs/motion.md)
- **문서화 표준**: [documentation.md](./specs/documentation.md)

---

**결론**: 최소한의 문서를 유지하고 실제 소스 코드를 통해 맥락을 파악하여 효율적인 개발 환경을 유지해요.
