import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation, StackActions } from '@react-navigation/native';
import { HeaderButton } from '../../UI/HeaderButton';

type EditButtonType = {
  tintColor?: string;
  name: string;
};

export const EditButton: React.FC<EditButtonType> = (props): JSX.Element => {
  const { tintColor, name } = props;

  const navigation = useNavigation();
  const onPressHandler = () => navigation.dispatch(StackActions.push(`${name}-edit`));

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Add" color={tintColor} iconName="create-outline" onPress={onPressHandler} />
    </HeaderButtons>
  );
};
