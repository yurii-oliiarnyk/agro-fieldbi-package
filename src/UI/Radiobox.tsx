import React from 'react';
import { StyleSheet, View, Text, GestureResponderEvent, ViewStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TouchableFeedback } from './TouchableFeedback';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});

type RadioboxTypes = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  active: string;
  value: string;
  style: ViewStyle;
};

export const Radiobox: React.FC<RadioboxTypes> = props => {
  const { label, onPress, active, value, style } = props;

  return (
    <TouchableFeedback onPress={onPress} style={style}>
      <View style={styles.button}>
        <RadioButton.Android
          color={COLORS.MAIN}
          value={value}
          onPress={onPress}
          status={active === value ? 'checked' : 'unchecked'}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableFeedback>
  );
};
