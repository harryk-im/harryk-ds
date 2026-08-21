/**
 * 컬러 토큰 회귀 테스트예요.
 *
 * ## `testing.md` 의 "픽셀·색상 검증 금지" 규칙과 충돌하지 않아요
 *
 * 그 규칙은 컴포넌트 테스트를 향한 거예요. "Button 이 blue300 을 쓰는가" 같은
 * 외형은 Storybook 에서 눈으로 확인해요.
 *
 * 여기서 검증하는 건 외형이 아니라 토큰이 지켜야 할 데이터 계약이에요.
 * "모든 토큰이 sRGB 로 표현 가능한가", "램프가 단조로운가" 같은 불변식은
 * 눈으로는 확인할 수 없고, 깨지면 잘못된 색이 조용히 배포돼요.
 *
 * ## 색공간 변환을 여기에 다시 구현한 건 의도예요
 *
 * `scripts/build-colors.ts` 와 같은 함수를 공유하면, 변환식 자체가 틀렸을 때
 * 생성기도 테스트도 똑같이 틀려서 영원히 초록불이에요. 스펙이 경고하는 동어반복이에요.
 *
 * 그래서 이렇게 나눴어요.
 *
 *   1. 첫 블록이 이 파일의 구현을 외부에 공표된 sRGB 원색 좌표로 검증해요.
 *   2. 나머지 블록이 그 검증된 구현으로 토큰을 검사해요.
 *
 * 두 구현 중 어느 쪽에 오타가 나도 빨간불이 떠요. 이 중복을 제거하지 마세요.
 */

import { COLORS } from "./colors";
import { FAMILIES, RAMPS } from "./colors.source";

/* ------------------------------------------------------------------ *
 * 색공간 변환 (의도적 중복 — 위 주석 참고)
 * ------------------------------------------------------------------ */

type Oklch = {
  lightness: number;
  chroma: number;
  hue: number;
  alpha: number | null;
};

const OKLCH_PATTERN =
  /^oklch\((\d+(?:\.\d+)?)% (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)(?: \/ (\d+(?:\.\d+)?))?\)$/;

const parseOklch = (value: string): Oklch | null => {
  const matched = OKLCH_PATTERN.exec(value);
  if (!matched) return null;

  return {
    lightness: Number(matched[1]) / 100,
    chroma: Number(matched[2]),
    hue: Number(matched[3]),
    alpha: matched[4] === undefined ? null : Number(matched[4]),
  };
};

const toLinearSrgb = ({
  lightness,
  chroma,
  hue,
}: Pick<Oklch, "lightness" | "chroma" | "hue">): [number, number, number] => {
  const radian = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(radian);
  const b = chroma * Math.sin(radian);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};

/** sRGB 로 표현할 수 있는 색인지 확인해요. 채널이 0~1 을 벗어나면 표현 불가예요. */
const isInSrgb = (color: Oklch): boolean =>
  toLinearSrgb(color).every(
    (channel) => channel >= -1e-4 && channel <= 1 + 1e-4
  );

