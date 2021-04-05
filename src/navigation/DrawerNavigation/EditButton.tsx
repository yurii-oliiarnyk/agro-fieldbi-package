import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import { HeaderButton } from '../../UI/HeaderButton';

type EditButtonType = {
  tintColor?: string;
  name: string;
};

export const EditButton: React.FC<EditButtonType> = (props): JSX.Element => {
  const { tintColor, name } = props;

  const navigation = useNavigation();
  const { params } = useRoute();
  const onPressHandler = () => navigation.dispatch(StackActions.push(`${name}-edit`, params));

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Add" color={tintColor} iconName="create-outline" onPress={onPressHandler} />
    </HeaderButtons>
  );
};
