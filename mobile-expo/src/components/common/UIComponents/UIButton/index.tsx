import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { EnumUIButtonVariants } from './types';
import { getUIButtonStyles, getUIButtonTextColor } from './utils';
import { useTheme } from '@/hooks';
import { UIText } from '../UIText';
import { TTextColor } from '@/types';
import { spacing } from '@/styles';

interface UIButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  onPress: () => void;
  variant?: EnumUIButtonVariants;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const UIButton = ({
  title,
  onPress,
  variant = EnumUIButtonVariants.PRIMARY,
  isLoading = false,
  isDisabled = false,
  ...props
}: UIButtonProps) => {
  const { theme } = useTheme();

  const indicatorColor = getUIButtonTextColor(variant, theme);
  const textColor: TTextColor =
    variant === EnumUIButtonVariants.PRIMARY ? 'primary' : 'secondary';
  const buttonStyles = getUIButtonStyles(variant, theme);

  const buttonContent = () => {
    return isLoading ? (
      <ActivityIndicator color={indicatorColor} />
    ) : (
      <UIText text={title} color={textColor} />
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, styles.disabled, buttonStyles]}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      activeOpacity={0.7}
      {...props}
    >
      {buttonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});
