import React from 'react';
import { useFormikContext } from 'formik';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableFeedback } from '../../UI/TouchableFeedback';
import { COLORS } from '../../colors';

export const MonitoringCenterFilterList = props => {
  const { dataSource } = props;

  const fieldName = 'contractState';

  const {
    values: { [fieldName]: value },
    setFieldValue,
  } = useFormikContext();

  const onPressHandler = id => {
    if (value === id) {
      setFieldValue(fieldName, null);
    } else {
      setFieldValue(fieldName, id);
    }
  };

  return dataSource.map(item => (
    <TouchableFeedback
      onPress={() => onPressHandler(item.id)}
      style={[styles.item, value === item.id && styles.itemActive]}
      key={item.id}
    >
      <View style={styles.label}>
        <View style={[styles.bgBox, { backgroundColor: item.backgroundColor }]} />
        <Text>{item.name}</Text>
      </View>
      <Icon
        name="md-checkmark"
        color={COLORS.MAIN}
        size={25}
        style={[styles.icon, { opacity: value === item.id ? 1 : 0 }]}
      />
    </TouchableFeedback>
  ));
};

const styles = StyleSheet.create({
  item: {
    minHeight: 40,
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemActive: {
    backgroundColor: '#ECEBF2',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  bgBox: {
    width: 16,
    height: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    marginRight: 8,
  },
  icon: {
    marginLeft: 24,
  },
});
