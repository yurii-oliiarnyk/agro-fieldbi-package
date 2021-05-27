import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View } from 'react-native';
import ResourceBindingTable from './ResourceBindingTable';
import OutputNumber from '../../../UI/OutputNumber';
import ResourceTable from '../ResourceTable';
import AppWarning from '../../../AppWarning';

const ResourceBinding = props => {
  const { totalArea, bindingInformation, labels, nameOneLine, intersectionResourceName } = props;

  const totalBindArea = bindingInformation.reduce((sum, bind) => bind.intersectionArea + sum, 0);
  const totalBindAreaPercent = (totalBindArea * 100) / totalArea;
  const totalNotBindArea = totalArea - totalBindArea;
  const totalNotBindAreaPercent = 100 - totalBindAreaPercent;

  const dataSource = bindingInformation.map(bind => {
    return {
      key: bind.id,
      id: bind.id,
      name: bind.intersectionWith,
      area: <OutputNumber value={bind.intersectionArea} />,
      areaPercentage: <OutputNumber value={(bind.intersectionArea * 100) / totalArea} />
    };
  });

  const resourceTableData = [
    {
      name: i18n.t(labels.area, {
        unit: i18n.t('generals.areaUnits')
      }),
      value: <OutputNumber value={totalArea} />,
      key: 'totalArea'
    },
    {
      name: i18n.t(labels.totalBindArea, {
        unit: i18n.t('generals.areaUnits')
      }),
      value: <OutputNumber value={totalBindArea} />,
      key: 'totalBindArea'
    },
    {
      name: i18n.t(labels.totalBindArea, {
        unit: '%'
      }),
      value: <OutputNumber value={totalBindAreaPercent} />,
      key: 'totalBindAreaPercent'
    },
    {
      name: i18n.t(labels.totalNotBindArea, {
        unit: i18n.t('generals.areaUnits')
      }),
      value: <OutputNumber value={totalNotBindArea} />,
      key: 'totalNotBindArea'
    },
    {
      name: i18n.t(labels.totalNotBindArea, {
        unit: '%'
      }),
      value: <OutputNumber value={totalNotBindAreaPercent} />,
      key: 'totalNotBindAreaPercent'
    }
  ];

  if (!dataSource.length) {
    return <AppWarning title={i18n.t(labels.fallbackMessage)} />;
  }

  return (
    <>
      <View style={{ marginBottom: 16 }}>
        <ResourceBindingTable
          data={dataSource}
          totalArea={totalBindArea}
          totalAreaPercent={totalBindAreaPercent}
          nameOneLine={nameOneLine}
          intersectionResourceName={intersectionResourceName}
        />
      </View>
      <ResourceTable data={resourceTableData} />
    </>
  );
};

ResourceBinding.propTypes = {
  totalArea: PropTypes.number.isRequired,
  bindingInformation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      intersectionArea: PropTypes.number.isRequired
    })
  ),
  labels: PropTypes.shape({
    area: PropTypes.string.isRequired,
    totalBindArea: PropTypes.string.isRequired,
    totalNotBindArea: PropTypes.string.isRequired,
    fallbackMessage: PropTypes.string.isRequired
  }).isRequired,

  intersectionResourceName: PropTypes.string.isRequired,
  nameOneLine: PropTypes.bool
};

export default ResourceBinding;
