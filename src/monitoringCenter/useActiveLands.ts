import { useState, useEffect } from 'react';
import axios from '../axios';

type ContractStateType = { id: number };

export const useActiveLands = (initContractState?: ContractStateType) => {
  const [loading, setLoading] = useState(false);
  const [activeLands, setActiveLands] = useState<number[]>([]);
  const [selectedContractState, setSelectedContractState] = useState<
    ContractStateType | undefined
  >();

  useEffect(() => {
    if (!selectedContractState) {
      setActiveLands([]);

      return;
    }

    setLoading(true);

    const { id } = selectedContractState;

    axios
      .get(`/api/v1/lands/contract-state/${id}`)
      .then(response => response.data.data)
      .then((response: ContractStateType[]) => {
        setLoading(false);
        setActiveLands(response.map(contractState => contractState.id));
      });
  }, [selectedContractState]);

  useEffect(() => {
    if (typeof initContractState !== 'undefined') {
      setSelectedContractState(initContractState);
    }
  }, [initContractState]);

  return {
    activeLandsLoading: loading,
    activeLands,
    selectedContractState,
    setSelectedContractState,
  };
};
