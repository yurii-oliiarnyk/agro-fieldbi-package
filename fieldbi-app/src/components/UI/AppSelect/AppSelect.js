import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import AppTextInput from '../AppTextInput';
import { VARIABLES } from '../../../constants';

const AppSelect = props => {
  const {
    loading,
    placeholder,
    value,
    onValueChange,
    options,
    disabled,
    emptyLabel,
    transformedOptionsHandler
  } = props;

  const transformedOptions = transformedOptionsHandler(options);

  const renderIcon = () =>
    loading ? (
      <ActivityIndicator color="#606060" />
    ) : (
      <Icon name="chevron-down" {...VARIABLES.inputIcon} />
    );

  const getValue = () => {
    if (value === null) {
      return null;
    }

    const valueItem = transformedOptions.find(option => option.id === value);

    if (!valueItem) {
      return null;
    }

    return valueItem.name;
  };

  const getPlaceholder = () => {
    if (loading) {
      return i18n.t('ui.loading');
    }

    const isOptionsEmpty = !(transformedOptions && transformedOptions.length > 0);

    if (isOptionsEmpty) {
      return emptyLabel;
    }

    return placeholder;
  };

  return (
    <RNPickerSelect
      disabled={disabled}
      placeholder={{
        value: null,
        color: '#CECECE',
        label: placeholder
      }}
      value={value}
      onValueChange={onValueChange}
      items={transformedOptions.map(option => ({
        label: option.name,
        value: option.id
      }))}
    >
      <AppTextInput Icon={renderIcon()} placeholder={getPlaceholder()} value={getValue()} />
    </RNPickerSelect>
  );
};

AppSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  placeholder: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  emptyLabel: PropTypes.string,
  loadingLabel: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  transformedOptionsHandler: PropTypes.func
};

AppSelect.defaultProps = {
  loading: false,
  disabled: false,
  value: null,
  transformedOptionsHandler: options => options,
  emptyLabel: i18n.t('ui.noData'),
  loadingLabel: i18n.t('ui.loading')
};

export default AppSelect;
