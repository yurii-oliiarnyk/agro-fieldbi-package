import React, { ReactNode } from 'react';
import i18n from 'i18n-js';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper';
import { COLORS } from '../colors';

type ModalTypes = {
  visible: boolean;
  close: () => void;
  children: ReactNode;
  loading?: boolean;
  submitTitle?: string;
  onSubmit?: () => void;
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

export const Modal = (props: ModalTypes): JSX.Element => {
  const { visible, close, children, loading, submitTitle, onSubmit } = props;

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        {children}
        <Dialog.Actions>
          <Button color={COLORS.MAIN} onPress={close}>
            {i18n.t('ui.close')}
          </Button>
          {submitTitle && typeof onSubmit === 'function' && (
            <Button color={COLORS.MAIN} onPress={onSubmit}>
              {submitTitle ?? i18n.t('ui.yes')}
            </Button>
          )}
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
