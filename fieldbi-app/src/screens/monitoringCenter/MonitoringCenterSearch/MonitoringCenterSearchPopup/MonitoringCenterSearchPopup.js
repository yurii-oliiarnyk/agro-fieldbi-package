import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, Animated, useWindowDimensions, StyleSheet } from 'react-native';
import AppTouchableFeedback from '../../../../components/AppTouchableFeedback';
import Empty from '../../../../components/Empty';
import AppLoader from '../../../../components/AppLoader';

const MonitoringCenterSearchPopup = props => {
  const { offset, onItemPressHanlder, dataSource, nameKey, emptyPlaceholder, loading } = props;

  const animate = useRef(new Animated.Value(0)).current;

  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 200
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.content,
        paddingTop: offset,
        left: 0,
        right: 0,
        height: '100%',
        transform: [
          {
            translateY: animate.interpolate({
              inputRange: [0, 1],
              outputRange: [screenHeight + 50, 0]
            })
          }
        ]
      }}
    >
      <FlatList
        data={dataSource}
        renderItem={({ item, index }) => {
          const style = [styles.item, index !== 0 && styles.itemBorder];

          return (
            <AppTouchableFeedback onPress={() => onItemPressHanlder(item.id)} style={style}>
              <Text>{item[nameKey]}</Text>
            </AppTouchableFeedback>
          );
        }}
        ListEmptyComponent={loading ? <AppLoader /> : <Empty description={emptyPlaceholder} />}
        keyExtractor={item => item.id.toString()}
        style={{
          paddingVertical: 8
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 12,
    backgroundColor: '#fff'
  },
  item: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  itemBorder: {
    borderTopColor: 'rgba(240, 240, 240, 0.3)',
    borderTopWidth: 1,
    borderStyle: 'solid'
  }
});

MonitoringCenterSearchPopup.propTypes = {
  offset: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onItemPressHanlder: PropTypes.func.isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  nameKey: PropTypes.string.isRequired,
  emptyPlaceholder: PropTypes.string.isRequired
};

export default MonitoringCenterSearchPopup;
