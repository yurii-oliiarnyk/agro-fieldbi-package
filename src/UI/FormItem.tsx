import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
  },
  itemHorizont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  labelHorizont: {
    marginBottom: 0,
  },
  row: {
    marginHorizontal: -2,
    flexDirection: 'row',
  },
  column: {
    paddingHorizontal: 2,
    flex: 1,
  },
});

export type FormItemTypes = {
  children: ReactNode;
  label?: string;
};

export const FormItem: React.FC<FormItemTypes> = props => {
  const { children, label } = props;

  return (
    <View style={styles.item}>
      {label && (
        <Text style={styles.label}>
          {label}
          {':'}
        </Text>
      )}
      {children}
    </View>
  );
};
