import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, FlatList, StyleSheet } from 'react-native';
import { TouchableFeedback, COLORS, axios, Loader } from 'agro-package';

const styles = StyleSheet.create({
  item: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(216, 216, 216, 0.5)',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
  },
  disabledItem: {
    backgroundColor: 'rgba(216, 216, 216, 0.3)',
  },
  background: {
    backgroundColor: '#ECEBF2',
  },
  name: {
    flexShrink: 1,
  },
  icon: {
    marginLeft: 24,
  },
});

type ScoutingReportsSelectBodyProps = {
  apiUrl: string;
  selectedItems: number[];
  disabledItems?: number[];
  onPress: (id: number) => void;
};

export const ScoutingReportsSelectBody: React.FC<ScoutingReportsSelectBodyProps> = props => {
  const { apiUrl, selectedItems, disabledItems = [], onPress } = props;

  const [state, setState] = useState({
    options: [],
    loading: false,
  });
  const { options, loading } = state;

  const loadOptions = useCallback(() => {
    setState({ loading: true, options: [] });

    axios
      .get(apiUrl, { params: { limit: 0 } })
      .then(response => response.data.pagination.count)
      .then(limit => axios.get(apiUrl, { params: { limit } }))
      .then(response => response.data.data)
      .then(options => {
        setState({ options, loading: false });
      })
      .catch(() => {
        setState({ loading: false, options: [] });
      });
  }, [apiUrl]);

  useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected = selectedItems.includes(item.id);
      const isDisabled = disabledItems.includes(item.id);

      return (
        <TouchableFeedback
          style={[styles.item, isDisabled && styles.disabledItem]}
          disabled={isDisabled}
          onPress={() => onPress(item.id)}
        >
          <Text style={styles.name}>{item.name}</Text>
          {isSelected && (
            <Icon name="md-checkmark" color={COLORS.MAIN} size={25} style={styles.icon} />
          )}
        </TouchableFeedback>
      );
    },
    [onPress, selectedItems, disabledItems]
  );

  if (loading) {
    return <Loader />;
  }

  return <FlatList data={options} renderItem={renderItem} keyExtractor={item => String(item.id)} />;
};
