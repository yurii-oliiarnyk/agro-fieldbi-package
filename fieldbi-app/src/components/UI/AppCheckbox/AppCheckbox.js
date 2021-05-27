import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import AppTouchableFeedback from '../../AppTouchableFeedback';
import { COLORS } from '../../../constants';

const AppCheckbox = props => {
  const { label, onChange, active } = props;

  const iconWrapStyles = [styles.iconWrap];
  const iconStyles = [];

  if (active) {
    iconWrapStyles.push(styles.iconWrapActive);
    iconStyles.push(styles.icon);
  }

  return (
    <AppTouchableFeedback onPress={() => onChange(!active)} style={styles.button}>
      <View style={styles.iconWrap}>
        <Checkbox.Android
          color={COLORS.MAIN}
          onPress={() => onChange(!active)}
          status={active ? 'checked' : 'unchecked'}
        />
      </View>
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </AppTouchableFeedback>
  );
};

AppCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  active: PropTypes.bool
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default AppCheckbox;
