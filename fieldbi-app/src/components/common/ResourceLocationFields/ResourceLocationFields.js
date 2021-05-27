import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';
import FormItem from '../../UI/FormItem';
import AppSelect from '../../UI/AppSelect';
import axios from '../../../axios/axios';

const FilterLocationFields = props => {
  const { locations } = props;

  const [regions, setRegions] = useState([]);
  const [regionsLoading, setRegionsLoading] = useState(false);
  const [region, setRegion] = useState(undefined);

  const [districts, setDistricts] = useState([]);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [district, setDistrict] = useState(undefined);

  const [villageCouncils, setVillageCouncils] = useState([]);
  const [villageCouncilsLoading, setVillageCouncilsLoading] = useState(false);
  const [villageCouncil, setVillageCouncil] = useState(undefined);

  const [localities, setLocalitys] = useState([]);
  const [localitiesLoading, setLocalitysLoading] = useState(false);
  const [locality, setLocality] = useState(undefined);

  const {
    setFieldValue,
    values: { location }
  } = useFormikContext();

  const fetchLocations = (id, type) => {
    let apiUrl;
    switch (type) {
      case 'regions':
        setRegionsLoading(true);
        apiUrl = '/api/v1/dictionary/locations/regions';
        break;
      case 'districts':
        setDistrictsLoading(true);
        apiUrl = `/api/v1/dictionary/locations/regions/${id}/districts`;
        break;
      case 'villageCouncils':
        setVillageCouncilsLoading(true);
        apiUrl = `/api/v1/dictionary/locations/districts/${id}/villageCouncils`;
        break;
      case 'localities':
        setLocalitysLoading(true);
        apiUrl = `/api/v1/dictionary/locations/villageCouncils/${id}/localities`;
        break;
      default:
    }

    axios
      .get(apiUrl)
      .then(responce => {
        switch (type) {
          case 'regions':
            setRegionsLoading(false);
            setRegions(responce.data.data);
            break;
          case 'districts':
            setDistrictsLoading(false);
            setDistricts(responce.data.data);
            break;
          case 'villageCouncils':
            setVillageCouncilsLoading(false);
            setVillageCouncils(responce.data.data);
            break;
          case 'localities':
            setLocalitysLoading(false);
            setLocalitys(responce.data.data);
            break;
          default:
        }
      })
      .catch(() => {
        switch (type) {
          case 'regions':
            setRegionsLoading(false);
            break;
          case 'districts':
            setDistrictsLoading(false);
            break;
          case 'villageCouncils':
            setVillageCouncilsLoading(false);
            break;
          case 'localities':
            setLocalitysLoading(false);
            break;
          default:
        }
      });
  };

  const handleChangeRegion = id => {
    setFieldValue('location', id);

    setRegion(id);

    setDistrict(undefined);
    setVillageCouncil(undefined);
    setLocality(undefined);

    setDistricts([]);
    setVillageCouncils([]);
    setLocalitys([]);

    if (locations.includes('district')) {
      fetchLocations(id, 'districts');
    }
  };

  const handleChangeDistrict = id => {
    setFieldValue('location', id);

    setDistrict(id);

    setVillageCouncil(undefined);
    setLocality(undefined);

    setVillageCouncils([]);
    setLocalitys([]);

    if (locations.includes('villageCouncil')) {
      fetchLocations(id, 'villageCouncils');
    }
  };

  const handleChangeSelectVillageCouncil = id => {
    setFieldValue('location', id);

    setVillageCouncil(id);
    setLocality(undefined);

    setLocalitys([]);

    if (locations.includes('locality')) {
      fetchLocations(id, 'localities');
    }
  };

  const handleChangeSelectLocality = id => {
    setFieldValue('location', id);

    setLocality(id);
  };

  useEffect(() => {
    fetchLocations(null, 'regions');

    if (location) {
      setRegionsLoading(true);
      setDistrictsLoading(true);
      setVillageCouncilsLoading(true);
      setLocalitysLoading(true);

      axios.get(`/api/v1/dictionary/locations/${location}`).then(response => {
        const location = response.data.data;

        const { region, district, villageCouncil, id } = location;

        if (region) {
          setRegion(region);
          fetchLocations(region, 'districts');
        }

        if (district) {
          setDistrict(district);

          if (locations.includes('villageCouncil')) {
            fetchLocations(district, 'villageCouncils');
          }
        }

        if (villageCouncil) {
          setVillageCouncil(villageCouncil);

          if (locations.includes('locality')) {
            fetchLocations(villageCouncil, 'localities');
          }
        }

        if (region && district && villageCouncil) {
          setLocality(id);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!location) {
      setRegion(undefined);
      setDistrict(undefined);
      setVillageCouncil(undefined);
      setLocality(undefined);

      setDistricts([]);
      setVillageCouncils([]);
      setLocalitys([]);
    }
  }, [location]);

  return (
    <>
      {locations.includes('region') && (
        <FormItem name="region" label={i18n.t('locationFields.region')}>
          <AppSelect
            name="region"
            placeholder={i18n.t('locationFields.choseRegion')}
            onValueChange={handleChangeRegion}
            loading={regionsLoading}
            value={region}
            options={regions}
          />
        </FormItem>
      )}

      {locations.includes('district') && (
        <FormItem name="district" label={i18n.t('locationFields.district')}>
          <AppSelect
            name="district"
            placeholder={i18n.t('locationFields.choseDistrict')}
            emptyLabel={i18n.t('locationFields.choseRegionAtFirst')}
            onValueChange={handleChangeDistrict}
            loading={districtsLoading}
            value={district}
            options={districts}
          />
        </FormItem>
      )}

      {locations.includes('villageCouncil') && (
        <FormItem name="villageCouncil" label={i18n.t('locationFields.villageCouncil')}>
          <AppSelect
            name="villageCouncil"
            placeholder={i18n.t('locationFields.choseVillageCouncil')}
            emptyLabel={i18n.t('locationFields.choseRegionAtFirst')}
            onValueChange={handleChangeSelectVillageCouncil}
            loading={villageCouncilsLoading}
            value={villageCouncil}
            options={villageCouncils}
          />
        </FormItem>
      )}

      {locations.includes('locality') && (
        <FormItem name="locality" label={i18n.t('locationFields.locality')}>
          <AppSelect
            name="locality"
            placeholder={i18n.t('locationFields.choseLocality')}
            emptyLabel={i18n.t('locationFields.choseVillageCouncilAtFirst')}
            onValueChange={handleChangeSelectLocality}
            loading={localitiesLoading}
            value={locality}
            options={localities}
          />
        </FormItem>
      )}
    </>
  );
};

FilterLocationFields.propTypes = {
  locations: PropTypes.array
};

FilterLocationFields.defaultProps = {
  locations: ['region', 'district', 'villageCouncil', 'locality']
};

export default FilterLocationFields;
