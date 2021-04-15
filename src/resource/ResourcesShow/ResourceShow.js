import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResource, resourceSelector } from '../../store';
import { useFocusEffect } from '@react-navigation/native';
import { Loader } from '../../UI/Loader';

export const ResourceShow = props => {
  const { children, route, name, scrollable, loadFullEntity } = props;

  const [fullEntity, setFullEntity] = useState(null);

  const {
    params: { entitieId: id },
  } = route;

  const dispatch = useDispatch();
  const entity = useSelector(state => resourceSelector(state[name], id));

  useFocusEffect(
    useCallback(() => {
      if (loadFullEntity) {
        setFullEntity(null);

        dispatch(
          fetchResource(name)(id, response => {
            setFullEntity(response.data.data);
          })
        );

        return;
      }

      if (!entity) {
        dispatch(fetchResource(name)(id, () => null));
      }
    }, [])
  );

  if ((!loadFullEntity && !entity) || (loadFullEntity && !fullEntity)) {
    return <Loader />;
  }

  if (scrollable) {
    return <ScrollView>{children(fullEntity ?? entity)}</ScrollView>;
  }

  return <View>{children(fullEntity ?? entity)}</View>;
};
