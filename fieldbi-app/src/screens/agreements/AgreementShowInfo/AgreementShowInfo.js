import React from 'react';
import PropTypes from 'prop-types';
import AgreementShowTable from '../AgreementShowTable/AgreementShowTable';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const AgreementShowInfo = props => {
  const { entitie } = props;

  return <AgreementShowTable document={entitie} />;
};

AgreementShowInfo.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(AgreementShowInfo);
