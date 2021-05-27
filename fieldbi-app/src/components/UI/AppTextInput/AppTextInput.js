import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';

const AppTextInput = props => {
  const { Icon } = props;

  return (
    <View>
      <TextInput
        style={[styles.input, Icon && styles.inputWithIcon, { backgroundColor: '#fff' }]}
        placeholderTextColor="#CECECE"
        autoCapitalize="none"
        {...props}
      />
      {Icon && (
        <View style={styles.iconContainer} pointerEvents="none">
          {Icon}
        </View>
      )}
    </View>
  );
};

AppTextInput.propTypes = {
  keyboardType: PropTypes.string,
  Icon: PropTypes.node
};

AppTextInput.defaultProps = {
  keyboardType: 'default'
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D9D9D9',
    borderRadius: 4,
    color: COLORS.BLACK
  },
  inputWithIcon: {
    paddingRight: 30
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
    right: 10
  }
});

export default AppTextInput;
