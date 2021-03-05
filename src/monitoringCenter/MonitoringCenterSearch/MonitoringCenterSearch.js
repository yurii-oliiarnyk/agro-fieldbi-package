import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated, StyleSheet, BackHandler, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import { MonitoringCenterSearchPopup } from './MonitoringCenterSearchPopup';
import { TouchableFeedback } from 'agro-package';

export const MonitoringCenterSearch = props => {
  const { resourceName, entities, onSelected, loading } = props;

  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const input = useRef();

  const { top: statusBarHeight } = useSafeAreaInsets();
  const { toggleDrawer } = useNavigation();

  const nameKey = resourceName === 'fields' ? 'name' : 'landNumber';
  const placeholder =
    resourceName === 'fields'
      ? i18n.t('monitoring.search.fields')
      : i18n.t('monitoring.search.lands');
  const emptyPlaceholder =
    resourceName === 'fields' ? i18n.t('field.notExist') : i18n.t('land.notExist');

  const open = () => setVisible(true);

  const close = () => {
    setVisible(false);
    input.current.blur();
  };

  const headerHeight = 48;
  const horizontalSpace = 16;
  const topSpace = statusBarHeight > 16 ? statusBarHeight : 16;

  useEffect(() => setSearch(''), [resourceName]);

  const searching = entities => {
    const isSearchValid = !!search?.trim().length;

    if (!isSearchValid) {
      return entities;
    }

    return entities.filter(entity => {
      const name = entity[nameKey].toLowerCase();
      const searchLower = search.toLowerCase();

      return name.includes(searchLower);
    });
  };

  const onItemPressHanlder = id => {
    const current = entities.find(entitie => entitie.id === id);

    setSearch(current[nameKey]);
    onSelected({
      id: current.id,
      resourceName,
    });
    close();
  };

  const [iconsWrapperProps, iconsProps] = useMemo(() => {
    const name = visible ? 'md-arrow-back' : 'ios-menu';
    const onPress = visible ? () => close() : () => toggleDrawer();

    return [
      {
        onPress,
        style: styles.iconWrapper,
      },
      {
        color: '#606060',
        size: 24,
        name,
      },
    ];
  }, [visible, toggleDrawer]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          setVisible(false);

          close();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible, setVisible])
  );

  return (
    <>
      <Animated.View
        style={{
          ...styles.inputBg,
          left: visible ? 0 : horizontalSpace,
          right: visible ? 0 : horizontalSpace,
          paddingTop: visible ? topSpace : 0,
          top: visible ? 0 : topSpace,
        }}
      >
        <View>
          <TouchableFeedback {...iconsWrapperProps}>
            <Icon {...iconsProps} />
          </TouchableFeedback>
          <Searchbar
            ref={input}
            style={{
              elevation: 0,
              shadowOpacity: 0,
              height: headerHeight,
            }}
            value={search}
            onChangeText={setSearch}
            onFocus={() => open()}
            icon={() => null}
            placeholder={placeholder}
          />
        </View>
      </Animated.View>
      {visible && (
        <MonitoringCenterSearchPopup
          emptyPlaceholder={emptyPlaceholder}
          nameKey={nameKey}
          loading={loading}
          onItemPressHanlder={onItemPressHanlder}
          dataSource={searching(entities)}
          offset={topSpace + headerHeight}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inputBg: {
    position: 'absolute',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    zIndex: 13,
    elevation: 5,
    borderRadius: 0,
    paddingHorizontal: 0,
  },
  iconWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    height: '100%',
    zIndex: 15,
    width: 48,
  },
});

MonitoringCenterSearch.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.object).isRequired,
  resourceName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
};
