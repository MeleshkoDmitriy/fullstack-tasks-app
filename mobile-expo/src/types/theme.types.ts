export type TThemeMode = 'auto' | 'light' | 'dark';

export type TThemeColors = {
  base: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  priority: {
    low: string;
    medium: string;
    high: string;
  };
  status: {
    todo: string;
    inProgress: string;
    done: string;
  };
  background: {
    background: string;
    overlay: string;
    backdrop: string;
  };
};

export type Theme = {
  colors: TThemeColors;
}

export type TTextColor = keyof TThemeColors['text'];
export type TStatusColor = keyof TThemeColors['status'];
export type TPriorityColor = keyof TThemeColors['priority'];
