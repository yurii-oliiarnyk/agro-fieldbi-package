import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation, StackActions } from '@react-navigation/native';
import { HeaderButton } from '../../UI/HeaderButton';

type CreateButtonType = {
  tintColor?: string;
  name: string;
};

export const CreateButton: React.FC<CreateButtonType> = (props): JSX.Element => {
  const { tintColor, name } = props;

  const navigation = useNavigation();
  const onPressHandler = () => navigation.dispatch(StackActions.push(`${name}-create`));

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Add" color={tintColor} iconName="add-outline" onPress={onPressHandler} />
    </HeaderButtons>
  );
};
