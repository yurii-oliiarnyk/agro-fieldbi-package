import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const TaskFields = props => {
  const { fields } = props;

  return (
    <View style={styles.body}>
      {fields.map(item => (
        <View style={[styles.item, item.style]} key={item.key}>
          <View style={styles.itemName}>
            <Text style={styles.itemNameText}>{`${item.title}:`}</Text>
          </View>
          <View>{item.content}</View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: -8,
    marginLeft: -8,
    marginRight: -8
  },
  item: {
    width: '50%',
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  itemName: {
    marginBottom: 6
  },
  itemNameText: {
    fontSize: 12,
    color: '#909090'
  }
});

TaskFields.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      content: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired,
      style: PropTypes.object
    })
  ).isRequired
};

export default TaskFields;
