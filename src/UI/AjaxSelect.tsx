import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Select, ValueType, OptionType } from './Select';

type AjaxSelectType = {
  apiUrl: string;
  id?: ValueType;
  value?: ValueType;
  placeholder: string;
  onValueChange: (value: ValueType) => void;
  emptyLabel?: string;
  loadingLabel?: string;
  transformedOptionsHandler?: (options: OptionType[]) => OptionType[];
};

export const AjaxSelect: React.FC<AjaxSelectType> = props => {
  const { apiUrl, id, ...restProps } = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEntities = (API: string) => {
    setLoading(true);

    axios
      .get(API, { params: { limit: 100 } })
      .then(responce => {
        setOptions(responce.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setOptions([]);

    const isSpecificAPI = apiUrl.search(':id') !== -1;

    if (isSpecificAPI) {
      if (id) {
        const combinedAPI = apiUrl.replace(':id', `${id}`);
        loadEntities(combinedAPI);
      }
    } else {
      loadEntities(apiUrl);
    }
  }, [id, apiUrl]);

  return <Select loading={loading} disabled={loading} options={options} {...restProps} />;
};
