import { darkTheme, lightTheme } from '@/styles';
import { Theme, TThemeMode } from '@/types';
import { createContext, ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type TThemeContext = {
  theme: Theme;
  themeMode: TThemeMode;
  setThemeMode: (mode: TThemeMode) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

export const ThemeContext = createContext<undefined | TThemeContext>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: TThemeMode;
}

export const ThemeProvider = ({
  children,
  initialMode = 'auto',
}: ThemeProviderProps) => {
  const systemColorSchema = useColorScheme();
  const [themeMode, setThemeMode] = useState(initialMode);

  const getCurrentTheme = (): Theme => {
    if (themeMode === 'auto') {
      return systemColorSchema === 'dark' ? darkTheme : lightTheme;
    }

    return themeMode === 'dark' ? darkTheme : lightTheme;
  };

  const theme = getCurrentTheme();

  const isDarkTheme = theme === darkTheme;
  const statusBarStyle = isDarkTheme ? 'light' : 'dark';

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'auto') {
        return systemColorSchema === 'dark' ? 'light' : 'dark';
      }

      return prev === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        toggleTheme,
        isDarkTheme,
      }}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </ThemeContext.Provider>
  );
};
