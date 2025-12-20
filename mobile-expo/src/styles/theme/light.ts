export const lightTheme = {
  colors: {
    primary: '#6200EE',
    primaryDark: '#3700B3',
    primaryLight: '#BB86FC',
    background: '#FFFFFF',
    text: '#000000',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    
    priorityLow: '#4CAF50',
    priorityMedium: '#FF9800',
    priorityHigh: '#F44336',
    
    statusTodo: '#9E9E9E',
    statusInProgress: '#2196F3',
    statusDone: '#4CAF50',
    
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.32)',
  },
} as const;

export type TLightTheme = typeof lightTheme;