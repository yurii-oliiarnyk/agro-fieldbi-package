import { OrderedMap } from 'immutable';

export function arrayToMap(array, DataRecord) {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item));
  }, new OrderedMap({}));
}
