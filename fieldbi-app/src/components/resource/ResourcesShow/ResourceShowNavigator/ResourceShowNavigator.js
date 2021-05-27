import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import { BottomTabNavigator as Tab } from '../../../../navigation/utils';
import { bottomTabOptions } from '../../../../navigation/styles';
import ResourceShowContext from '../ResourceShowContext';

const ResourceShowNavigator = props => {
  const { screens } = props;

  const route = useRoute();
  const { params } = route;

  if (screens.length === 1) {
    const ShowComponent = screens[0].screen;

    return (
      <ResourceShowContext.Provider value={params}>
        <ShowComponent />
      </ResourceShowContext.Provider>
    );
  }

  return (
    <ResourceShowContext.Provider value={params}>
      <Tab.Navigator {...bottomTabOptions}>
        {screens.map(({ screenName, screen, label, icon }) => (
          <Tab.Screen
            key={screenName}
            name={screenName}
            component={screen}
            options={{
              tabBarLabel: label,
              tabBarIcon: icon,
              tabBarVisible: screens.length !== 1
            }}
          />
        ))}
      </Tab.Navigator>
    </ResourceShowContext.Provider>
  );
};

const screenProps = {
  screenName: PropTypes.string.isRequired,
  screen: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  icon: PropTypes.func
};

ResourceShowNavigator.propTypes = {
  screens: PropTypes.arrayOf(PropTypes.shape(screenProps)).isRequired
};

export default ResourceShowNavigator;
