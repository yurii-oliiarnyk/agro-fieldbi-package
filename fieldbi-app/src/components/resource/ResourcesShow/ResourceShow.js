import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResource, resourceSelector } from '../../../store/resource/resource';
import AppLoader from '../../AppLoader';
import ResourceShowContext from './ResourceShowContext';

const ResourceShow = props => {
  const {
    children,
    screenParams: { scrollable }
  } = props;

  const params = useContext(ResourceShowContext);

  const { resourceName, entitieId: id } = params;
  const dispatch = useDispatch();

  const fetchResourceHandler = fetchResource(resourceName)(id);
  const entitie = useSelector(state => resourceSelector(state[resourceName], id));

  useEffect(() => {
    if (!entitie) {
      dispatch(fetchResourceHandler);
    }
  }, [fetchResourceHandler]);

  if (!entitie) {
    return <AppLoader />;
  }

  if (scrollable) {
    return (
      <ScrollView
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <View>{children({ entitie })}</View>
      </ScrollView>
    );
  }

  return <View style={{ backgroundColor: '#fff', flex: 1 }}>{children({ entitie })}</View>;
};

ResourceShow.propTypes = {
  children: PropTypes.func.isRequired,
  screenParams: PropTypes.shape({
    scrollable: PropTypes.bool
  })
};

ResourceShow.defaultProps = {
  screenParams: {
    scrollable: true
  }
};

export default ResourceShow;
