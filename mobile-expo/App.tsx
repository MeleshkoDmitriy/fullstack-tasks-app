// import { StatusBar } from 'expo-status-bar';

import { AppNavigator } from './src/navigation';
import { TanstackProvider } from './src/providers';

export default function App() {
  return (
    <TanstackProvider>
      <AppNavigator />
    </TanstackProvider>
  );
}
