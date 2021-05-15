import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'agro-package';

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    marginRight: 4,
  },
  text: {
    color: COLORS.MAIN,
    fontSize: 16,
  },
});

type ScoutingReportsSelectButtonProps = {
  name: string;
  loading?: boolean;
};

export const ScoutingReportsSelectButton: React.FC<ScoutingReportsSelectButtonProps> = props => {
  const { loading, name } = props;

  return (
    <View style={styles.view}>
      <View style={styles.iconView}>
        {!loading && <Icon name="md-add-circle-sharp" size={20} color={COLORS.MAIN} />}
        {loading && <ActivityIndicator color={COLORS.MAIN} />}
      </View>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};
