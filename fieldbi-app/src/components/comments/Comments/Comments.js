import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import CommentItem from '../CommentItem';
import AppLoader from '../../AppLoader';
import CommentNew from '../CommentNew';
import useComments from '../hooks/useComments';
import CommentsLoadMore from './CommentsLoadMore';

const Comments = props => {
  const { url, entityData } = props;

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { load, loadMore, comments, total, create, remove, update } = useComments(url, entityData);

  const loadHandler = () => {
    setLoading(true);
    load().finally(() => setLoading(false));
  };

  const loadMoreHandler = () => {
    setLoadingMore(true);
    loadMore().finally(() => setLoadingMore(false));
  };

  useEffect(() => {
    loadHandler();
  }, []);

  useEffect(() => {
    if (comments.length === 0 && total !== 0) {
      loadHandler();
    }
  }, [comments.length]);

  const showLoadMore = total !== comments.length;

  return (
    <View
      style={{
        borderTopColor: 'rgba(240, 240, 240, 0.5)',
        borderTopWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 24
      }}
    >
      {loading && <AppLoader />}
      {!loading && (
        <>
          {showLoadMore && (
            <CommentsLoadMore loading={loadingMore} onClickHandler={loadMoreHandler} />
          )}
          {comments.map(comment => (
            <CommentItem key={comment.id} {...comment} update={update} remove={remove} />
          ))}
          <CommentNew create={create} />
        </>
      )}
    </View>
  );
};

export default Comments;
