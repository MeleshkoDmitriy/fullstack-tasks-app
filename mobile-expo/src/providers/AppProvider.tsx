import { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TanstackProvider } from './TanstackProvider';
import { ThemeProvider } from './ThemeProvider';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style='auto' />
        <TanstackProvider>{children}</TanstackProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
