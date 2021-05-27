import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../../constants';

const styles = {
  spaceBetweenIcon: 8
};

const AppLink = props => {
  const { children, onPress, loading, Icon, type, fontSize = 16 } = props;

  const color = type === 'primary' ? COLORS.MAIN : COLORS.GREY;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={color}
          style={{ marginRight: styles.spaceBetweenIcon }}
        />
      )}
      {!loading &&
        Icon &&
        React.cloneElement(Icon, {
          color,
          style: {
            fontSize,
            marginRight: styles.spaceBetweenIcon
          }
        })}
      <Text style={{ fontSize, color }}>{children}</Text>
    </TouchableOpacity>
  );
};

AppLink.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  fontSize: PropTypes.number,
  loading: PropTypes.bool,
  Icon: PropTypes.node,
  type: PropTypes.oneOf(['primary', 'default'])
};

AppLink.Group = props => {
  const { children, style } = props;

  return (
    <View style={style}>
      <View
        style={{
          marginVertical: -6,
          marginHorizontal: -12,
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {React.Children.map(children, (child, index) => {
          return (
            <View key={index} style={{ marginVertical: 6, marginHorizontal: 12 }}>
              {child}
            </View>
          );
        })}
      </View>
    </View>
  );
};

AppLink.Group.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  style: PropTypes.object
};

export default AppLink;
