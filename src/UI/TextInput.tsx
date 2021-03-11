import React, { ReactNode } from 'react';
import {
  TextInput as NativeTextInput,
  StyleSheet,
  View,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../colors';

export type TextInputTypes = {
  Icon: ReactNode;
} & TextInputProps;

export const TextInput: React.FC<TextInputTypes> = props => {
  const { Icon } = props;

  const inputStyles: ViewStyle[] = [styles.input];

  if (Icon) {
    inputStyles.push(styles.inputWithIcon);
  }

  return (
    <View>
      <NativeTextInput
        style={inputStyles}
        placeholderTextColor="#CECECE"
        autoCapitalize="none"
        {...props}
      />
      {Icon && (
        <View style={styles.iconContainer} pointerEvents="none">
          {Icon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    borderRadius: 4,
    color: COLORS.BLACK,
    backgroundColor: '#fff',
  },
  inputWithIcon: {
    paddingRight: 30,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    right: 10,
  },
});
