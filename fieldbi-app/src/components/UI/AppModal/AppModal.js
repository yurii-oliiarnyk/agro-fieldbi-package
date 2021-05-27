import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Dialog, Portal, Button } from 'react-native-paper';
import { COLORS } from '../../../constants';

const AppModal = props => {
  const { visible, setVisible, children, loading } = props;

  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Dialog onDismiss={() => hideModal()} visible={visible}>
        {children}
        <Dialog.Actions>
          <Button color={COLORS.MAIN} onPress={() => hideModal()}>
            Закрити
          </Button>
        </Dialog.Actions>
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActivityIndicator color={COLORS.MAIN} size="large" />
          </View>
        )}
      </Dialog>
    </Portal>
  );
};

AppModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool
};

AppModal.Title = Dialog.Title;

AppModal.Content = Dialog.Content;

AppModal.Actions = Dialog.Actions;

AppModal.ActionsButton = Button;

export default AppModal;
