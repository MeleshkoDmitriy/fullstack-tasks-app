import { TDarkTheme } from "@/styles/theme/dark";
import { TLightTheme } from "@/styles/theme/light";

export const enum EnumThemeMode {
  light = 'light',
  dark = 'dark',
  auto = 'auto',
}

export type TTheme = TLightTheme | TDarkTheme;
