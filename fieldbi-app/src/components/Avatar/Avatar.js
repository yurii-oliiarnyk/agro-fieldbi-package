import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import defaultStyles from './styles';

const Avatar = props => {
  const { style } = props;

  return (
    <View style={[defaultStyles.avatarView, style]}>
      <Image
        source={require('../../assets/images/default_user.png')}
        style={defaultStyles.avatar}
      />
    </View>
  );
};

Avatar.propTypes = {
  style: PropTypes.object
};

export default Avatar;
