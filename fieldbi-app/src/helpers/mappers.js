/**
 * @param {array} data
 * @returns {object}
 * @example [[{a: '1'}], [{b: '2'}]] => { a: '1', b: '2' }
 */
export const getObjectFromArrayOfObject = data => {
  const objectData = {};

  data.forEach(item => {
    Object.entries(item).forEach(nestedItem => {
      const [key, value] = nestedItem;

      objectData[key] = value;
    });
  });

  return objectData;
};
