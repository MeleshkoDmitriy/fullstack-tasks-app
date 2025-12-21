import { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TanstackProvider } from './TanstackProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
