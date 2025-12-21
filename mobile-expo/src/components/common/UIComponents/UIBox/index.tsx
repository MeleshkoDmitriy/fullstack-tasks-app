import { useTheme } from '@/hooks';
import { spacing } from '@/styles';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

interface UIBoxProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const UIBox = ({ children, style}: UIBoxProps) => {
  const { theme } = useTheme();

  const boxStyles = {
    backgroundColor: theme.colors.base.primaryLight,
  };

  return <View style={[styles.container, boxStyles, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: spacing.md,
  },
});
