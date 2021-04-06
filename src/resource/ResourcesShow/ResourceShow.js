import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResource, resourceSelector } from '../../store';
import { Loader } from '../../UI/Loader';

export const ResourceShow = props => {
  const { children, route, name, scrollable, loadFullEntity } = props;

  const [fullEntity, setFullEntity] = useState(null);

  const {
    params: { entitieId: id },
  } = route;

  const dispatch = useDispatch();
  const entity = useSelector(state => resourceSelector(state[name], id));

  useEffect(() => {
    if (!entity || loadFullEntity) {
      dispatch(
        fetchResource(name)(id, response => {
          setFullEntity(response.data.data);
        })
      );
    }
  }, []);

  if ((!loadFullEntity && !entity) || (loadFullEntity && !fullEntity)) {
    return <Loader />;
  }

  if (scrollable) {
    return <ScrollView>{children(fullEntity ?? entity)}</ScrollView>;
  }

  return <View>{children(fullEntity ?? entity)}</View>;
};
