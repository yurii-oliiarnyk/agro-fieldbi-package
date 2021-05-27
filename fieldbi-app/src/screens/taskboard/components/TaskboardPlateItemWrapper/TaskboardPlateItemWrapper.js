import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AppTouchableFeedback from '../../../../components/AppTouchableFeedback';
import { filterResource } from '../../../../store/resource/resource';
import screens from '../../../../navigation/screens';

const TaskboardPlateItemWrapper = props => {
  const { style, linkable, linkParams, children } = props;

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const Wrapper = linkable ? AppTouchableFeedback : View;

  const onPressHandler = () => {
    if (linkable && linkParams) {
      const { screen, filterBy, resource } = linkParams;

      dispatch(filterResource(resource)(JSON.stringify(filterBy)));

      navigate(screens.LandBank, {
        screen: screens.LandBankList,
        params: {
          screen
        }
      });
    }
  };

  return (
    <Wrapper style={style} onPress={onPressHandler}>
      {children}
    </Wrapper>
  );
};

TaskboardPlateItemWrapper.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  linkable: PropTypes.bool,
  linkParams: PropTypes.object,
  children: PropTypes.any.isRequired
};

export default TaskboardPlateItemWrapper;
