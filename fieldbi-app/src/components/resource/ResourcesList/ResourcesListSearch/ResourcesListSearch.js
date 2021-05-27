import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Searchbar } from 'react-native-paper';

import { searchResource } from '../../../../store/resource/resource';

const ResourcesListSearch = props => {
  const { placeholder, search, searchResource } = props;

  return (
    <Searchbar
      placeholder={placeholder}
      autoCapitalize="none"
      inputStyle={{ fontSize: 16 }}
      value={search}
      style={{ zIndex: 1, borderRadius: 0 }}
      onChangeText={searchResource}
    />
  );
};

ResourcesListSearch.propTypes = {
  placeholder: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  searchResource: PropTypes.func.isRequired
};

export default connect(
  (state, { name }) => {
    return {
      search: state[name].search
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        searchResource: searchResource(name)
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourcesListSearch);
