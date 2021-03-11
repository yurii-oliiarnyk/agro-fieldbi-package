import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { HeaderButton } from '../../UI/HeaderButton';

type DrawerButtonType = {
  tintColor?: string;
};

export const DrawerButton: React.FC<DrawerButtonType> = (props): JSX.Element => {
  const { tintColor } = props;

  const navigation = useNavigation();
  const onPressHandler = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Toggle Drawer" color={tintColor} iconName="ios-menu" onPress={onPressHandler} />
    </HeaderButtons>
  );
};
