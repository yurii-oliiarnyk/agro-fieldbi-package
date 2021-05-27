import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { transformRgbaToHex } from './utils';

const AppBottomTabIcon = props => {
  const { Icon, color } = props;

  const hexColor = transformRgbaToHex(color);

  return (
    <View style={styles.wrap}>
      {React.cloneElement(Icon, {
        color: hexColor
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 24,
    height: 24
  }
});

AppBottomTabIcon.propTypes = {
  Icon: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired
};

export default AppBottomTabIcon;
