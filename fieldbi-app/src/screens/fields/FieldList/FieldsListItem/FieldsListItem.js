import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import IrrigatedIcon from '../../../../assets/svg/polyvne.svg';
import NotIrrigatedIcon from '../../../../assets/svg/ne_polyvne.svg';

import OutputNumber from '../../../../components/UI/OutputNumber';

import ResourcesListItem from '../../../../components/resource/ResourcesList/ResourcesListItem';
import ResourcesListItemInfo from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemInfo';
import ResourcesListItemName from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemName';
import ResourcesListItemContour from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemContour';

const FieldsListItem = props => {
  const { entitie, linkedTitle } = props;

  const {
    name,
    tillableArea,
    subdivision,
    shortSubdivisionData,
    region,
    regionShortData,
    district,
    districtShortData,
    irrigated
  } = entitie;

  const irrigatedImage = irrigated ? (
    <IrrigatedIcon style={styles.irrigatedImage} />
  ) : (
    <NotIrrigatedIcon style={styles.irrigatedImage} />
  );

  const resourceName = 'fields';

  const MainComponent = (
    <>
      <ResourcesListItemName
        name={name}
        linked={linkedTitle}
        resourceName={resourceName}
        id={entitie.id}
      />
      {subdivision && (
        <ResourcesListItemInfo
          name={i18n.t('subdivision.singleName')}
          value={shortSubdivisionData.name}
        />
      )}
      {region && district && (
        <ResourcesListItemInfo
          value={i18n.t('field.location', {
            region: regionShortData.name,
            district: districtShortData.name
          })}
          small
        />
      )}
    </>
  );

  const RightComponent = (
    <View style={styles.rightView}>
      {irrigatedImage}
      <Text>
        <OutputNumber value={tillableArea} type="area" />
      </Text>
    </View>
  );

  const LeftComponent = (
    <ResourcesListItemContour coordinates={entitie.coordinates} color="#1ED700" />
  );

  return (
    <ResourcesListItem
      MainComponent={MainComponent}
      RightComponent={RightComponent}
      LeftComponent={LeftComponent}
    />
  );
};

const styles = StyleSheet.create({
  irrigatedImage: {
    width: 12,
    height: 16,
    marginRight: 15
  },
  rightView: {
    flexDirection: 'row'
  }
});

FieldsListItem.propTypes = {
  entitie: PropTypes.object.isRequired,
  linkedTitle: PropTypes.bool
};

export default FieldsListItem;
