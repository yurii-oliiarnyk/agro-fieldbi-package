import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';
import LandShowMap from '../LandShowMap';
import ResourceBinding from '../../../components/resource/ResourcesShow/ResourceBinding';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const LandShowPurpose = props => {
  const { entitie } = props;
  const { bindingInformation, contourArea } = entitie;

  return (
    <>
      <LandShowMap entitie={entitie} showFields />
      <ResourceTable
        data={[
          {
            name: i18n.t('subdivision.singleName'),
            value: entitie.subdivision && entitie.shortSubdivisionData.name,
            key: 'subdivision'
          },
          {
            name: i18n.t('agronomistConclusion.singleName'),
            value: entitie.agronomistConclusion && entitie.agronomistConclusionShortData.name,
            key: 'agronomist_сonclusion'
          },
          {
            name: i18n.t('soilType.singleName'),
            value: entitie.soilType && entitie.soilTypeShortData.name,
            key: 'soil_type'
          }
        ]}
      />
      <ResourceBinding
        totalArea={contourArea || 0}
        bindingInformation={bindingInformation}
        intersectionResourceName="fields"
        labels={{
          area: 'binding.land.area',
          totalBindArea: 'binding.land.totalBindArea',
          totalNotBindArea: 'binding.land.totalNotBindArea',
          fallbackMessage: 'binding.land.noIntersection'
        }}
      />
    </>
  );
};

LandShowPurpose.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(LandShowPurpose);
