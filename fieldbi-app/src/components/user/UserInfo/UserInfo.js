import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import UserAvatar from '../UserAvatar';

const UserInfo = props => {
  const { user } = props;
  const { name } = user;

  return (
    <View style={styles.view}>
      <UserAvatar user={user} size="small" />
      <View style={{ marginLeft: 5, flex: 1 }}>
        <Text numberOfLines={1}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default UserInfo;
