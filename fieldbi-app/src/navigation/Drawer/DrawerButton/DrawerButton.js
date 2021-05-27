import React from 'react';
import PropTypes from 'prop-types';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import AppHeaderIcon from '../../../components/AppHeaderIcon';

const DrawerButton = props => {
  const { tintColor } = props;

  const { toggleDrawer } = useNavigation();

  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Toggle Drawer"
        color={tintColor}
        iconName="ios-menu"
        onPress={() => toggleDrawer()}
      />
    </HeaderButtons>
  );
};

DrawerButton.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default DrawerButton;
