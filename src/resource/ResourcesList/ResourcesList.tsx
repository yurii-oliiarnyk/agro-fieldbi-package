import React, { ReactNode, useEffect } from 'react';
import _get from 'lodash.get';
import { FlatList, View } from 'react-native';
import { Loader } from '../../UI/Loader';
import { Empty } from '../../UI/Empty';
import { ResourcesListFooter } from './ResourcesListFooter';
import { TouchableFeedback } from '../../UI/TouchableFeedback';
import { ResourcesListFAB } from './ResourcesListFAB';
import { ResourcesListSearch } from './ResourcesListSearch';

type ResourceListTypes = {
  loadEntities: () => void;
  refreshEntities: () => void;
  loadMoreEntities: () => void;
  loading: boolean;
  refreshing: boolean;
  isLoadMorePossible: boolean;
  entities: any[];
  name: string;
  nameField: string;
  renderItem: (item: any) => ReactNode;
  labels: {
    empty: string;
    search: string;
  };
  navigation: any;
  showScreen: boolean;
  filterScreen: boolean;
};

export const ResourcesList: React.FC<ResourceListTypes> = props => {
  const {
    loadEntities,
    loading,
    refreshEntities,
    refreshing,
    loadMoreEntities,
    entities,
    renderItem,
    isLoadMorePossible,
    labels,
    name,
    nameField,
    navigation,
    showScreen,
    filterScreen,
  } = props;

  useEffect(() => {
    loadEntities();
  }, []);

  const onListItemPress = item => {
    if (!showScreen) {
      return;
    }

    navigation.push(`${name}-show`, {
      title: _get(item, nameField),
      resourceName: name,
      entitieId: item.id,
    });
  };

  const onFilterPress = () => {
    navigation.push(`${name}-filter`);
  };

  const listEmptyComponent = () => {
    if (loading) {
      return <Loader />;
    }

    return <Empty description={labels.empty} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <ResourcesListSearch placeholder={labels.search} name={name} />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={entities}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => refreshEntities()}
        onEndReached={() => loadMoreEntities()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => <ResourcesListFooter show={isLoadMorePossible} />}
        renderItem={({ item }) => (
          <TouchableFeedback onPress={() => onListItemPress(item)}>
            {renderItem(item)}
          </TouchableFeedback>
        )}
      />
      {filterScreen && <ResourcesListFAB name={name} onFilterPress={onFilterPress} />}
    </View>
  );
};
