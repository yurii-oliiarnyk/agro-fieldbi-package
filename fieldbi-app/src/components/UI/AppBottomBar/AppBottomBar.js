import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import AppTouchableFeedback from '../../AppTouchableFeedback';

const AppBottomBar = props => {
  const { tabs, active, setActive } = props;

  const insets = useSafeArea();

  const passiveColor = Platform.select({
    ios: '#8e8e8f',
    default: 'rgba(255, 255, 255, 0.6)'
  });

  const activeColor = Platform.select({
    ios: '#00A1FF',
    default: '#fff'
  });

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: insets.bottom
      }}
    >
      {tabs.map((tab, index) => {
        const isActive = index === active;
        const currentColor = isActive ? activeColor : passiveColor;

        return (
          <AppTouchableFeedback
            style={styles.item}
            key={tab.id}
            onPress={() => {
              setActive(index);

              if (typeof tab.onSelect === 'function') {
                tab.onSelect(tab);
              }
            }}
          >
            <View style={styles.icon}>
              {React.cloneElement(tab.icon, {
                color: currentColor
              })}
            </View>
            <Text style={{ ...styles.label, color: currentColor }}>{tab.label}</Text>
          </AppTouchableFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { backgroundColor: '#fff', borderTopColor: 'rgb(224, 224, 224)', borderTopWidth: 0.5 },
      default: { backgroundColor: '#00A1FF' }
    }),
    flexDirection: 'row'
  },
  item: {
    height: Platform.OS === 'ios' ? 50 : 54,
    paddingVertical: Platform.OS === 'ios' ? 0 : 2,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 1.5
  }
});

AppBottomBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      onSelect: PropTypes.func
    })
  ),
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired
};

export default AppBottomBar;
