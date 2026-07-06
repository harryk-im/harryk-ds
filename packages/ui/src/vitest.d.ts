/// <reference types="vitest/globals" />
import "@testing-library/jest-dom/vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

// vitest-axe는 구식 `Vi` 네임스페이스를 확장해요.
// Vitest 4는 `vitest` 모듈의 Assertion을 참조하므로 여기서 다시 연결해줘요.
declare module "vitest" {
  interface Assertion<_T = unknown> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
