import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { axios, TouchableFeedback, COLORS } from 'agro-package';
import { FullScreenModal } from '../../UI/FullScreenModal';

const styles = StyleSheet.create({
  item: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export const ScoutingReportsScoutingTypeSelect = props => {
  const { selectedAnalysisIndicators } = props;

  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = () => {
    setLoading(true);

    axios
      .get('/api/v1/agro/select-options/scouting-types')
      .then(response => response.data.data)
      .then(options => {
        setOptions(options);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPressHandler = id => {
    if (selected.includes(id)) {
      setSelected(prevSelected => prevSelected.filter(ps => ps !== id));
    } else {
      setSelected(prevSelected => [...prevSelected, id]);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const onSaveHandler = () => {
    Promise.all(
      selected.map(select => {
        return axios.get(`/api/v1/agro/scouting-types/${select}`);
      })
    )
      .then(allResponses => allResponses.flatMap(response => response.data.data.analysisIndicators))
      .then(analysisIndicators => {
        selectedAnalysisIndicators(analysisIndicators);
      });
  };

  const renderItem = ({ item, index }) => {
    const hasBackground = index % 2 === 0;
    const isSelected = selected.includes(item.id);

    return (
      <TouchableFeedback
        style={[styles.item, hasBackground && styles.background]}
        onPress={() => onPressHandler(item.id)}
      >
        <Text style={styles.name}>{item.name}</Text>
        {isSelected && (
          <Icon name="md-checkmark" color={COLORS.MAIN} size={25} style={styles.icon} />
        )}
      </TouchableFeedback>
    );
  };

  return (
    <FullScreenModal
      button={
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 4 }}>
            {!loading && <Icon name="md-add-circle-sharp" size={20} color={COLORS.MAIN} />}
            {loading && <ActivityIndicator color={COLORS.MAIN} />}
          </View>
          <Text style={{ color: COLORS.MAIN, fontSize: 16 }}>Додати вид скаутингу</Text>
        </View>
      }
      headerTitle="Додати вид скаутингу"
      save={selected.length > 0 ? onSaveHandler : undefined}
    >
      <FlatList data={options} renderItem={renderItem} keyExtractor={item => item.id} />
    </FullScreenModal>
  );
};
