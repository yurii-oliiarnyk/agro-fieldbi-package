import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppTouchableFeedback from '../../AppTouchableFeedback';
import Empty from '../../Empty';

import {
  fetchResources,
  refreshResources,
  loadMoreResources,
  entitiesSelector
} from '../../../store/resource/resource';
import ResourcesListFooter from './ResourcesListFooter';
import AppLoader from '../../AppLoader';
import ResourcesListSearch from './ResourcesListSearch';
import ResourcesListFAB from './ResourcesListFAB';
import screens from '../../../navigation/screens';

const ResourcesList = props => {
  const {
    fetchResources,
    loading,
    loaded,
    refreshResources,
    refreshing,
    loadMoreResources,
    loadingMore,
    entities,
    renderItem,
    total,
    labels,
    name,
    onItemPress,
    onFilterPress
  } = props;

  const navigation = useNavigation();

  const fetchResourcesCallback = useCallback(() => {
    if (!loaded) {
      fetchResources();
    }
  }, [loaded]);

  useFocusEffect(fetchResourcesCallback);

  const listEmptyComponent = () => {
    if (loading) {
      return <AppLoader />;
    }

    return <Empty description={labels.empty} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ResourcesListSearch placeholder={labels.search} name={name} />
      {!loaded && <AppLoader />}
      {loaded && (
        <>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            data={entities}
            ListEmptyComponent={listEmptyComponent}
            keyExtractor={item => item.id.toString()}
            refreshing={refreshing}
            onRefresh={() => refreshResources()}
            onEndReached={() => {
              if (!loadingMore && total !== entities.length) {
                loadMoreResources();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => <ResourcesListFooter show={total > entities.length} />}
            renderItem={({ item }) => (
              <AppTouchableFeedback
                onPress={() => {
                  if (typeof onItemPress === 'function') {
                    onItemPress(item);
                    return;
                  }
                  navigation.navigate({
                    name: screens.LandBankShow,
                    params: {
                      title: item.name || item.landNumber || item.agreementNumber,
                      resourceName: name,
                      entitieId: item.id
                    }
                  });
                }}
              >
                {renderItem(item)}
              </AppTouchableFeedback>
            )}
          />
          <ResourcesListFAB name={name} onFilterPress={onFilterPress} />
        </>
      )}
    </View>
  );
};

ResourcesList.propTypes = {
  // from connect
  fetchResources: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  refreshResources: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  loadMoreResources: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  entities: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  labels: PropTypes.shape({
    search: PropTypes.string.isRequired,
    empty: PropTypes.string.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  filterScreen: PropTypes.string,
  // from resource
  renderItem: PropTypes.func.isRequired,
  onItemPress: PropTypes.func,
  onFilterPress: PropTypes.func
};

export default connect(
  (state, { name }) => {
    const entitiesSel = entitiesSelector(name);

    return {
      entities: entitiesSel(state),
      loading: state[name].loading,
      loaded: state[name].loaded,
      refreshing: state[name].refreshing,
      loadingMore: state[name].loadingMore,
      total: state[name].total
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        fetchResources: fetchResources(name),
        refreshResources: refreshResources(name),
        loadMoreResources: loadMoreResources(name)
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourcesList);
