import i18n from 'i18n-js';

export const transformStaticSubdivision = entities =>
  entities.map(entitie => {
    const { name } = entitie;

    if (name === 'root') {
      return {
        ...entitie,
        id: -1,
        name: i18n.t('subdivision.rootSubdivision')
      };
    }

    if (name === 'null_subdivision') {
      return {
        ...entitie,
        name: i18n.t('subdivision.nullSubdivision')
      };
    }

    return entitie;
  });
