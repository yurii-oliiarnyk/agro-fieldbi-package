import { transformStaticSubdivision } from '../../../helpers/subdivisions';

export const addStaticSubdivisions = entities => {
  const withStatics = [
    {
      name: 'root'
    },
    ...entities,
    {
      id: 0,
      name: 'null_subdivision'
    }
  ];

  return transformStaticSubdivision(withStatics);
};

const removeSubdivionIDs = (ids, options) => {
  const { selectedSubdivisions, updateFieldValue } = options;
  let updatedSubdivisions = [...selectedSubdivisions];

  ids.forEach(id => {
    updatedSubdivisions = updatedSubdivisions.filter(subId => id !== subId);
  });

  updateFieldValue(updatedSubdivisions);
};

const addSubdivionIDs = (ids, options) => {
  const { selectedSubdivisions, updateFieldValue } = options;
  const updatedSubdivisions = [...selectedSubdivisions];

  ids.forEach(id => {
    if (!selectedSubdivisions.includes(id)) {
      updatedSubdivisions.push(id);
    }
  });

  updateFieldValue(updatedSubdivisions);
};

const updateByNonGroupedMode = (id, options) => {
  const { selectedSubdivisions } = options;

  if (selectedSubdivisions.includes(id)) {
    removeSubdivionIDs([id], options);
  } else {
    addSubdivionIDs([id], options);
  }
};

const findCurrentBranch = (subdivisions, id) => {
  return subdivisions.find(current => {
    let hasSearchEntity = false;

    if (current.children) {
      hasSearchEntity = findCurrentBranch(current.children, id);
    }

    return hasSearchEntity || current.id === id;
  });
};

const findCurrentEntity = (subdivisions, id) => {
  let entity = null;

  subdivisions.forEach(current => {
    if (entity) {
      return;
    }

    if (current.id === id) {
      entity = current;
      return;
    }

    if (current.children) {
      const currentEntity = findCurrentEntity(current.children, id);
      if (currentEntity) {
        entity = currentEntity;
        return;
      }
    }
  });

  return entity;
};

const getChildIds = children => {
  if (!children) {
    return [];
  }

  if (!children.length) {
    return [];
  }

  return children.reduce((acc, current) => {
    const { id, children } = current;

    const ids = getChildIds(children);

    acc.push(id, ...ids);

    return acc;
  }, []);
};

const isParentForChild = (children, childId) => {
  if (!children || !children.length) {
    return false;
  }

  return children.some(current => {
    return current.id === childId || isParentForChild(current.children, childId);
  });
};

const getParentIds = (children, id) => {
  if (!children || !children.length) {
    return [];
  }

  return children.reduce((acc, current) => {
    const ids = getParentIds(current.children, id);
    const isParent = isParentForChild(current.children, id);

    if (isParent) {
      acc.push(current.id);
    }

    if (ids.length > 0) {
      acc.push(...ids);
    }

    return acc;
  }, []);
};

const updateByGroupedMode = (id, options) => {
  const { subdivisions, selectedSubdivisions } = options;

  const currentBranch = findCurrentBranch(subdivisions, id);
  const currentEntity = findCurrentEntity(subdivisions, id);

  if (selectedSubdivisions.includes(id)) {
    const childIds = getChildIds(currentEntity.children);
    const parentIds = getParentIds([currentBranch], id);

    removeSubdivionIDs([...childIds, ...parentIds, id], options);
  } else {
    const childIds = getChildIds(currentEntity.children);

    addSubdivionIDs([...childIds, id], options);
  }
};

export const onItemPressHandler = (id, options) => {
  const { groupMode } = options;

  if (!groupMode) {
    updateByNonGroupedMode(id, options);
  } else {
    updateByGroupedMode(id, options);
  }
};
