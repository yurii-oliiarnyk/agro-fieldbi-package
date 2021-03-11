import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResource, resourceSelector } from '../../store';
import { Loader } from '../../UI/Loader';

export const ResourceShow = props => {
  const { children, route, name } = props;

  const {
    params: { entitieId: id },
  } = route;
  const dispatch = useDispatch();

  const fetchResourceHandler = fetchResource(name)(id);
  const entity = useSelector(state => resourceSelector(state[name], id));

  useEffect(() => {
    if (!entity) {
      dispatch(fetchResourceHandler);
    }
  }, [fetchResourceHandler]);

  if (!entity) {
    return <Loader />;
  }

  return <ScrollView>{children(entity)}</ScrollView>;
};
