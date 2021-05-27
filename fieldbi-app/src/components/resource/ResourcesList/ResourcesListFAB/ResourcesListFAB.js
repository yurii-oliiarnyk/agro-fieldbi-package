import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { FAB, Badge } from 'react-native-paper';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../constants';
import screens from '../../../../navigation/screens';

const ResourcesListFAB = props => {
  const { name, filterBy, onFilterPress } = props;
  const navigation = useNavigation();

  const filterByObj = JSON.parse(filterBy);

  const countFilteredValues = Object.entries(filterByObj).length;

  return (
    <View style={styles.wrap}>
      {countFilteredValues > 0 ? (
        <View pointerEvents="none" style={styles.badgeItem}>
          <Badge>{countFilteredValues}</Badge>
        </View>
      ) : null}
      <View style={styles.fabItem}>
        <FAB
          style={styles.fab}
          icon="filter-variant"
          onPress={() => {
            if (typeof onFilterPress === 'function') {
              onFilterPress();
            } else {
              navigation.navigate({
                name: screens.LandBankFilter,
                params: {
                  resourceName: name
                }
              });
            }
          }}
          color="#fff"
        />
      </View>
    </View>
  );
};

ResourcesListFAB.propTypes = {
  name: PropTypes.string.isRequired,
  filterBy: PropTypes.string.isRequired,
  onFilterPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  fabItem: {
    zIndex: 1
  },
  fab: {
    backgroundColor: COLORS.MAIN
  },
  badgeItem: {
    position: 'absolute',
    right: 0,
    zIndex: 2
  }
});

export default connect((state, { name }) => {
  return {
    filterBy: state[name].filterBy
  };
})(ResourcesListFAB);
