import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import DateTimeModalPicker from 'react-native-modal-datetime-picker';
import AppTextInput from '../AppTextInput';
import { DATE_FORMAT } from '../../../config';
import { VARIABLES } from '../../../constants';

const AppDatePicker = props => {
  const { placeholder, value, onValueChange, ...pickerProps } = props;

  const [show, setShow] = useState(false);

  const onChangeHandler = date => {
    setShow(false);
    onValueChange(date);
  };

  const onCancelHandler = () => {
    setShow(false);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={1} onPress={() => setShow(true)}>
        <View>
          <AppTextInput
            placeholder={placeholder}
            value={value ? moment(value).format(DATE_FORMAT) : null}
            editable={false}
            autoCorrect={false}
            Icon={<Icon name="calendar-blank-outline" {...VARIABLES.inputIcon} />}
          />
          <Text style={StyleSheet.absoluteFill} />
        </View>
      </TouchableOpacity>

      <DateTimeModalPicker
        isVisible={show}
        date={value || new Date()}
        is24Hour
        onConfirm={onChangeHandler}
        onCancel={onCancelHandler}
        {...pickerProps}
      />
    </View>
  );
};

AppDatePicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onValueChange: PropTypes.func
};

AppDatePicker.defaultProps = {
  placeholder: 'Оберіть дату',
  onValueChange: () => {}
};

export default AppDatePicker;
