import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import LandShowMap from '../LandShowMap';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';
import OutputNumber from '../../../components/UI/OutputNumber';

const LandInfo = props => {
  const { land } = props;

  const data = [
    {
      name: i18n.t('generals.idFullName'),
      value: land.id,
      key: 'id'
    },
    {
      name: i18n.t('land.withoutCadastralNumber'),
      value: land.isCadastralNumberNotExists ? i18n.t('generals.yes') : i18n.t('generals.no'),
      key: 'isCadastralNumberNotExists'
    },
    {
      name: land.isCadastralNumberNotExists
        ? i18n.t('land.registrationNumber')
        : i18n.t('land.cadastralNumber'),
      value: land.landNumber,
      key: 'landNumber'
    },
    {
      name: i18n.t('land.isInDemand'),
      value: land.isInDemand ? i18n.t('generals.yes') : i18n.t('generals.no'),
      key: 'isInDemand'
    },
    {
      name: i18n.t('land.cadastralArea'),
      value: land.cadastralArea && (
        <OutputNumber value={land.cadastralArea} decimalScale={4} type="area" fixedDecimalScale />
      ),
      key: 'cadastralArea'
    },
    {
      name: i18n.t('land.contourArea'),
      value: land.contourArea ? (
        <OutputNumber value={land.contourArea} type="area" decimalScale={4} fixedDecimalScale />
      ) : (
        i18n.t('generals.noDataSymbol')
      ),
      key: 'contourArea'
    },
    {
      name: i18n.t('land.ngo1995'),
      value: land.ngo1995 && <OutputNumber value={land.ngo1995} type="price" decimalScale={2} />,
      key: 'ngo1995'
    },
    {
      name: i18n.t('land.ngoCurrent'),
      value: land.ngoCurrent && (
        <OutputNumber value={land.ngoCurrent} type="price" decimalScale={2} />
      ),
      key: 'ngoCurrent'
    },
    {
      name: i18n.t('landType.singleName'),
      value: land.landType && land.landTypeShortData.name,
      key: 'land_type'
    },
    {
      name: i18n.t('landPurpose.singleName'),
      value: land.landPurpose && land.landPurposeShortData.name,
      key: 'land_purpose'
    },
    {
      name: i18n.t('locations.region'),
      value: land.region && land.regionShortData.name,
      key: 'region'
    },
    {
      name: i18n.t('locations.district'),
      value: land.district && land.districtShortData.name,
      key: 'district'
    },
    {
      name: i18n.t('locations.villageCouncil'),
      value: land.villageCouncil && land.villageCouncilShortData.name,
      key: 'village_council'
    },
    {
      name: i18n.t('locations.locality'),
      value: land.locality && land.localityShortData.name,
      key: 'locality'
    }
  ];

  return (
    <>
      <LandShowMap entitie={land} />
      <ResourceTable data={data} />
    </>
  );
};

LandInfo.propTypes = {
  land: PropTypes.object.isRequired
};

export default LandInfo;
