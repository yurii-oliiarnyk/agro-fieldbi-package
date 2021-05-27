import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { getRandomColor, getInitials, getAvatarSize } from './utils';

const UserAvatar = props => {
  const { user, size } = props;
  const { name } = user;

  const color = getRandomColor(name);
  const initials = getInitials(name);
  const calcSize = getAvatarSize(size);
  const fontSize = calcSize / 2;

  return (
    <View style={{ ...styles.view, backgroundColor: color, width: calcSize, height: calcSize }}>
      <Text style={[styles.text, { fontSize }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 24,
    flexBasis: 24
  },
  text: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#fff'
  }
});

UserAvatar.defaultProps = {
  size: 'medium'
};

UserAvatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['small', 'medium', 'large'])])
};

export default UserAvatar;
