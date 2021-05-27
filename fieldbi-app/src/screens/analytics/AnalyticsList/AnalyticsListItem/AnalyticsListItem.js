import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import screens from '../../../../navigation/screens';
import AppTouchableFeedback from '../../../../components/AppTouchableFeedback';

const AnalyticsListItem = props => {
  const { name, screen } = props;
  const navigation = useNavigation();

  return (
    <AppTouchableFeedback
      style={styles.item}
      onPress={() => {
        navigation.navigate({
          name: screens.AnalyticsSubdivisions,
          params: {
            screen
          }
        });
      }}
    >
      <Text style={styles.text}>{name}</Text>
    </AppTouchableFeedback>
  );
};

AnalyticsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#FCFDFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E8F0FE',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  text: {
    textAlign: 'center'
  }
});

export default AnalyticsListItem;
