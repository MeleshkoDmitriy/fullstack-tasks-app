import { Theme } from "@/types";

export const darkTheme: Theme = {
  colors: {
    base: {
      primary: '#BB86FC',
      primaryDark: '#9845fe',
      primaryLight: '#e1ccfc',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    priority: {
      low: '#66BB6A',
      medium: '#FFA726',
      high: '#EF5350',
    },
    status: {
      todo: '#757575',
      inProgress: '#42A5F5',
      done: '#66BB6A',
    },
    background: {
      background: '#121212',
      overlay: 'rgba(0, 0, 0, 0.7)',
      backdrop: 'rgba(0, 0, 0, 0.5)',
    },
  },
} as const;
