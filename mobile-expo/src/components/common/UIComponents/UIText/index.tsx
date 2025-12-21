import { useTheme } from '@/hooks';
import { TFontSize, TFontWeight, typography } from '@/styles';
import { TTextColor } from '@/types';
import { StyleSheet, Text, TextProps } from 'react-native';

interface UITextProps extends Omit<TextProps, 'style' | 'children'> {
  text: string
  size?: TFontSize;
  weight?: TFontWeight;
  color?: TTextColor;
}

export const UIText = ({
  text,
  size = 'md',
  weight = 'regular',
  color = 'primary',
  ...props
}: UITextProps) => {
  const { theme } = useTheme();

  const textStyles = [
    styles.text,
    {
      fontSize: typography.fontSize[size],
      fontWeight: typography.fontWeight[weight],
      color: theme.colors.text[color],
    },
  ];

  return (
    <Text style={textStyles} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
  },
});
