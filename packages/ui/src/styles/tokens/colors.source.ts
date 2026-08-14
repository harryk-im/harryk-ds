/**
 * 컬러 토큰의 단일 원천(SSOT)이에요.
 *
 * 컬러와 관련해서 손으로 편집하는 파일은 여기 하나뿐이에요.
 * 수정한 뒤 `pnpm build:colors` 를 실행하면 아래 두 파일이 함께 다시 생성돼요.
 *
 *   - `packages/ui/src/styles/tokens/colors.ts` (컴포넌트가 import 하는 토큰)
 *   - `tokens.json` (Figma / Token Studio 용 W3C DTCG 포맷)
 *
 * ## 설계 원칙
 *
 * 1. **명도(L)는 램프가 결정해요.** 색상 계열마다 달라지지 않아요.
 *    같은 step 이면 계열이 달라도 같은 명도, 따라서 같은 명암비를 가져요.
 *
 * 2. **채도(C)는 목표값일 뿐이에요.** sRGB 로 표현할 수 없는 자리에서는 자동으로 깎여요.
 *    양보하는 쪽이 채도인 이유는, 명도가 어긋나면 같은 step 끼리 시각적 무게가 달라져서
 *    스케일 자체가 의미를 잃기 때문이에요. 채도가 조금 낮아지는 건 눈치채기 어렵지만
 *    명도가 어긋나는 건 바로 보여요.
 *
 * 3. **색조(H)는 계열의 정체성이에요.** 램프 안에서 절대 변하지 않아요.
 *    무채색 계열에도 브랜드 컬러의 색조를 아주 옅게 넣어서 전체 톤을 묶어요.
 */

/**
 * 명도 램프예요. 값은 OKLCH 의 L 을 퍼센트로 적어요.
 * 숫자가 클수록 어두워요. (900 = 가장 어두움, 100 = 가장 밝음)
 */
export const RAMPS = {
  blue: {
    900: 25,
    800: 31.25,
    700: 37.5,
    600: 43.75,
    500: 50,
    400: 56.25,
    300: 62.5,
    200: 68.75,
    100: 75,
  },
  red: {
    900: 32.1,
    800: 37.8,
    700: 43.5,
    600: 49.2,
    500: 54.9,
    400: 60.6,
    300: 66.3,
    200: 72,
    100: 77.7,
  },
  grey: {
    900: 21,
    800: 27.38,
    700: 33.75,
    600: 40.13,
    500: 46.5,
    400: 52.88,
    300: 59.25,
    200: 65.63,
    100: 72,
  },
  lightGrey: {
    900: 71,
    800: 72.88,
    700: 74.75,
    600: 76.63,
    500: 78.5,
    400: 80.38,
    300: 82.25,
    200: 84.13,
    100: 86,
  },
} as const;

export type RampName = keyof typeof RAMPS;

/**
 * 색상 계열이에요.
 *
 * - `hue`    : OKLCH 의 H. 램프 전체에서 고정돼요.
 * - `chroma` : 목표 채도. sRGB 를 벗어나는 자리에서는 빌드 시점에 자동으로 깎여요.
 * - `ramp`   : 이 계열이 사용할 명도 램프.
 */
export const FAMILIES = {
  blue: { hue: 263.18, chroma: 0.125, ramp: "blue" },
  red: { hue: 25, chroma: 0.13, ramp: "red" },
  grey: { hue: 263.18, chroma: 0.01, ramp: "grey" },
  lightGrey: { hue: 263.18, chroma: 0.01, ramp: "lightGrey" },
} as const satisfies Record<
  string,
  { hue: number; chroma: number; ramp: RampName }
>;

export type FamilyName = keyof typeof FAMILIES;

/**
 * 채도 안전 마진이에요.
 *
 * sRGB 경계에 값을 딱 붙이면 반올림이나 브라우저 구현 차이 하나로 색조가 틀어져요.
 * 각 명도에서 가능한 최대 채도의 이 비율까지만 사용해요.
 */
export const CHROMA_SAFETY = 1;

/**
 * 투명도 변형이에요. 퍼센트 단위로 적어요.
 * `15` 는 `blueAlpha15` 같은 토큰 이름과 `/ 0.15` 알파값으로 전개돼요.
 *
 * 참고: 임의의 투명도가 필요하면 토큰을 늘리지 말고
 * `withOpacity(COLORS.blue[500], 0.4)` 를 쓰세요.
 */
export const ALPHA_VARIANTS = [15] as const;

/** 램프에 속하지 않는 단독 색상이에요. */
export const STANDALONE = {
  black: { lightness: 14, chroma: 0, hue: 263.18 },
  white: { lightness: 100, chroma: 0, hue: 263.18 },
} as const;
