import { TDarkTheme } from '@/styles/theme/dark';
import { TLightTheme } from '@/styles/theme/light';

export type TThemeMode = 'auto' | 'light' | 'dark';

export type TTheme = TLightTheme | TDarkTheme;
