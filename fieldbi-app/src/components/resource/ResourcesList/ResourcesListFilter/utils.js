export const removeEmptyFilterValues = values => {
  const resultValues = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value === '' || value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length > 0) {
        resultValues[key] = value;
      }

      return;
    }

    if (typeof value === 'object') {
      if (value.to && value.to !== '') {
        if (typeof resultValues[key] === 'object') {
          resultValues[key].to = value.to;
        } else {
          resultValues[key] = { to: value.to };
        }
      }

      if (value.from && value.from !== '') {
        if (typeof resultValues[key] === 'object') {
          resultValues[key].from = value.from;
        } else {
          resultValues[key] = { from: value.from };
        }
      }

      return;
    }

    resultValues[key] = value;
  });

  return resultValues;
};
