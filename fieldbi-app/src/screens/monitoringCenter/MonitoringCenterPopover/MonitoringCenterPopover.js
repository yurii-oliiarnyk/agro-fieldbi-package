import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Animated, StyleSheet, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import AppTouchableFeedback from '../../../components/AppTouchableFeedback';
import CloseIcon from '../../../assets/svg/close.svg';
import { fetchResource, resourceSelector } from '../../../store/resource/resource';
import FieldsListItem from '../../fields/FieldList/FieldsListItem';
import LandListItem from '../../lands/LandList/LandListItem';
import AppLoader from '../../../components/AppLoader';

const MonitoringCenterPopover = props => {
  const { id, resourceName, onClose } = props;

  const transformAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeArea();

  const entitie = useSelector(state => resourceSelector(state[resourceName], id));
  const dispatch = useDispatch();
  const fetchResourceHandler = fetchResource(resourceName)(id);

  useEffect(() => {
    if (!entitie) {
      dispatch(fetchResourceHandler);
    }
  }, [fetchResourceHandler]);

  const getItemInfo = () => {
    return resourceName === 'fields' ? (
      <FieldsListItem entitie={entitie} linkedTitle />
    ) : (
      <LandListItem entitie={entitie} linkedTitle />
    );
  };

  const show = () => {
    Animated.timing(transformAnim, {
      toValue: 1,
      duration: 100
    }).start();
  };

  const close = () => {
    onClose();

    Animated.timing(transformAnim, {
      toValue: 0,
      duration: 100
    }).start();
  };

  useEffect(() => {
    show();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          paddingBottom: insets.bottom > 20 ? insets.bottom : 20,
          opacity: transformAnim
        }
      ]}
    >
      <AppTouchableFeedback onPress={close} style={styles.close}>
        <CloseIcon />
      </AppTouchableFeedback>
      {entitie && getItemInfo()}
      {!entitie && <AppLoader size="small" />}
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
    zIndex: 12
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
        shadowRadius: 2
      },
      android: {
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderStyle: 'solid'
      }
    })
  }
});

MonitoringCenterPopover.propTypes = {
  id: PropTypes.number.isRequired,
  resourceName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MonitoringCenterPopover;
