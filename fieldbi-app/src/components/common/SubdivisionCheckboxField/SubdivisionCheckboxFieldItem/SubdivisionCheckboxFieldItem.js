import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppTouchableFeedback from '../../../AppTouchableFeedback';
import { COLORS } from '../../../../constants';

const SubdivisionCheckboxFieldItem = props => {
  const { name, onPress, selected, hasBackground } = props;

  return (
    <AppTouchableFeedback
      onPress={onPress}
      style={[styles.item, hasBackground && styles.background]}
    >
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      {selected && <Icon name="md-checkmark" color={COLORS.MAIN} size={25} style={styles.icon} />}
    </AppTouchableFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  background: {
    backgroundColor: '#ECEBF2'
  },
  name: {
    flexShrink: 1
  },
  icon: {
    marginLeft: 24
  }
});

SubdivisionCheckboxFieldItem.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  hasBackground: PropTypes.bool
};

export default SubdivisionCheckboxFieldItem;
