import { OrderedMap } from 'immutable';

export const arrayToOrderedMap = (array: any[], DataRecord) => {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item));
  }, new OrderedMap({}));
};
