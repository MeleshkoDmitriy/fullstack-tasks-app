import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { UIText } from '../UIText';
import { spacing } from '@/styles';

interface UIInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
}

export const UIInput = ({ label, ...props }: UIInputProps) => {
  return (
    <View style={styles.container}>
      {label && <UIText text={label} />}
      <TextInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
});
