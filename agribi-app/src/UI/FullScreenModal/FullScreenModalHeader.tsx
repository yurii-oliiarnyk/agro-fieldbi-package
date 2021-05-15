import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableFeedback, COLORS } from 'agro-package';

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1,
    ...Platform.select({
      android: {
        backgroundColor: COLORS.MAIN,
      },
      ios: {
        backgroundColor: '#fff',
        shadowOpacity: 0.85,
        shadowRadius: 0,
        shadowOffset: { height: 0.5, width: 0 },
        shadowColor: 'rgb(216, 216, 216)',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        height: 56,
      },
      ios: {
        height: 44,
      },
    }),
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    height: '100%',
    width: 56,
  },
  titleWrapper: {
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
    ...Platform.select({
      ios: {
        alignItems: 'center',
      },
    }),
  },
  title: {
    ...Platform.select({
      android: {
        color: '#fff',
        fontSize: 20,
      },
      ios: {
        color: COLORS.MAIN,
        fontSize: 17,
        fontWeight: '600',
      },
    }),
  },
});

type FullScreenModalHeaderProps = {
  headerTitle: string;
  close: () => void;
  save?: () => void;
};

export const FullScreenModalHeader: React.FC<FullScreenModalHeaderProps> = props => {
  const { headerTitle, close, save } = props;

  const onSaveHandler = () => {
    if (typeof save === 'function') {
      close();
      save();
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableFeedback style={styles.iconWrapper} onPress={close}>
          <Icon
            size={24}
            name="md-arrow-back"
            color={Platform.OS === 'ios' ? COLORS.MAIN : '#fff'}
          />
        </TouchableFeedback>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{headerTitle}</Text>
        </View>
        {typeof save === 'function' ? (
          <TouchableFeedback style={styles.iconWrapper} onPress={onSaveHandler}>
            <Icon
              size={24}
              name="ios-checkmark"
              color={Platform.OS === 'ios' ? COLORS.MAIN : '#fff'}
            />
          </TouchableFeedback>
        ) : (
          <View style={styles.iconWrapper} />
        )}
      </View>
    </View>
  );
};
