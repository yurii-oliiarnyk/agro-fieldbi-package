import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import UserAvatar from '../../../user/UserAvatar';

const CommentItemLayout = props => {
  const { children, user } = props;

  return (
    <View style={styles.layout}>
      <View style={styles.aside}>
        <UserAvatar user={user} size="small" />
      </View>
      <View style={styles.body}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row'
  },
  aside: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: 24,
    marginRight: 8
  },
  body: {
    flex: 1
  }
});

CommentItemLayout.propTypes = {
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired
};

export default CommentItemLayout;
