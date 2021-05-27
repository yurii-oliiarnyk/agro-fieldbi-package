import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import AppTouchableFeedback from '../../AppTouchableFeedback';
import { COLORS } from '../../../constants';

const AppRadioButton = props => {
  const { label, onPress, active, value, style } = props;

  const iconWrapStyles = [styles.iconWrap];
  const iconStyles = [];

  if (active) {
    iconWrapStyles.push(styles.iconWrapActive);
    iconStyles.push(styles.icon);
  }

  return (
    <AppTouchableFeedback onPress={onPress} style={style}>
      <View style={styles.button}>
        <RadioButton.Android
          color={COLORS.MAIN}
          value={value}
          onPress={onPress}
          status={active === value ? 'checked' : 'unchecked'}
        />
        <Text style={{ fontSize: 16 }}>{label}</Text>
      </View>
    </AppTouchableFeedback>
  );
};

AppRadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]).isRequired,
  active: PropTypes.string,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default AppRadioButton;
