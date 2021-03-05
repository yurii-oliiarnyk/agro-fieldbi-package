import React, { useEffect, useRef } from 'react';
import { FlatList, Text, Animated, useWindowDimensions, StyleSheet } from 'react-native';
import { TouchableFeedback } from '../../UI/TouchableFeedback';
import { Loader } from '../../UI/Loader';
import { Empty } from '../../UI/Empty';

type MonitoringCenterSearchPopupTypes = {
  offset: number;
  onItemPressHanlder: (id: number) => void;
  dataSource: { id: number; name?: string; landNumber?: string }[];
  nameKey: 'landNumber' | 'name';
  emptyPlaceholder: string;
  loading: boolean;
};

export const MonitoringCenterSearchPopup: React.FC<MonitoringCenterSearchPopupTypes> = props => {
  const { offset, onItemPressHanlder, dataSource, nameKey, emptyPlaceholder, loading } = props;

  const animate = useRef(new Animated.Value(0)).current;

  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animate]);

  const viewStyles = [
    styles.content,
    {
      paddingTop: offset,
      transform: [
        {
          translateY: animate.interpolate({
            inputRange: [0, 1],
            outputRange: [screenHeight + 50, 0],
          }),
        },
      ],
    },
  ];

  return (
    <Animated.View style={viewStyles}>
      <FlatList
        data={dataSource}
        renderItem={({ item, index }) => {
          const style = [styles.item, index !== 0 && styles.itemBorder];

          return (
            <TouchableFeedback onPress={() => onItemPressHanlder(item.id)} style={style}>
              <Text>{item[nameKey]}</Text>
            </TouchableFeedback>
          );
        }}
        ListEmptyComponent={loading ? <Loader /> : <Empty description={emptyPlaceholder} />}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    bottom: 0,
    zIndex: 12,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  itemBorder: {
    borderTopColor: 'rgba(240, 240, 240, 0.3)',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  flatList: {
    paddingVertical: 8,
  },
});
