import React from 'react';
import PropTypes from 'prop-types';
import ResourceBinding from '../../../components/resource/ResourcesShow/ResourceBinding';
import FieldShowMap from '../FieldShowMap';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const FieldShowLands = props => {
  const { entitie } = props;
  const { bindingInformation, tillableArea } = entitie;

  return (
    <>
      <FieldShowMap entitie={entitie} showLands />
      <ResourceBinding
        totalArea={tillableArea || 0}
        bindingInformation={bindingInformation}
        nameOneLine
        intersectionResourceName="lands"
        labels={{
          area: 'binding.field.area',
          totalBindArea: 'binding.field.totalBindArea',
          totalNotBindArea: 'binding.field.totalNotBindArea',
          fallbackMessage: 'binding.field.noIntersection'
        }}
      />
    </>
  );
};

FieldShowLands.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(FieldShowLands);
