import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import UserAvatar from '../UserAvatar';
import UserInfo from '../UserInfo';

const UserIcons = props => {
  const { users } = props;

  if (users.length === 1) {
    return <UserInfo user={users[0]} />;
  }

  return (
    <View style={styles.view}>
      {users.map(user => (
        <View key={user.id} style={styles.item}>
          <UserAvatar user={user} size="small" />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4
  },
  item: {
    borderWidth: 4,
    borderColor: '#F5F5F5',
    borderStyle: 'solid',
    borderRadius: 100,
    marginRight: -12
  }
});

UserIcons.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UserIcons;
