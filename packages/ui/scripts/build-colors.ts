/**
 * 컬러 토큰 생성기예요.
 *
 * `src/styles/tokens/colors.source.ts` 를 읽어서 아래 두 파일을 생성해요.
 *
 *   - `src/styles/tokens/colors.ts` (컴포넌트가 import 하는 토큰)
 *   - `tokens.json` (Figma / Token Studio 포맷)
 *
 * 실행: `pnpm build:colors`
 * 검증: `pnpm check:colors` (생성 결과가 커밋된 내용과 같은지 확인)
 *
 * 이 스크립트가 존재하는 이유는 딱 하나예요.
 * "이 명도에서 이 색조가 sRGB 로 표현할 수 있는 최대 채도"는 닫힌 해가 없어서
 * 손으로 계산할 수 없어요. `maxChroma()` 가 그걸 이진 탐색으로 찾아줘요.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ALPHA_VARIANTS,
  CHROMA_SAFETY,
  FAMILIES,
  RAMPS,
  STANDALONE,
} from "../src/styles/tokens/colors.source.ts";

/** 이 스크립트가 쓰는 경로는 전부 UI 패키지 안에 있어요. */
const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const COLORS_TS = join(PACKAGE_ROOT, "src/styles/tokens/colors.ts");
const TOKENS_JSON = join(PACKAGE_ROOT, "tokens.json");

/* ------------------------------------------------------------------ *
 * 색공간 변환
 * ------------------------------------------------------------------ */

/** OKLCH 를 선형 sRGB 로 변환해요. 감마 보정 전이라 값이 0~1 을 벗어날 수 있어요. */
const oklchToLinearSrgb = (
  lightness: number,
  chroma: number,
  hueDeg: number
): [number, number, number] => {
  const hue = (hueDeg * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};

/** 이 색이 sRGB 안에 있는지 확인해요. */
const isInSrgb = (lightness: number, chroma: number, hue: number): boolean =>
  oklchToLinearSrgb(lightness, chroma, hue).every(
    (channel) => channel >= -1e-5 && channel <= 1 + 1e-5
  );

/**
 * 주어진 명도와 색조에서 sRGB 가 허용하는 최대 채도를 찾아요.
 *
 * sRGB 색역의 경계와 OKLCH 의 교점은 닫힌 해가 없어서 이진 탐색으로 좁혀요.
 * 60 회면 배정밀도 한계까지 수렴해요.
 */
const maxChroma = (lightness: number, hue: number): number => {
  let low = 0;
  let high = 0.5;

  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    if (isInSrgb(lightness, mid, hue)) low = mid;
    else high = mid;
  }

  return low;
};

/* ------------------------------------------------------------------ *
 * 토큰 조립
 * ------------------------------------------------------------------ */

/** 소수점 4자리까지 반올림하고 불필요한 0 을 없애요. `25.0000` 이 아니라 `25` 로 적어요. */
const formatNumber = (value: number): string =>
  String(Number(value.toFixed(4)));

/** `lightGrey` 를 `light-grey` 로 바꿔요. 주석 표기에 써요. */
const toKebabCase = (value: string): string =>
  value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

type ClampRecord = {
  token: string;
  lightness: number;
  target: number;
  actual: number;
};

const clamped: ClampRecord[] = [];

/** 목표 채도와 sRGB 한계 중 작은 쪽을 골라요. 깎인 경우는 따로 기록해요. */
const resolveChroma = (
  token: string,
  lightness: number,
  targetChroma: number,
  hue: number
): number => {
  const limit = maxChroma(lightness / 100, hue) * CHROMA_SAFETY;
  const actual = Math.min(targetChroma, limit);

  if (actual < targetChroma - 1e-6) {
    clamped.push({ token, lightness, target: targetChroma, actual });
  }

  return actual;
};

const toOklch = (
  lightness: number,
  chroma: number,
  hue: number,
  alpha?: number
): string => {
  const base = `oklch(${formatNumber(lightness)}% ${formatNumber(chroma)} ${formatNumber(hue)}`;
  return alpha === undefined ? `${base})` : `${base} / ${formatNumber(alpha)})`;
};

/**
 * 스텝 -> 색상 문자열이에요.
 *
 * 일반 객체 대신 Map 을 쓰는 이유가 있어요. 자바스크립트 객체는 정수처럼 생긴 키를
 * 항상 오름차순으로 재정렬해버려서, 900 부터 넣어도 100 부터 나와요.
 * Map 은 넣은 순서를 지켜주기 때문에 출력 순서를 코드로 통제할 수 있어요.
 */
type Scale = Map<number, string>;

/** 계열 이름 -> 스케일. */
const scales = new Map<string, Scale>();

const scaleOf = (name: string): Scale => {
  const scale = scales.get(name);
  if (!scale)
    throw new Error(
      `${name} 스케일을 찾지 못했어요. FAMILIES 에 등록했는지 확인해주세요.`
    );
  return scale;
};

/** 어두운 쪽부터 정렬해요. colors.ts 가 쓰는 순서예요. */
const darkestFirst = (scale: Scale) => [...scale].sort(([a], [b]) => b - a);
/** 밝은 쪽부터 정렬해요. tokens.json 이 쓰는 순서예요. */
const lightestFirst = (scale: Scale) => [...scale].sort(([a], [b]) => a - b);

