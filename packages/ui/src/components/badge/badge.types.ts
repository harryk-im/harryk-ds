import type { RecipeVariants } from "@vanilla-extract/recipes";
import type {
  badgeColors,
  badgeSizes,
  badgeStyle,
  badgeVariants,
} from "./badge.css";

/**
 * Badge 컴포넌트의 모든 스타일 옵션을 포함하는 타입이에요.
 * recipe에서 자동으로 추론돼요.
 */
export type BadgeToken = RecipeVariants<typeof badgeStyle>;

/**
 * 뱃지의 색상을 지정해요.
 * - `primary`: 주요 정보에 사용하는 파란색이에요.
 * - `secondary`: 보조 정보에 사용하는 회색이에요.
 */
export type BadgeColors = keyof typeof badgeColors;

/**
 * 뱃지의 크기를 지정해요.
 * - `sm`: 작은 크기예요.
 * - `md`: 기본 크기예요.
 * - `lg`: 큰 크기예요.
 */
export type BadgeSizes = keyof typeof badgeSizes;

/**
 * 뱃지의 스타일을 지정해요.
 * - `fill`: 배경색이 채워진 스타일이에요.
 * - `outline`: 테두리만 있는 스타일이에요.
 * - `weak`: 배경색이 반투명한 스타일이에요.
 */
export type BadgeVariants = keyof typeof badgeVariants;
