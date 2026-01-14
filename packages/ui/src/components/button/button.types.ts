import type { RecipeVariants } from "@vanilla-extract/recipes";
import type {
  buttonColors,
  buttonSizes,
  buttonStyle,
  buttonVariants,
} from "./button.css";

export type ButtonToken = RecipeVariants<typeof buttonStyle>;
export type ButtonColors = keyof typeof buttonColors;
export type ButtonSizes = keyof typeof buttonSizes;
export type ButtonVariants = keyof typeof buttonVariants;