for (const [family, { hue, chroma, ramp }] of Object.entries(FAMILIES)) {
  const steps = Object.entries(RAMPS[ramp])
    .map(([step, lightness]) => ({ step: Number(step), lightness }))
    .sort((a, b) => b.step - a.step);

  const base: Scale = new Map();
  const alphaScales = new Map<number, Scale>(
    ALPHA_VARIANTS.map((percent) => [percent, new Map()])
  );

  for (const { step, lightness } of steps) {
    const resolved = resolveChroma(
      `${family}[${step}]`,
      lightness,
      chroma,
      hue
    );

    base.set(step, toOklch(lightness, resolved, hue));
    for (const [percent, scale] of alphaScales) {
      scale.set(step, toOklch(lightness, resolved, hue, percent / 100));
    }
  }

  scales.set(family, base);
  for (const [percent, scale] of alphaScales) {
    scales.set(`${family}Alpha${percent}`, scale);
  }
}

/** 단독 색상은 스케일이 아니라 단일 문자열이에요. */
const standalone = new Map<string, string>(
  Object.entries(STANDALONE).map(([name, { lightness, chroma, hue }]) => [
    name,
    toOklch(lightness, chroma, hue),
  ])
);

/* ------------------------------------------------------------------ *
 * 출력 1 — colors.ts
 * ------------------------------------------------------------------ */

const buildColorsTs = (): string => {
  const blocks: string[] = [];

  for (const family of Object.keys(FAMILIES)) {
    blocks.push(`  // ${toKebabCase(family)}`);

    for (const name of [
      family,
      ...ALPHA_VARIANTS.map((percent) => `${family}Alpha${percent}`),
    ]) {
      const entries = darkestFirst(scaleOf(name))
        .map(([step, value]) => `    ${step}: "${value}",`)
        .join("\n");

      blocks.push(`  ${name}: {\n${entries}\n  },\n`);
    }
  }

  blocks.push("  // black & white");
  for (const [name, value] of standalone) {
    blocks.push(`  ${name}: "${value}",`);
  }

  return [
    "// 이 파일은 packages/ui/scripts/build-colors.ts 가 생성했어요. 직접 편집하지 마세요.",
    "// 값을 바꾸려면 colors.source.ts 를 수정하고 `pnpm build:colors` 를 실행해주세요.",
    "",
    "export const COLORS = {",
    blocks.join("\n"),
    "} as const;",
    "",
  ].join("\n");
};

/* ------------------------------------------------------------------ *
 * 출력 2 — tokens.json (Figma / Token Studio)
 * ------------------------------------------------------------------ *
 * tokens.json 에는 색상 말고 spacing, typography 같은 다른 토큰도 들어 있어요.
 * 그래서 파일을 통째로 덮어쓰지 않고 `global.color` 만 교체해요.
 *
 * 값 표기는 Token Studio 규약(`$type` / `$value`)을 따라요.
 */

type TokenStudioToken = { $type: "color"; $value: string };
type TokenStudioNode = TokenStudioToken | Record<string, TokenStudioToken>;

const buildColorNode = (): Record<string, TokenStudioNode> => {
  const node: Record<string, TokenStudioNode> = {};

  // 기본 계열을 먼저 모으고, 그 다음 알파 계열, 마지막에 단독 색상 순서예요.
  const families = Object.keys(FAMILIES);
  const alphaNames = families.flatMap((family) =>
    ALPHA_VARIANTS.map((percent) => `${family}Alpha${percent}`)
  );

  for (const name of [...families, ...alphaNames]) {
    // 스텝은 100 -> 900 오름차순으로 적어요.
    node[name] = Object.fromEntries(
      lightestFirst(scaleOf(name)).map(([step, value]) => [
        step,
        { $type: "color", $value: value },
      ])
    ) as Record<string, TokenStudioToken>;
  }

  for (const [name, value] of standalone) {
    node[name] = { $type: "color", $value: value };
  }

  return node;
};

const buildTokensJson = (): string => {
  const existing = JSON.parse(readFileSync(TOKENS_JSON, "utf8"));

  // 키를 새로 만들지 않고 기존 자리에 값만 넣어야 다른 토큰의 순서가 유지돼요.
  existing.global.color = buildColorNode();

  return `${JSON.stringify(existing, null, 2)}\n`;
};

/* ------------------------------------------------------------------ *
 * 실행
 * ------------------------------------------------------------------ */

writeFileSync(COLORS_TS, buildColorsTs());
writeFileSync(TOKENS_JSON, buildTokensJson());

const tokenCount =
  [...scales.values()].reduce((sum, scale) => sum + scale.size, 0) +
  standalone.size;

console.log(`토큰 ${tokenCount}개를 만들었어요.`);
console.log(`  ${COLORS_TS}`);
console.log(`  ${TOKENS_JSON}`);

if (clamped.length === 0) {
  console.log("\n목표 채도를 그대로 썼어요. 전부 sRGB 안에 들어와요.");
} else {
  console.log(
    `\n토큰 ${clamped.length}개는 채도를 깎았어요. sRGB 한계에 걸린 자리예요.`
  );
  for (const { token, lightness, target, actual } of clamped) {
    const ratio = Math.round((actual / target) * 100);
    console.log(
      `  ${token.padEnd(18)} L=${String(lightness).padStart(5)}%  ` +
        `${formatNumber(target)} -> ${formatNumber(actual)}  (${ratio}%)`
    );
  }
}