const toSrgbHex = (color: Oklch): string => {
  const encode = (channel: number) => {
    const gamma =
      channel <= 0.0031308
        ? 12.92 * channel
        : 1.055 * channel ** (1 / 2.4) - 0.055;
    const clamped = Math.min(1, Math.max(0, gamma));

    return Math.round(clamped * 255)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${toLinearSrgb(color).map(encode).join("")}`;
};

/* ------------------------------------------------------------------ *
 * 토큰 수집
 * ------------------------------------------------------------------ */

type Token = { name: string; value: string };
type Scale = Readonly<Record<string, string>>;

const definitions = Object.entries(COLORS) as [string, string | Scale][];

/** 100~900 단계를 갖는 계열이에요. */
const scales = definitions.filter(
  (entry): entry is [string, Scale] => typeof entry[1] !== "string"
);

/** black, white 처럼 단계가 없는 단독 색상이에요. */
const singles = definitions.filter(
  (entry): entry is [string, string] => typeof entry[1] === "string"
);

const tokens: Token[] = [
  ...scales.flatMap(([family, scale]) =>
    Object.entries(scale).map(([step, value]) => ({
      name: `${family}[${step}]`,
      value,
    }))
  ),
  ...singles.map(([name, value]) => ({ name, value })),
];

/** 파싱에 실패하면 형식 테스트가 잡아요. 나머지 테스트는 파싱된 것만 다뤄요. */
const parsed = tokens.flatMap(({ name, value }) => {
  const color = parseOklch(value);
  return color ? [{ name, value, color }] : [];
});

const alphaSuffix = /Alpha(\d+)$/;

const coreFamilies = Object.entries(FAMILIES)
  .filter(([, family]) => family.ramp === "core")
  .map(([name]) => name);

/* ------------------------------------------------------------------ *
 * 테스트
 * ------------------------------------------------------------------ */

describe("COLORS", () => {
  // 이 블록이 아래 모든 테스트의 신뢰 근거예요.
  // 변환식에 오타가 나면 여기가 먼저 빨간불이 떠요.
  describe("색공간 변환이 정확한지 먼저 확인해요", () => {
    const references = [
      { name: "흰색", value: "oklch(100% 0 0)", hex: "#ffffff" },
      { name: "검정", value: "oklch(0% 0 0)", hex: "#000000" },
      { name: "중간 회색", value: "oklch(59.987% 0 0)", hex: "#808080" },
      {
        name: "sRGB 빨강",
        value: "oklch(62.796% 0.25768 29.234)",
        hex: "#ff0000",
      },
      {
        name: "sRGB 초록",
        value: "oklch(86.644% 0.29483 142.495)",
        hex: "#00ff00",
      },
      {
        name: "sRGB 파랑",
        value: "oklch(45.201% 0.31321 264.052)",
        hex: "#0000ff",
      },
    ];

    it.each(references)(
      "$name 의 OKLCH 좌표를 $hex 으로 변환해요",
      ({ value, hex }) => {
        const color = parseOklch(value);

        expect(color).not.toBeNull();
        expect(color && toSrgbHex(color)).toBe(hex);
      }
    );
  });

  describe("모든 토큰이 약속한 표기법을 지켜요", () => {
    it("모든 토큰이 oklch() 문법이에요", () => {
      // 생성기가 숫자 포맷을 잘못 뱉거나 누군가 손으로 hex 를 적어 넣으면 걸려요.
      const invalid = tokens
        .filter(({ value }) => parseOklch(value) === null)
        .map(({ name, value }) => `${name}: ${value}`);

      expect(invalid).toEqual([]);
    });

    it("알파 계열만 투명도를 갖고 나머지는 불투명해요", () => {
      const wrong = parsed
        .filter(({ name, color }) => {
          const family = name.split("[")[0];
          const shouldHaveAlpha = alphaSuffix.test(family);

          return shouldHaveAlpha !== (color.alpha !== null);
        })
        .map(({ name, value }) => `${name}: ${value}`);

      expect(wrong).toEqual([]);
    });
  });

  describe("모든 색을 sRGB 화면에 그대로 그릴 수 있어요", () => {
    it("모든 토큰이 sRGB 로 표현 가능해요", () => {
      // 색역을 벗어나면 브라우저가 제멋대로 보정해서 기기마다 다른 색이 나와요.
      // 목표 채도를 올리거나 램프를 넓히면 양 끝 토큰부터 여기에 걸려요.
      const outOfGamut = parsed
        .filter(({ color }) => !isInSrgb(color))
        .map(({ name, value }) => `${name}: ${value}`);

      expect(outOfGamut).toEqual([]);
    });
  });

  // 한 계열 안에서 단계가 어떻게 이어지는지 봐요.
  describe("스케일이 단계 규칙을 지켜요", () => {
    it("모든 계열이 같은 단계 집합을 가져요", () => {
      const stepSets = scales.map(([family, scale]) => ({
        family,
        steps: Object.keys(scale).sort().join(","),
      }));
      const distinct = [...new Set(stepSets.map(({ steps }) => steps))];

      expect(distinct).toHaveLength(1);
    });

    it("단계 숫자가 커질수록 어두워져요", () => {
      const broken: string[] = [];

      for (const [family, scale] of scales) {
        const ordered = Object.keys(scale)
          .map(Number)
          .sort((a, b) => a - b);

        for (let i = 1; i < ordered.length; i++) {
          const previous = parseOklch(scale[ordered[i - 1]]);
          const current = parseOklch(scale[ordered[i]]);
          if (!previous || !current) continue;

          if (current.lightness >= previous.lightness) {
            broken.push(
              `${family}: ${ordered[i]}(${current.lightness * 100}%) 가 ` +
                `${ordered[i - 1]}(${previous.lightness * 100}%) 보다 어둡지 않아요`
            );
          }
        }
      }

      expect(broken).toEqual([]);
    });
  });

  describe("토큰 계열끼리 명도(L) 기준을 맞춰요", () => {
    it("코어 계열 명도(L) 정렬 검사에 blue·red·grey 가 포함되는지 확인해요", () => {
      // 셋 중 하나를 코어에서 빼는 건 설계 변경이라 의식적인 결정이어야 해요.
      expect(coreFamilies).toEqual(
        expect.arrayContaining(["blue", "red", "grey"])
      );
    });

    it("코어 계열은 같은 단계에서 명도(L)가 같아요", () => {
      // 이 디자인 시스템의 핵심 계약이에요. 명도가 어긋나면 blue500 과 grey500 의
      // 시각적 무게가 달라지고, semantic 토큰을 계열 사이에서 바꿔 끼울 수 없어요.
      const mismatched: string[] = [];

      const byFamily = Object.fromEntries(scales);
      const steps = Object.keys(byFamily[coreFamilies[0]]);

      for (const step of steps) {
        const lightnesses = coreFamilies.map((family) => ({
          family,
          lightness: parseOklch(byFamily[family][step])?.lightness,
        }));
        const distinct = [...new Set(lightnesses.map((it) => it.lightness))];

        if (distinct.length > 1) {
          mismatched.push(
            `${step}: ${lightnesses
              .map(
                ({ family, lightness }) =>
                  `${family}=${(lightness ?? 0) * 100}%`
              )
              .join(", ")}`
          );
        }
      }

      expect(mismatched).toEqual([]);
    });

    it("모든 계열의 명도(L)가 선언된 램프와 일치해요", () => {
      // 램프가 둘 이상이면 생성기가 계열에 엉뚱한 램프를 물릴 수 있어요.
      // 눈으로는 "그럴듯한 회색"으로 보여서 놓치기 쉬운 종류의 버그예요.
      const mismatched: string[] = [];

      for (const [family, scale] of scales) {
        const baseFamily = family.replace(
          alphaSuffix,
          ""
        ) as keyof typeof FAMILIES;
        const ramp: Record<string, number> = RAMPS[FAMILIES[baseFamily].ramp];

        for (const [step, value] of Object.entries(scale)) {
          const color = parseOklch(value);
          if (!color) continue;

          // 백분율을 0~1 로 나눴다 되돌리는 과정에서 부동소수점 오차가 생겨요.
          const lightness = Number((color.lightness * 100).toFixed(6));

          if (lightness !== ramp[step]) {
            mismatched.push(
              `${family}[${step}]: ${lightness}% (램프 선언값 ${ramp[step]}%)`
            );
          }
        }
      }

      expect(mismatched).toEqual([]);
    });
  });

  describe("알파 계열이 원본을 그대로 따라가요", () => {
    it("모든 기본 계열이 짝이 되는 알파 계열을 가져요", () => {
      const names = scales.map(([family]) => family);
      const bases = names.filter((name) => !alphaSuffix.test(name));
      const orphans = bases.filter(
        (base) => !names.some((name) => name.startsWith(`${base}Alpha`))
      );

      expect(orphans).toEqual([]);
    });

    it("알파 계열은 원본과 명도·채도·색조가 같고 투명도만 달라요", () => {
      // 채도가 색역에 걸려 깎일 때 기본 계열에만 적용되고 알파 계열에 빠지면
      // 두 색이 미묘하게 어긋나요. 눈으로는 못 잡는 종류의 버그예요.
      const mismatched: string[] = [];

      for (const [family, scale] of scales) {
        const matched = alphaSuffix.exec(family);
        if (!matched) continue;

        const baseFamily = family.replace(alphaSuffix, "");
        const baseScale = Object.fromEntries(scales)[baseFamily];
        const expectedAlpha = Number(matched[1]) / 100;

        for (const [step, value] of Object.entries(scale)) {
          const alpha = parseOklch(value);
          const base = parseOklch(baseScale[step]);
          if (!alpha || !base) continue;

          if (
            alpha.lightness !== base.lightness ||
            alpha.chroma !== base.chroma ||
            alpha.hue !== base.hue
          ) {
            mismatched.push(
              `${family}[${step}] 가 ${baseFamily}[${step}] 와 달라요`
            );
          }

          if (alpha.alpha !== expectedAlpha) {
            mismatched.push(
              `${family}[${step}] 의 투명도가 ${expectedAlpha} 가 아니라 ${alpha.alpha} 예요`
            );
          }
        }
      }

      expect(mismatched).toEqual([]);
    });
  });
});
