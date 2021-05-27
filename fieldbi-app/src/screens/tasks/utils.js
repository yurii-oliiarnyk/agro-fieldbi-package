const multiSelectProps = ['statuses', 'author', 'responsible', 'observers', 'tags'];

const isNullable = value => {
  return typeof value === 'undefined' || value == null;
};

export const transformFilterFields = values => {
  const updatedValues = { ...values };

  multiSelectProps.forEach(prop => {
    const value = values[prop];

    if (!isNullable(value)) {
      updatedValues[prop] = [values[prop]];
    }
  });

  return updatedValues;
};

export const parseFilterFields = values => {
  const updatedValues = { ...values };

  multiSelectProps.forEach(prop => {
    const value = values[prop];

    if (!isNullable(value) && value.length > 0) {
      updatedValues[prop] = value[0];
    }
  });

  return updatedValues;
};
