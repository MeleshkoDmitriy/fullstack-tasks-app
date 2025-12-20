import { Theme } from '@/types';
import { EnumUIButtonVariants } from './types';
import { ViewStyle } from 'react-native';

export const getUIButtonTextColor = (
  variant: EnumUIButtonVariants,
  theme: Theme
): string => {
  switch (variant) {
    case EnumUIButtonVariants.PRIMARY:
      return theme.colors.text.primary;
    case EnumUIButtonVariants.SECONDARY:
      return theme.colors.text.secondary;
    case EnumUIButtonVariants.OUTLINE:
      return theme.colors.text.secondary;
    default:
      return theme.colors.text.primary;
  }
};

export const getUIButtonStyles = (
  variant: EnumUIButtonVariants,
  theme: Theme
): ViewStyle => {
  switch (variant) {
    case EnumUIButtonVariants.PRIMARY:
      return { backgroundColor: theme.colors.base.primaryDark };
    case EnumUIButtonVariants.SECONDARY:
      return { backgroundColor: theme.colors.base.primary };
    case EnumUIButtonVariants.OUTLINE:
      return { backgroundColor: theme.colors.base.primaryLight };
    default:
      return { backgroundColor: theme.colors.base.primaryDark };
  }
};
