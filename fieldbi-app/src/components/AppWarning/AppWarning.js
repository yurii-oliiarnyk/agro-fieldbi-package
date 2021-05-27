import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';

const AppWarning = props => {
  const { title, vertical, large } = props;

  const viewStyles = [styles.view];
  const textStyles = [styles.text];
  const iconStyles = [];
  let iconSize = 25;

  if (vertical) {
    viewStyles.push(styles.viewVertical);
    textStyles.push(styles.textVertical);
  } else {
    iconStyles.push(styles.iconHorizontal);
  }

  if (large) {
    iconSize = 30;
    textStyles.push(styles.textLarge);
  }

  return (
    <View style={viewStyles}>
      <Icon name="ios-warning" color="#ff9900" size={iconSize} style={iconStyles} />
      <Text style={textStyles}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  viewVertical: {
    flexDirection: 'column'
  },
  text: {
    color: COLORS.GREY,
    fontSize: 15
  },
  textLarge: {
    fontSize: 18
  },
  textVertical: {
    textAlign: 'center'
  },
  iconHorizontal: {
    marginRight: 15
  }
});

AppWarning.propTypes = {
  title: PropTypes.string.isRequired,
  vertical: PropTypes.bool,
  large: PropTypes.bool
};

export default AppWarning;
