import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View, Text, StyleSheet } from 'react-native';
import OutputNumber from '../../../../components/UI/OutputNumber';
import UserAvatar from '../../../../components/user/UserAvatar';

const TaskboardPlateUser = props => {
  const { user, value, last } = props;

  const { name } = user;

  return (
    <View style={[styles.wrapper, last && styles.last]}>
      <View>
        <UserAvatar size="large" user={user} />
      </View>
      <View style={{ marginLeft: 12 }}>
        <View>
          <Text style={{ fontSize: 16 }}>{name}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>
            <Text style={{ fontSize: 24 }}>
              <OutputNumber value={value} decimalScale={0} />
            </Text>
            {` ${i18n.t('taskboard.users.actions', { count: value % 10 })}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8
  },
  last: {
    marginBottom: 0
  }
});

TaskboardPlateUser.propTypes = {
  user: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  last: PropTypes.bool
};

export default TaskboardPlateUser;
