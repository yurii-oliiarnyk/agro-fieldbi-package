import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
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

type CheckboxTypes = {
  label: string;
  onChange: (active: boolean) => void;
  active?: boolean;
};

export const Checkbox: React.FC<CheckboxTypes> = props => {
  const { label, onChange, active = false } = props;

  return (
    <TouchableFeedback onPress={() => onChange(!active)} style={styles.button}>
      <View>
        <PaperCheckbox.Android
          color={COLORS.MAIN}
          onPress={() => onChange(!active)}
          status={active ? 'checked' : 'unchecked'}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableFeedback>
  );
};
