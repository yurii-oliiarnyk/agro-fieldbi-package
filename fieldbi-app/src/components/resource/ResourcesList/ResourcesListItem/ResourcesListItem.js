import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const ResourcesListItem = props => {
  const { MainComponent, RightComponent, LeftComponent } = props;

  return (
    <View style={styles.item}>
      <View style={styles.main}>
        {LeftComponent && <View style={styles.left}>{LeftComponent}</View>}
        <View style={{ flexShrink: 1 }}>{MainComponent}</View>
      </View>
      {RightComponent && <View style={styles.right}>{RightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    maxWidth: '100%'
  },
  main: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    marginLeft: 16
  },
  left: {
    marginRight: 16
  }
});

ResourcesListItem.propTypes = {
  MainComponent: PropTypes.element.isRequired,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element
};

export default ResourcesListItem;
