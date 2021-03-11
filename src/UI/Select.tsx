import React from 'react';
import i18n from 'i18n-js';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from './TextInput';

export type ValueType = string | number;
export type OptionType = {
  id: ValueType;
  name: string;
};

export type SelectTypes = {
  value?: ValueType;
  options: OptionType[];
  placeholder: string;
  onValueChange: (value: ValueType) => void;
  emptyLabel?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  transformedOptionsHandler?: (options: OptionType[]) => OptionType[];
};

export const Select: React.FC<SelectTypes> = props => {
  const {
    loading = false,
    placeholder,
    value,
    onValueChange,
    options,
    disabled = false,
    emptyLabel = i18n.t('ui.noData'),
    transformedOptionsHandler = options => options,
  } = props;

  const transformedOptions = transformedOptionsHandler(options);

  const renderIcon = () =>
    loading ? (
      <ActivityIndicator color="#606060" />
    ) : (
      <Icon name="chevron-down" size={24} color="#606060" />
    );

  const getValue = () => {
    if (value === null) {
      return;
    }

    const valueItem = transformedOptions.find(option => option.id === value);

    if (!valueItem) {
      return;
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
        label: placeholder,
      }}
      value={value}
      onValueChange={onValueChange}
      items={transformedOptions.map(option => ({
        label: option.name,
        value: option.id,
      }))}
    >
      <TextInput Icon={renderIcon()} placeholder={getPlaceholder()} value={getValue()} />
    </RNPickerSelect>
  );
};
