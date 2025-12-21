import { ErrorBoundary } from './src/components';
import { AppNavigator } from './src/navigation';
import { AppProvider } from './src/providers';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </ErrorBoundary>
  );
}
