import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const FormItem = props => {
  const { children, label, type } = props;

  const isChildrenArray = Array.isArray(children);

  const itemStyles = [styles.item];
  const labelStyles = [styles.label];

  if (type === 'vertical') {
    itemStyles.push(styles.itemHorizont);
    labelStyles.push(styles.labelHorizont);
  }

  const childrenContent = isChildrenArray ? (
    <View style={styles.row}>
      {children.map((single, i) => (
        <View style={styles.column} key={i}>
          {single}
        </View>
      ))}
    </View>
  ) : (
    children
  );

  return (
    <View style={itemStyles}>
      <Text style={labelStyles}>
        {label}
        {':'}
      </Text>
      {childrenContent}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 16
  },
  itemHorizont: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  labelHorizont: {
    marginBottom: 0
  },
  row: {
    marginHorizontal: -2,
    flexDirection: 'row'
  },
  column: {
    paddingHorizontal: 2,
    flex: 1
  }
});

FormItem.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

export default FormItem;
