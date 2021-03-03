import React, { ReactNode } from 'react';
import i18n from 'i18n-js';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { COLORS } from '../colors';

type ModalTypes = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  loading?: boolean;
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Modal: React.FC<ModalTypes> & {
  Title: unknown;
  Content: unknown;
  Actions: unknown;
  ActionsButton: unknown;
} = (props): JSX.Element => {
  const { visible, setVisible, children, loading } = props;

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Dialog onDismiss={hideModal} visible={visible}>
        {children}
        <Dialog.Actions>
          <Button color={COLORS.MAIN} onPress={hideModal}>
            {i18n.t('ui.close')}
          </Button>
        </Dialog.Actions>
        {loading && (
          <View style={styles.view}>
            <ActivityIndicator color={COLORS.MAIN} size="large" />
          </View>
        )}
      </Dialog>
    </Portal>
  );
};

Modal.Title = Dialog.Title;

Modal.Content = Dialog.Content;

Modal.Actions = Dialog.Actions;

Modal.ActionsButton = Button;
