import { useState, useCallback, useEffect } from 'react';
import axios from '../axios';

const initState = {
  loading: false,
  entity: null,
  isError: false,
  isLoaded: false,
};

export const useResource = (baseUrl: string) => {
  const [{ loading, entity, isError, isLoaded }, setState] = useState(initState);

  useEffect(() => setState(initState), [baseUrl]);

  const fetchResource = useCallback(
    async (id: number) => {
      setState({
        loading: true,
        entity: null,
        isError: false,
        isLoaded: false,
      });

      try {
        const response = await axios.get(`/api/v1/${baseUrl}/${id}`);
        const responseEntity = response.data.data;
        setState({
          entity: responseEntity,
          loading: false,
          isError: false,
          isLoaded: true,
        });
      } catch (e) {
        setState({
          entity: null,
          loading: false,
          isError: true,
          isLoaded: false,
        });
      }
    },
    [baseUrl]
  );

  return {
    loading,
    entity,
    isError,
    isLoaded,
    fetchResource,
  };
};
