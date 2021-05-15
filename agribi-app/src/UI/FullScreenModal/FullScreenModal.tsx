import React, { useState, useCallback, ReactNode } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, BackHandler, StyleSheet } from 'react-native';
import { Portal } from 'react-native-paper';
import { TouchableFeedback } from 'agro-package';
import { FullScreenModalHeader } from './FullScreenModalHeader';

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fff',
  },
});

type FullScreenModalProps = {
  button: ReactNode;
  children: ReactNode;
  headerTitle: string;
  save?: () => void;
};

export const FullScreenModal: React.FC<FullScreenModalProps> = props => {
  const { children, headerTitle, save, button } = props;

  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          setVisible(false);

          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible])
  );

  return (
    <>
      <TouchableFeedback onPress={() => setVisible(true)}>{button}</TouchableFeedback>
      {visible && (
        <Portal>
          <View style={styles.modal}>
            <FullScreenModalHeader
              close={() => setVisible(false)}
              headerTitle={headerTitle}
              save={save}
            />
            <View style={{ flex: 1 }}>{children}</View>
          </View>
        </Portal>
      )}
    </>
  );
};
