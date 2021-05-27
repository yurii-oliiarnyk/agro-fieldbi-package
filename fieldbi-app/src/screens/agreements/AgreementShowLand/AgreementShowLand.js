import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import axios from '../../../axios/axios';
import AppLoader from '../../../components/AppLoader';
import LandInfo from '../../lands/LandInfo';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const AgreementShowLand = props => {
  const { entitie } = props;

  const [land, setLand] = useState(null);

  const fetchLand = id => {
    axios.get(`/api/v1/lands/${id}`).then(responce => {
      setLand(responce.data.data);
    });
  };

  useEffect(() => {
    if (entitie.land) {
      fetchLand(entitie.land);
    }
  }, []);

  if (!land) {
    return (
      <View style={{ alignSelf: 'center' }}>
        <AppLoader />
      </View>
    );
  }

  return <LandInfo land={land} />;
};

AgreementShowLand.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(AgreementShowLand);
