import PropTypes from 'prop-types';
import { applyThousandSeparator, getSuffix } from './utils';

const OutputNumber = props => {
  const { value, type, decimalScale, fixedDecimalScale } = props;

  const numberValue = Number(value);

  let fixedValue = !Number.isNaN(numberValue) ? numberValue : 0;
  fixedValue = fixedValue.toFixed(decimalScale);
  if (!fixedDecimalScale) {
    fixedValue = Number(fixedValue);
  }

  fixedValue = applyThousandSeparator(fixedValue, ' ');

  const suffix = getSuffix(type);

  return `${fixedValue}${suffix}`;
};

OutputNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['price', 'area', 'percentage']),
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool
};

OutputNumber.defaultProps = {
  decimalScale: 2,
  fixedDecimalScale: false
};

export default OutputNumber;
