import React, { useState } from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet } from 'react-native';
import { Modal } from '../../UI/Modal';
import { Checkbox } from '../../UI/Checkbox';
import { RadioboxGroup } from '../../UI/RadioboxGroup';

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#fff',
    marginBottom: 8,
  },
});

type StyleControlTypes = {
  style: string;
  setStyle: (value: string) => void;
  showCadastralLayer?: boolean;
  setShowCadastralLayer: (visible: boolean) => void;
};

export const StyleControl: React.FC<StyleControlTypes> = props => {
  const { style, setStyle, showCadastralLayer, setShowCadastralLayer } = props;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FAB
        small
        icon={({ size, color }) => <Icon name="layers" color={color} size={size} />}
        onPress={() => setModalVisible(true)}
        style={styles.icon}
      />
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <Modal.Title>Тип карти</Modal.Title>
        <Modal.Content>
          <RadioboxGroup
            active={style}
            onChange={setStyle}
            values={[
              {
                key: 'default',
                value: 'default',
                label: 'Мапа вулиць та доріг',
              },
              {
                key: 'satellite',
                value: 'satellite',
                label: 'Супутникова мапа',
              },
            ]}
          />
        </Modal.Content>
        <Modal.Title>Опції карти</Modal.Title>
        <Modal.Content>
          <Checkbox
            label="Кадастрова мапа України"
            onChange={setShowCadastralLayer}
            active={showCadastralLayer}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};
