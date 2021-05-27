import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OutputNumber from '../../../../components/UI/OutputNumber';
import { filterResource } from '../../../../store/resource/resource';
import screens from '../../../../navigation/screens';

const AnalyticLink = props => {
  const { value, resource, screen, filterParams } = props;
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  if (value === 0) {
    return (
      <Text>
        <OutputNumber value={value} decimalScale={0} />
      </Text>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          const filterBy = JSON.stringify(filterParams);
          dispatch(filterResource(resource)(filterBy));

          navigate(screens.LandBank, {
            screen: screens.LandBankList,
            params: {
              screen
            }
          });
        }}
      >
        <Text>
          <OutputNumber value={value} decimalScale={0} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

AnalyticLink.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  resource: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired,
  filterParams: PropTypes.object.isRequired
};

export default AnalyticLink;
