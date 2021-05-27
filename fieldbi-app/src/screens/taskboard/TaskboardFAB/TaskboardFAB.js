import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { FAB, Badge } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants';
import screens from '../../../navigation/screens';

const TaskboardFAB = props => {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const { filterParams } = props;

  const fieldName = 'subdivisions';
  const isObjectEmpty = object => !object[fieldName] || object[fieldName].length === 0;

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom > 16 ? insets.bottom : 16 }]}>
      {!isObjectEmpty(filterParams) && (
        <View pointerEvents="none" style={styles.badgeItem}>
          <Badge>1</Badge>
        </View>
      )}
      <View style={styles.fabItem}>
        <FAB
          style={styles.fab}
          icon="filter-variant"
          onPress={() => {
            navigation.navigate({
              name: screens.TaskboardFilter,
              params: filterParams
            });
          }}
          color="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    padding: 16,
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

TaskboardFAB.propTypes = {
  filterParams: PropTypes.object
};

export default TaskboardFAB;
