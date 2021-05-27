import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import AppLink from '../../../UI/AppLink';

const CommentItemLinks = props => {
  const { onEditHandler, onDeleteHandler } = props;

  return (
    <AppLink.Group style={{ marginTop: 8 }}>
      <AppLink onPress={onEditHandler}>{i18n.t('generals.edit')}</AppLink>
      <AppLink onPress={onDeleteHandler}>{i18n.t('generals.delete')}</AppLink>
    </AppLink.Group>
  );
};

CommentItemLinks.propTypes = {
  onDeleteHandler: PropTypes.func.isRequired,
  onEditHandler: PropTypes.func.isRequired
};

export default CommentItemLinks;
