import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

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

type FormItemTypes = {
  children: ReactNode;
  label: string;
  type?: 'vertical' | 'horizontal';
};

export const FormItem: React.FC<FormItemTypes> = props => {
  const { children, label, type = 'horizontal' } = props;

  const isChildrenArray = Array.isArray(children);

  const itemStyles: ViewStyle[] = [styles.item];
  const labelStyles: TextStyle[] = [styles.label];

  if (type === 'vertical') {
    itemStyles.push(styles.itemHorizont);
    labelStyles.push(styles.labelHorizont);
  }

  return (
    <View style={itemStyles}>
      <Text style={labelStyles}>
        {label}
        {':'}
      </Text>
      {children && isChildrenArray ? (
        <View style={styles.row}>
          {children.map((child, i) => (
            <View style={styles.column} key={i}>
              {child}
            </View>
          ))}
        </View>
      ) : (
        children
      )}
    </View>
  );
};
