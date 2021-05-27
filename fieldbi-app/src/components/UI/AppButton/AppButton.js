import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import AppTouchableFeedback from '../../AppTouchableFeedback';
import { COLORS } from '../../../constants';

const AppButton = props => {
  const { children, onPress, disabled, style, full, type } = props;

  const buttonStyle = [styles.button];
  const textStyles = [styles.text];

  switch (type) {
    case 'outlined': {
      buttonStyle.push(styles.outlined);
      textStyles.push(styles.outlinedText);
      break;
    }

    case 'default':
    default: {
      buttonStyle.push(styles.default);
      textStyles.push(styles.defaultText);
      break;
    }
  }

  if (full) {
    buttonStyle.push(styles.full);
  }

  if (disabled) {
    buttonStyle.push(styles.disabled);
  }

  if (style) {
    buttonStyle.push(style);
  }

  return (
    <AppTouchableFeedback onPress={onPress} disabled={disabled} style={buttonStyle}>
      <Text style={textStyles}>{children}</Text>
    </AppTouchableFeedback>
  );
};

AppButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.oneOf(['default', 'outlined'])
};

AppButton.defaultProps = {
  onPress: () => {},
  type: 'default'
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.MAIN,
    borderWidth: 1,
    borderColor: COLORS.MAIN,
    borderStyle: 'solid',
    elevation: 1
  },
  defaultText: {
    color: '#fff'
  },
  outlined: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.GREY,
    borderStyle: 'solid'
  },
  outlinedText: {
    borderColor: COLORS.GREY
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120
  },
  full: {
    borderRadius: 0
  },
  disabled: {
    opacity: 0.6
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    textAlign: 'center'
  }
});

export default AppButton;
