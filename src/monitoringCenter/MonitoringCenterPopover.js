import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Platform, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loader, TouchableFeedback } from 'agro-package';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useResource } from '../hooks/useResource';

export const MonitoringCenterPopover = props => {
  const { id, resourceName, onClose } = props;

  const transformAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const { entity, loading, fetchResource } = useResource(resourceName);

  useEffect(() => {
    fetchResource(id);
  }, [id, fetchResource]);

  const getItemInfo = () => {
    return (
      <View>
        <Text>{entity.name ?? entity.landNumber}</Text>
      </View>
    );

    // return resourceName === 'fields' ? (
    //   <FieldsListItem entitie={entitie} linkedTitle />
    // ) : (
    //   <LandListItem entitie={entitie} linkedTitle />
    // );
  };

  const show = useCallback(() => {
    Animated.timing(transformAnim, {
      toValue: 1,
      duration: 100,
    }).start();
  }, [transformAnim]);

  const close = useCallback(() => {
    onClose();

    Animated.timing(transformAnim, {
      toValue: 0,
      duration: 100,
    }).start();
  }, [transformAnim, onClose]);

  useEffect(() => {
    show();
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom > 20 ? insets.bottom : 20,
          opacity: transformAnim,
        },
      ]}
    >
      <TouchableFeedback onPress={close} style={styles.close}>
        <Icon name="close" />
      </TouchableFeedback>
      {entity && getItemInfo()}
      {loading && <Loader size="small" />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  close: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 4,
    zIndex: 12,
  },
  wrapper: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 80,
    backgroundColor: '#fff',
    bottom: 0,
    position: 'absolute',
    left: -1,
    right: -1,
    zIndex: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0,
        shadowRadius: 2,
      },
      android: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderStyle: 'solid',
      },
    }),
  },
});

MonitoringCenterPopover.propTypes = {
  id: PropTypes.number.isRequired,
  resourceName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
