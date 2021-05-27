import { OrderedMap } from 'immutable';

export default function arrayToOrderedMap(array, DataRecord) {
  return array.reduce((acc, item) => {
    return acc.set(item.id, new DataRecord(item));
  }, new OrderedMap({}));
}
