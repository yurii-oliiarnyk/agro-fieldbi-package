import React from 'react';
import SubdivisionCheckboxFieldItem from '../SubdivisionCheckboxFieldItem';

const SubdivisionCheckboxFieldList = props => {
  const { subdivisions, onItemPress, isSelected } = props;

  const renderList = (subdivisions, deepLevel = 0) => {
    if (!subdivisions.length) {
      return null;
    }

    return subdivisions.map(subdivision => {
      const { id, name, children = [] } = subdivision;

      const hasBackground = deepLevel === 0;

      return (
        <React.Fragment key={id}>
          <SubdivisionCheckboxFieldItem
            name={name}
            selected={isSelected(id)}
            hasBackground={hasBackground}
            onPress={() => onItemPress(id)}
          />
          {renderList(children, deepLevel + 1)}
        </React.Fragment>
      );
    });
  };

  return renderList(subdivisions);
};

export default SubdivisionCheckboxFieldList;
