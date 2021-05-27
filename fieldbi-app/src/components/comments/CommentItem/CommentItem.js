import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TIME_DATE_FORMAT } from '../../../config';
import { useUser } from '../../../hooks';
import AppHTMLViewer from '../../UI/AppHTMLViewer';
import CommentItemLinks from './CommentItemLinks';
import CommentItemLayout from './CommentItemLayout';
import CommentForm from '../CommentForm';

const CommentItem = props => {
  const { author, description, createdAt, id, update, remove } = props;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState();

  const { isCurrentUser } = useUser();
  const isCommentCreateByCurrentUser = isCurrentUser(author);

  const onDeleteHandler = () => remove(id);

  const onUpdateHandler = description => {
    setLoading(true);
    update(id, description)
      .then(() => setEditMode(false))
      .finally(() => setLoading(false));
  };

  const cleanHtml = html => html.replace(/<\/?[^>]+(>|$)/g, '');

  return (
    <View style={styles.item}>
      <CommentItemLayout user={author}>
        <View style={styles.header}>
          <View style={styles.nameView}>
            <Text style={styles.nameText} numberOfLines={1}>
              {author.name}
            </Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>{moment.unix(createdAt).format(TIME_DATE_FORMAT)}</Text>
          </View>
        </View>
        <View className="comment-item__body">
          {!editMode && (
            <>
              <AppHTMLViewer content={description} />
              {isCommentCreateByCurrentUser && (
                <CommentItemLinks
                  onEditHandler={() => setEditMode(true)}
                  onDeleteHandler={onDeleteHandler}
                />
              )}
            </>
          )}
          {editMode && (
            <CommentForm
              description={cleanHtml(description)}
              actionButtonTitle={i18n.t('comments.save')}
              onCancelHandler={() => setEditMode(false)}
              submitLoading={loading}
              onSubmitHandler={onUpdateHandler}
            />
          )}
        </View>
      </CommentItemLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 24
  },
  header: {
    minHeight: 32,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameView: {
    paddingRight: 16,
    flex: 1
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  dateView: {
    flexGrow: 0
  },
  dateText: {
    fontSize: 12,
    color: '#909090'
  }
});

CommentItem.propTypes = {
  author: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export default CommentItem;
