import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableFeedback } from '../../../UI/TouchableFeedback';
import { COLORS } from '../../../colors';

export const ResourcesListItemName = props => {
  const { name, linked } = props;

  const navigation = useNavigation();
  const Wrapper = linked ? TouchableFeedback : View;

  return (
    <Wrapper
      onPress={() => {
        if (!linked) {
          return;
        }

        navigation.push(`${linked.name}-show`, {
          title: name,
          resourceName: linked.name,
          entitieId: linked.id,
        });
      }}
    >
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  name: {
    color: COLORS.MAIN,
    fontSize: 14,
    lineHeight: 17,
  },
});

ResourcesListItemName.propTypes = {
  name: PropTypes.string.isRequired,
  linked: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};
