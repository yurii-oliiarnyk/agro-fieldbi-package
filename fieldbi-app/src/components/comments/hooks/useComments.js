import { useState } from 'react';
import axios from '../../../axios/axios';

const COMMENTS_LIMIT = 3;

const useComments = (url, entityData) => {
  const [state, setState] = useState({ comments: [], total: 0 });

  const fetchComments = () => {
    return axios
      .get(url, {
        params: {
          limit: COMMENTS_LIMIT,
          offset: state.comments.length
        }
      })
      .then(response => {
        const comments = response.data.data;
        const { count } = response.data.pagination;

        setState(state => ({
          ...state,
          total: count,
          comments: [...comments.reverse(), ...state.comments]
        }));
      });
  };

  const load = () => fetchComments();
  const loadMore = () => fetchComments();

  const remove = id => {
    return axios.delete(`/api/v1/comments/${id}`).then(() => {
      setState(state => ({
        ...state,
        total: state.total - 1,
        comments: state.comments.filter(comment => comment.id !== id)
      }));
    });
  };

  const update = (id, description) => {
    return axios.put(`/api/v1/comments/${id}`, { description, ...entityData }).then(response => {
      const updatedComment = response.data.data;

      setState(state => ({
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          }

          return comment;
        })
      }));
    });
  };

  const create = description => {
    return axios.post('/api/v1/comments', { description, ...entityData }).then(response => {
      const comment = response.data.data;

      setState(state => ({
        ...state,
        total: state.total + 1,
        comments: [...state.comments, comment]
      }));
    });
  };

  return {
    load,
    loadMore,
    comments: state.comments,
    total: state.total,
    create,
    remove,
    update
  };
};

export default useComments;
