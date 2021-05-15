import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResource, resourceSelector } from '../../store';
import { useFocusEffect } from '@react-navigation/native';
import { Loader } from '../../UI/Loader';

export const ResourceShow = props => {
  const { children, route, name, scrollable, loadFullEntity } = props;

  const {
    params: { entitieId: id },
  } = route;

  const dispatch = useDispatch();
  const entity = useSelector(state => resourceSelector(state[name], id, loadFullEntity));

  useFocusEffect(
    useCallback(() => {
      if (!entity) {
        dispatch(fetchResource(name)(id));
      }
    }, [id])
  );

  if (!entity) {
    return <Loader />;
  }

  if (scrollable) {
    return <ScrollView>{children(entity)}</ScrollView>;
  }

  return <View>{children(entity)}</View>;
};
