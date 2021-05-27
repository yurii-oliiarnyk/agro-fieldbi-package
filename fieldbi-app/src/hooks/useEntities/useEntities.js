import { useState, useCallback } from 'react';
import axios from '../../axios/axios';
import { LIMIT, START_PAGE } from '../../config';

const useEntities = () => {
  const [currentPage, setCurrentPage] = useState(START_PAGE);
  const [total, setTotal] = useState(null);
  const [entities, setEntities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = (url, params, page, setLoading, forceUpdate) => {
    setCurrentPage(page);
    setLoading(true);

    axios
      .get(url, {
        params: {
          limit: LIMIT,
          offset: (page - 1) * LIMIT,
          ...params
        }
      })
      .then(response => {
        const { data, pagination } = response.data;

        if (forceUpdate) {
          setEntities(data);
        } else {
          setEntities(entities => [...entities, ...data]);
        }

        setTotal(pagination.count);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isLoadMorePossible = total > entities.length;
  const mockFn = () => {};

  const loadEntities = (url, params) => load(url, params, START_PAGE, setLoading, true);
  const loadMoreEntities = (url, params) =>
    !loadingMore && isLoadMorePossible
      ? load(url, params, currentPage + 1, setLoadingMore)
      : mockFn;
  const refreshEntities = (url, params) => load(url, params, START_PAGE, setRefreshing, true);

  return {
    entities,
    loadEntities,
    loading,
    loadMoreEntities,
    loadingMore,
    refreshEntities,
    refreshing,
    isLoadMorePossible
  };
};

export default useEntities;
