// my brain broke with this one
// sometimes im reference a comment tree node (with parentId, id, children only),
// sometimes im referencing a comment (with parentId, id, text, creator, etc).
// TODO clean up
import React, {
  useState,
  useEffect,
  useRef,
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

import KeyboardSpacer from '~/components/KeyboardSpacer';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Comment from '~/components/Comment';
import CommentAncestry from '~/components/CommentAncestry';
import Modal from '~/components/Modal';
import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
import {
  WINDOW_HEIGHT,
  GRAY,
  LIGHT_GRAY,
} from '~/constants';

function ContentCommentModal({
  content,
  activeComment,
  commentsById = {},
  commentTree,
  countComments = 0,
  isVisible,
  isFetchingItems = false,
  isFetchingInsert = false,
  isActiveRoot = false,
  onSubmit = () => {},
  onCreatorPress = () => {},
  onBack = () => {},
  onViewReplies = () => {},
  onClose = () => {},
}) {
  const textInputRef = useRef();
  const [reply, setReply] = useState('');

  function handleSubmit() {
    onSubmit({
      text: reply,
    });
    setReply('');
  }

  function handleReply(params) {
    onViewReplies(params);
    textInputRef.current.focus();
  }

  const heading = `${countComments} ${(isActiveRoot ? 'Comments' : 'Replies')}`;

  return (
    <Modal
      header={
        <ScreenHeader
          leftElement={
            commentTree && commentTree.parentId ? (
              <TouchableOpacity onPress={onBack}>
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
          onClose={onClose}
        />
      }
      isVisible={isVisible}
      containerStyle={{
        backgroundColor: LIGHT_GRAY,
      }}
      shouldAvoidKeyboard={false}
      onClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="never"
        >
          <TouchableWithoutFeedback>
            <View>
              <CommentAncestry
                comment={activeComment}
                commentsById={commentsById}
                onCreatorPress={onCreatorPress}
                onViewReplies={onViewReplies}
                onReply={handleReply}
              />

              {activeComment && !isActiveRoot &&
                <View
                  style={[
                    styles.commentWrapper,
                    styles.activeCommentWrapper,
                  ]}
                >
                  <Comment
                    id={activeComment.uuid}
                    creator={activeComment.creator}
                    text={activeComment.text}
                    createdAt={activeComment.createdAt}
                    children={[]}
                    commentsById={commentsById}
                    isActive={true}
                    canReply={false}
                    onCreatorPress={onCreatorPress}
                    onViewReplies={onViewReplies}
                    onReply={handleReply}
                  />
                </View>
              }

              {commentTree && commentTree.children.map(child => (
                <View
                  key={child.id}
                  style={styles.commentWrapper}
                >
                  <Comment
                    id={child.id}
                    creator={commentsById[child.id].creator}
                    text={commentsById[child.id].text}
                    createdAt={commentsById[child.id].createdAt}
                    children={child.children}
                    commentsById={commentsById}
                    onCreatorPress={onCreatorPress}
                    onViewReplies={onViewReplies}
                    onReply={handleReply}
                  />
                </View>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <View style={styles.inputFooter}>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={textInputRef}
              placeholder="Add a comment"
              multiline={true}
              minHeight={30}
              maxHeight={100}
              value={reply}
              theme="secondary"
              onChange={setReply}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Reply"
              size="small"
              theme="transparent"
              isFetching={isFetchingInsert}
              onPress={handleSubmit}
            />
          </View>
        </View>

        <KeyboardSpacer />

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT * 0.8,
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
  inputFooter: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  buttonWrapper: {
    width: 100,
  }
});

export default ContentCommentModal;
