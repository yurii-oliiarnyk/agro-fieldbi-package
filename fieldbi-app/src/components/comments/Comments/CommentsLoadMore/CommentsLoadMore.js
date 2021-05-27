import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import AppLink from '../../../UI/AppLink';

const CommentsLoadMore = props => {
  const { loading, onClickHandler } = props;

  return (
    <View style={{ marginBottom: 24 }}>
      <AppLink type="primary" onPress={onClickHandler} loading={loading}>
        {i18n.t('comments.showPrevious')}
      </AppLink>
    </View>
  );
};

CommentsLoadMore.propTypes = {
  loading: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired
};

export default CommentsLoadMore;
