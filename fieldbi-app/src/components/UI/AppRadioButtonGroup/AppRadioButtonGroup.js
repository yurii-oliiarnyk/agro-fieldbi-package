import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import AppRadioButton from '../AppRadioButton';

const AppRadioButtonGroup = props => {
  const { values, active, type, onChangeHandler } = props;

  const wrapperStyles = [styles.wrapper];

  if (type === 'vertical') {
    wrapperStyles.push(styles.wrapperVertical);
  }

  return (
    <View style={wrapperStyles}>
      {values.map(item => (
        <AppRadioButton
          style={styles.item}
          key={item.key}
          label={item.label}
          onPress={() => onChangeHandler(item.value)}
          active={active}
          value={item.value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: -4,
    marginHorizontal: -8
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  wrapperVertical: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

AppRadioButtonGroup.propTypes = {
  values: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  type: PropTypes.string
};

export default AppRadioButtonGroup;
