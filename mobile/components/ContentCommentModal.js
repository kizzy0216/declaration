// my brain broke with this one
// sometimes im reference a comment tree node (with parentId, id, children only),
// sometimes im referencing a comment (with parentId, id, text, author, etc).
// TODO clean up
import React, {
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Comment from '~/components/Comment';
import CommentAncestry from '~/components/CommentAncestry';
import Modal from '~/components/Modal';
import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
import {
  WINDOW_HEIGHT,
  GRAY,
  LIGHT_GRAY,
  TREE_ROOT_ID,
} from '~/constants';

const find = ({ node, id }) => {
  if (node.id === id) {
    return node;
  }

  return (node.children || [])
    .reduce((accumulator, node) => {
      if (!accumulator) {
        accumulator = find({ node, id });
      }
      return accumulator;
    }, undefined);
}

function ContentCommentModal({
  content,
  isVisible,
  onClose = () => {},
}) {
  const [active, setActive] = useState();

  useEffect(() => {
    setActive(content.commentTree);
  }, [content]);

  function handleBack() {
    const { parentId } = active;

    const parent = find({
      node: content.commentTree,
      id: parentId,
    });

    setActive(parent);
  }

  function handleAuthorPress() {
  }

  function handleViewReplies({ id }) {
    let comment = find({
      node: active,
      id,
    });

    if (!comment) {
      comment = find({
        node: content.commentTree,
        id,
      });
    }

    setActive(comment);
  }

  function handleReply() {
  }

  function handleClose() {
    setActive(content.commentTree);
    onClose();
  }

  if (!content.commentTree) {
    return null;
  }

  const activeComment = (
    active &&
    active.id &&
    content.commentsById[active.id]
  );

  const isActiveRoot = (
    active &&
    active.id &&
    active.id === TREE_ROOT_ID
  );

  const count = (
    (active && active.children)
      ? active.children.length
      : 0
  );

  const heading = `${count} ${(isActiveRoot ? 'Comments' : 'Replies')}`;

  return (
    <Modal
      header={
        <ScreenHeader
          leftElement={
            active && active.parentId ? (
              <TouchableOpacity onPress={handleBack}>
                <ArrowLeftIcon
                  width={22}
                  height={22}
                  fill="black"
                />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
          heading={heading}
          onClose={handleClose}
        />
      }
      isVisible={isVisible}
      onClose={handleClose}
      containerStyle={{
        backgroundColor: LIGHT_GRAY,
      }}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback>
            <View>
              <CommentAncestry
                comment={activeComment}
                commentsById={content.commentsById}
                onAuthorPress={handleAuthorPress}
                onViewReplies={handleViewReplies}
                onReply={handleReply}
              />

              {active && !isActiveRoot &&
                <View
                  style={[
                    styles.commentWrapper,
                    styles.activeCommentWrapper,
                  ]}
                >
                  <Comment
                    id={active.id}
                    author={activeComment.author}
                    text={activeComment.text}
                    children={[]}
                    commentsById={content.commentsById}
                    isActive={true}
                    onAuthorPress={handleAuthorPress}
                    onViewReplies={handleViewReplies}
                    onReply={handleReply}
                  />
                </View>
              }

              {active && active.children.map(child => (
                <View
                  key={child.id}
                  style={styles.commentWrapper}
                >
                  <Comment
                    id={child.id}
                    author={content.commentsById[child.id].author}
                    text={content.commentsById[child.id].text}
                    children={child.children}
                    commentsById={content.commentsById}
                    onAuthorPress={handleAuthorPress}
                    onViewReplies={handleViewReplies}
                    onReply={handleReply}
                  />
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: WINDOW_HEIGHT * 0.75,
    backgroundColor: LIGHT_GRAY,
  },
  commentWrapper: {
    marginBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  activeCommentWrapper: {
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
    paddingBottom: 30,
    marginBottom: 30,
  },
});

export default ContentCommentModal;
