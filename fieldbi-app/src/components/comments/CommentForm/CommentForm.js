import React, { useState, useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import CommentFormButtons from './CommentFormButtons';
import { COLORS } from '../../../constants';

const addHtmlTag = message => `<p>${message}</p>`;

const CommentForm = props => {
  const { onCancelHandler, onSubmitHandler, submitLoading, actionButtonTitle, description } = props;
  const inputRef = useRef();

  const [value, setValue] = useState(description || '');

  useEffect(() => {
    if (inputRef?.current?.focus) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <TextInput
        onChangeText={setValue}
        ref={inputRef}
        value={value}
        style={{
          minHeight: 64,
          borderColor: COLORS.GREY,
          borderWidth: 1,
          borderRadius: 4,
          paddingLeft: 12,
          paddingTop: 4,
          paddingBottom: 4,
          color: COLORS.BLACK
        }}
        placeholderTextColor={COLORS.GREY}
        multiline
        numberOfLines={3}
      />
      <CommentFormButtons
        onSubmitHandler={() => onSubmitHandler(addHtmlTag(value))}
        onCancelHandler={onCancelHandler}
        submitLoading={submitLoading}
        actionButtonTitle={actionButtonTitle}
      />
    </>
  );
};

CommentForm.propTypes = {
  description: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
  actionButtonTitle: PropTypes.element,
  autoFocus: PropTypes.bool,
  submitLoading: PropTypes.bool,
  fitToHeight: PropTypes.bool
};

export default CommentForm;
