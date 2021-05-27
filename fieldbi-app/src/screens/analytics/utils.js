export const transformToList = entities => {
  const listEntities = [];

  entities.forEach(entitie => {
    const { children, statistics, ...rest } = entitie;

    listEntities.push({
      ...rest,
      ...statistics
    });

    if (children && children.length > 0) {
      const childrenList = transformToList(children);
      listEntities.push(...childrenList);
    }
  });

  return listEntities;
};

export const getDynamicRows = (entities, fieldKey, valueKey, linkConfig, renderLink) => {
  const entitie = entities[0];

  if (!entitie) {
    return [];
  }

  const rows = entitie[fieldKey];

  return Object.values(rows).map(row => ({
    name: row.name,
    dataIndex: row.id,
    key: row.id,
    hideEmpty: true,
    render: (value, record) => {
      const numberValue = value[valueKey];
      let linkedValue;

      if (linkConfig && typeof renderLink === 'function') {
        linkConfig.valueKey = valueKey;

        linkedValue = renderLink(value, record.filterParams, linkConfig);
      }

      return [numberValue, linkedValue];
    }
  }));
};

export const parseAnalytics = (entities, statsObjKey, counterKey) =>
  entities.map(entitie => {
    const { id } = entitie;
    const count = entitie[counterKey];

    const filterParams = {};
    if (id !== -1) {
      filterParams.subdivisions = [id];
    }

    let newEntitie = {
      ...entitie,
      filterParams
    };

    if (counterKey) {
      newEntitie = {
        ...newEntitie,
        [counterKey]: count
      };
    }

    if (statsObjKey) {
      const statsObj = entitie[statsObjKey];

      newEntitie = {
        ...newEntitie,
        ...statsObj
      };
    }

    return newEntitie;
  });
