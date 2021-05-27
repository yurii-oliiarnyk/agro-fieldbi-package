import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import AppLink from '../../../UI/AppLink';

const CommentFormButtons = props => {
  const { onCancelHandler, submitLoading, actionButtonTitle, onSubmitHandler } = props;

  return (
    <AppLink.Group
      style={{
        marginTop: 12
      }}
    >
      <AppLink loading={submitLoading} onPress={onSubmitHandler}>
        {actionButtonTitle}
      </AppLink>
      <AppLink onPress={onCancelHandler}>{i18n.t('comments.cancel')}</AppLink>
    </AppLink.Group>
  );
};

CommentFormButtons.defaultProps = {
  actionButtonTitle: i18n.t('comments.action')
};

CommentFormButtons.propTypes = {
  onCancelHandler: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  actionButtonTitle: PropTypes.element,
  submitLoading: PropTypes.bool
};

export default CommentFormButtons;
