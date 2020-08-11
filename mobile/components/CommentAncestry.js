import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  GRAY,
  TREE_ROOT_ID,
} from '~/constants';
import Comment from '~/components/Comment';

function CommentAncestry({
  comment,
  commentsById,
  onAuthorPress = () => {},
  onViewReplies = () => {},
  onReply = () => {},
}) {
  const parentComment = (
    comment &&
    comment.parentId &&
    commentsById[comment.parentId]
  );

  return (
    <>
      {parentComment && parentComment.parentId &&
        <CommentAncestry
          comment={parentComment}
          commentsById={commentsById}
          onAuthorPress={onAuthorPress}
          onViewReplies={onViewReplies}
          onReply={onReply}
        />
      }

      {parentComment && parentComment.id !== TREE_ROOT_ID &&
        <View
          style={[
            styles.commentWrapper,
            styles.parentCommentWrapper,
          ]}
        >
          <Comment
            id={parentComment.id}
            author={parentComment.author}
            text={parentComment.text}
            children={parentComment.children}
            commentsById={commentsById}
            isParent={true}
            onAuthorPress={onAuthorPress}
            onViewReplies={onViewReplies}
            onReply={onReply}
          />
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    marginBottom: 20,
  },
  parentCommentWrapper: {
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
});

export default CommentAncestry;
