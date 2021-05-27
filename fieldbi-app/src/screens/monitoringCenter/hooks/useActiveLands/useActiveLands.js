import { useState, useEffect } from 'react';
import axios from '../../../../axios/axios';

const useActiveLands = () => {
  const [loading, setLoading] = useState(false);
  const [activeLands, setActiveLands] = useState([]);
  const [selectedContractState, setSelectedContractState] = useState(null);

  useEffect(() => {
    if (!selectedContractState) {
      setActiveLands([]);

      return;
    }

    setLoading(true);

    const { id } = selectedContractState;

    axios.get(`/api/v1/lands/contract-state/${id}`).then(responce => {
      setLoading(false);
      setActiveLands(responce.data.data.map(contractState => contractState.id));
    });
  }, [selectedContractState]);

  return {
    activeLandsLoading: loading,
    activeLands,
    selectedContractState,
    setSelectedContractState
  };
};

export default useActiveLands;
