import React from 'react';
import { Text } from 'react-native';
import { applyThousandSeparator, getSuffix } from './utils';

type OutputNumberTypes = {
  value: string | number;
  type: 'price' | 'area' | 'percentage';
  decimalScale?: number;
  fixedDecimalScale?: boolean;
};

export const OutputNumber = (props: OutputNumberTypes): JSX.Element => {
  const { value, type, decimalScale = 2, fixedDecimalScale } = props;

  const numberValue = Number(value);

  let fixedValue: string | number = !Number.isNaN(numberValue) ? numberValue : 0;
  fixedValue = fixedValue.toFixed(decimalScale);
  if (!fixedDecimalScale) {
    fixedValue = Number(fixedValue);
  }

  fixedValue = applyThousandSeparator(fixedValue, ' ');

  const suffix = getSuffix(type);

  return <Text>{`${fixedValue}${suffix}`}</Text>;
};
