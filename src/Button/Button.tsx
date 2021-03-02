import React from 'react';
import { View, Text } from 'react-native';

type AppButtonTypes = {
  title: string;
};

export const AppButton: React.FC<AppButtonTypes> = props => {
  const { title } = props;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
