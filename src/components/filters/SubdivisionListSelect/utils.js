import i18n from 'i18n-js';

export const addNullSubdivisions = subdivisions => {
  return [
    {
      id: '0',
      name: i18n.t('subdivision.nullSubdivision'),
    },
    ...subdivisions,
  ];
};

export function getListFromTree(list, prefix = '') {
  return list.reduce((acc, item) => {
    acc.push({
      ...item,
      name: `${prefix}${prefix ? ' ' : ''}${item.name}`,
    });

    if (item.children && item.children.length) {
      const childrenList = getListFromTree(item.children, `${prefix}-`);

      acc = acc.concat(childrenList);
    }

    return acc;
  }, []);
}
