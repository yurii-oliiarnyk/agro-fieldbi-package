import React from 'react';
import i18n from 'i18n-js';
import { View, Text, StyleSheet } from 'react-native';

const TagsList = props => {
  const { tags } = props;

  if (!tags.length) {
    return (
      <View>
        <Text>{i18n.t('generals.noDataSymbol')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {tags.map(tag => (
        <View key={tag.id} style={styles.item}>
          <Text style={styles.itemText}>{tag.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -2
  },
  item: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    padding: 4,
    borderRadius: 4,
    margin: 2
  },
  itemText: {
    fontSize: 12
  }
});

export default TagsList;
