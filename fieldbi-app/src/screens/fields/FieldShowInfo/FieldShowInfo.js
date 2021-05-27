import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';
import OutputNumber from '../../../components/UI/OutputNumber';
import FieldShowMap from '../FieldShowMap';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const FieldShowInfo = props => {
  const { entitie } = props;

  const data = [
    {
      name: i18n.t('generals.idFullName'),
      value: entitie.id,
      key: 'id'
    },
    {
      name: i18n.t('field.name'),
      value: entitie.name,
      key: 'single_name'
    },
    {
      name: i18n.t('subdivision.singleName'),
      value: entitie.subdivision && entitie.shortSubdivisionData.name,
      key: 'subdivision'
    },
    {
      name: i18n.t('field.tillableArea'),
      value: entitie.tillableArea && <OutputNumber value={entitie.tillableArea} type="area" />,
      key: 'tillable_area'
    },
    {
      name: i18n.t('field.irrigated'),
      value: entitie.irrigated ? i18n.t('generals.yes') : i18n.t('generals.no'),
      key: 'irrigated'
    },
    {
      name: i18n.t('locations.region'),
      value: entitie.region && entitie.regionShortData.name,
      key: 'region'
    },
    {
      name: i18n.t('locations.district'),
      value: entitie.district && entitie.districtShortData.name,
      key: 'district'
    },
    {
      name: i18n.t('locations.villageCouncil'),
      value: entitie.villageCouncil && entitie.villageCouncilShortData.name,
      key: 'village_council'
    },
    {
      name: i18n.t('field.additionalInfo'),
      value: entitie.additionalInfo ? entitie.additionalInfo : i18n.t('generals.noDataSymbol'),
      key: 'additional_info'
    },
    {
      name: i18n.t('generals.description'),
      key: 'Description',
      value: entitie.description,
      html: true
    }
  ];

  return (
    <>
      <FieldShowMap entitie={entitie} />
      <ResourceTable data={data} />
    </>
  );
};

FieldShowInfo.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(FieldShowInfo);
