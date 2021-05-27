import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';
import AppModal from '../../../components/UI/AppModal';
import AppRadioButtonGroup from '../../../components/UI/AppRadioButtonGroup';
import AppCheckbox from '../../../components/UI/AppCheckbox';

const StyleControl = props => {
  const { style, setStyle, showCadastralLayer, setShowCadastralLayer } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const onChangeHandler = style => {
    setStyle(style);
  };

  return (
    <>
      <FAB
        small
        icon={({ size, color }) => <Icon name="layers" color={color} size={size} />}
        onPress={() => setModalVisible(true)}
        style={styles.icon}
      />
      <AppModal visible={modalVisible} setVisible={setModalVisible}>
        <AppModal.Title>Тип карти</AppModal.Title>
        <AppModal.Content>
          <AppRadioButtonGroup
            active={style}
            onChangeHandler={onChangeHandler}
            values={[
              {
                key: 'default',
                value: 'default',
                label: 'Мапа вулиць та доріг'
              },
              {
                key: 'satellite',
                value: 'satellite',
                label: 'Супутникова мапа'
              }
            ]}
          />
        </AppModal.Content>
        <AppModal.Title>Опції карти</AppModal.Title>
        <AppModal.Content>
          <AppCheckbox
            label="Кадастрова мапа України"
            onChange={setShowCadastralLayer}
            active={showCadastralLayer}
          />
        </AppModal.Content>
      </AppModal>
    </>
  );
};

StyleControl.propTypes = {
  style: PropTypes.string.isRequired,
  setStyle: PropTypes.func.isRequired,
  showCadastralLayer: PropTypes.bool.isRequired,
  setShowCadastralLayer: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#fff',
    marginBottom: 8
  }
});

export default StyleControl;
