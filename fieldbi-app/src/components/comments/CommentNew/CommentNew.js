import React, { useState } from 'react';
import { Text } from 'react-native';
import i18n from 'i18n-js';
import CommentItemLayout from '../CommentItem/CommentItemLayout';
import CommentForm from '../CommentForm';
import { useUser } from '../../../hooks';
import { COLORS } from '../../../constants';
import AppTouchableFeedback from '../../AppTouchableFeedback';

const CommentNew = props => {
  const { create } = props;

  const [inputMode, setInputMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUser();

  const onCreateHandler = description => {
    setLoading(true);

    create(description)
      .then(() => setInputMode(false))
      .finally(() => setLoading(false));
  };

  return (
    <CommentItemLayout user={currentUser}>
      {!inputMode && (
        <AppTouchableFeedback
          style={{
            minHeight: 32,
            borderColor: COLORS.GREY,
            borderWidth: 1,
            borderRadius: 4,
            paddingLeft: 12,
            justifyContent: 'center'
          }}
          onPress={() => setInputMode(true)}
        >
          <Text style={{ color: COLORS.GREY }}>{i18n.t('comments.new')}</Text>
        </AppTouchableFeedback>
      )}

      {inputMode && (
        <CommentForm
          submitLoading={loading}
          onCancelHandler={() => setInputMode(false)}
          onSubmitHandler={onCreateHandler}
        />
      )}
    </CommentItemLayout>
  );
};

export default CommentNew;
