import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { entitiesSelector, fetchResources, refreshResources, loadMoreResources } from '../../store';
import { ResourcesList } from './ResourcesList';

export const ResourceListWrapper = connect(
  (state, { name }) => {
    const entitiesSel = entitiesSelector(name);
    const entities = entitiesSel(state);

    return {
      entities,
      loading: state[name].loading,
      refreshing: state[name].refreshing,
      total: state[name].total,
      isLoadMorePossible: state[name].total > entities.length,
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        loadEntities: fetchResources(name),
        refreshEntities: refreshResources(name),
        loadMoreEntities: loadMoreResources(name),
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourcesList);
