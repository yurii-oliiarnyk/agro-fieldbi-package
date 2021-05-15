import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, StyleSheet } from 'react-native';
import { TouchableFeedback, COLORS } from 'agro-package';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  text: {
    color: COLORS.GREY,
    fontSize: 16,
  },
});

export const ImagePickerAdd = props => {
  const { onPress } = props;

  return (
    <TouchableFeedback onPress={onPress} style={styles.wrapper}>
      <Icon name="camera" color={COLORS.MAIN} style={styles.icon} />
      <Text style={styles.text}>Зробити фото</Text>
    </TouchableFeedback>
  );
};
