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
        <>
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
          <View style={styles.verticalSeparator} />
          </View>

        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  verticalSeparator: {
    height: 20,
    width: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: GRAY,
  },
});

export default CommentAncestry;
