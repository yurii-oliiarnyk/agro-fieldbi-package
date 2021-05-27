import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppSelect from '../AppSelect';
import axios from '../../../axios/axios';

const AppAjaxSelect = props => {
  const { apiUrl, id, ...restProps } = props;

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // TODO: need show error if has

  const loadEntities = API => {
    setLoading(true);

    axios
      .get(API, { params: { limit: 100 } })
      .then(responce => {
        setOptions(responce.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setOptions([]);

    const isSpecificAPI = apiUrl.search(':id') !== -1;

    if (isSpecificAPI) {
      if (id) {
        const combinedAPI = apiUrl.replace(':id', id);
        loadEntities(combinedAPI);
      }
    } else {
      loadEntities(apiUrl);
    }
  }, [id]);

  return <AppSelect loading={loading} disabled={loading} options={options} {...restProps} />;
};

AppAjaxSelect.propTypes = {
  apiUrl: PropTypes.string.isRequired
};

export default AppAjaxSelect;
