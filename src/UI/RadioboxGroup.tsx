import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Radiobox } from './Radiobox';

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: -4,
    marginHorizontal: -8,
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  wrapperVertical: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export type RadioboxGroupTypes = {
  values: Array<{
    key: string;
    label: string;
    value?: string;
  }>;
  active?: string;
  type?: 'vertical' | 'horizontal';
  onChange: (value: string) => void;
};

export const RadioboxGroup: React.FC<RadioboxGroupTypes> = props => {
  const { values, active, type = 'horizontal', onChange } = props;

  const wrapperStyles: ViewStyle[] = [styles.wrapper];

  console.log(type);

  if (type === 'vertical') {
    wrapperStyles.push(styles.wrapperVertical);
  }

  return (
    <View style={[styles.wrapper]}>
      {values.map(item => (
        <Radiobox
          style={styles.item}
          key={item.key}
          label={item.label}
          onPress={() => onChange(item.value)}
          active={active}
          value={item.value}
        />
      ))}
    </View>
  );
};
