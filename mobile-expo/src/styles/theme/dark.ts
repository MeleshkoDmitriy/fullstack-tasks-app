export const darkTheme = {
  colors: {
    primary: '#BB86FC',
    primaryDark: '#3700B3',
    primaryLight: '#6200EE',
    background: '#121212',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    
    priorityLow: '#66BB6A',
    priorityMedium: '#FFA726',
    priorityHigh: '#EF5350',
    
    statusTodo: '#757575',
    statusInProgress: '#42A5F5',
    statusDone: '#66BB6A',
    
    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

export type TDarkTheme = typeof darkTheme;