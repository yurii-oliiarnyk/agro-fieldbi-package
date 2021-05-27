import React from 'react';
import PropTypes from 'prop-types';
import LandInfo from '../LandInfo';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const LandShowInfo = props => {
  const { entitie } = props;

  return <LandInfo land={entitie} />;
};

LandShowInfo.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(LandShowInfo);
