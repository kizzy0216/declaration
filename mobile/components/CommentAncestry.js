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
  onCreatorPress = () => {},
  onViewReplies = () => {},
  onReply = () => {},
}) {
  if (!comment) {
    return null;
  }

  const { ancestors } = comment;
  if (!ancestors || ancestors.length === 0) {
    return null;
  }

  return (
    <>
      {ancestors.map((ancestor) => (
        <View
          style={[
            styles.commentWrapper,
          ]}
          key={ancestor.uuid}
        >
          <Comment
            id={ancestor.uuid}
            creator={ancestor.creator}
            text={ancestor.text}
            createdAt={ancestor.createdAt}
            children={ancestor.children}
            commentsById={commentsById}
            isParent={true}
            onCreatorPress={onCreatorPress}
            onViewReplies={onViewReplies}
            onReply={onReply}
          />
          <View style={styles.verticalSeparator} />
        </View>
      ))}
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
