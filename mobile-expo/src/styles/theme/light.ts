import { Theme } from "@/types";

export const lightTheme: Theme = {
  colors: {
    base: {
      primary: '#6200EE',
      primaryDark: '#3700B3',
      primaryLight: '#ae74ff',
    },
    text: {
      primary: '#000000',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    priority: {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
    },
    status: {
      todo: '#9E9E9E',
      inProgress: '#2196F3',
      done: '#4CAF50',
    },
    background: {
      background: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
      backdrop: 'rgba(0, 0, 0, 0.32)',
    },
  },
} as const;
