import React, { useState } from 'react';
import i18n from 'i18n-js';
import { Text } from 'react-native';
import { MonitoringCenterNavigator, Modal } from 'agro-package';
import { useNavigation } from '@react-navigation/native';

export const MonitoringCenterScreen = () => {
  const [shape, setShape] = useState<null | { id: number; name: string }>(null);

  const onShapeClickHandler = (shape, resourceName) => {
    if (resourceName === 'fields') {
      const {
        properties: { id, place },
      } = shape;

      setShape({
        id,
        name: place,
      });
    }
  };

  const { navigate } = useNavigation();

  const onSubmitHandler = () => {
    const params = { ...shape };

    setShape(null);

    navigate('ScoutingReports', {
      screen: 'agro/scouting-reports-create',
      params,
    });
  };

  return (
    <>
      <MonitoringCenterNavigator fields onShapeClick={onShapeClickHandler} />
      <Modal
        visible={!!shape}
        close={() => setShape(null)}
        submitTitle={i18n.t('generals.create')}
        onSubmit={onSubmitHandler}
      >
        <Modal.Title>{i18n.t('scoutingReport.modal.title')}</Modal.Title>
        <Modal.Content>
          <Text>{`${i18n.t('scoutingReport.modal.name')} ${shape?.name}`}</Text>
        </Modal.Content>
      </Modal>
    </>
  );
};
