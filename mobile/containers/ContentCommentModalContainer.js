import React, {
  useContext,
  useState,
  useRef,
} from 'react';
import {
  Keyboard,
} from 'react-native';
import { useQuery, useMutation } from 'urql';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import ContentCommentModal from '~/components/ContentCommentModal';
import GetContentComments from '~/queries/GetContentComments';
import InsertContentComment from '~/mutations/InsertContentComment';
import {
  TREE_ROOT_ID,
} from '~/constants';
import mapComment from '@shared/mappings/mapComment';

const COMMENTS_BY_ID_INITIAL_STATE = {
  [TREE_ROOT_ID]: {
    id: TREE_ROOT_ID,
    text: '',
    parent: null,
    createdAt: new Date(),
  },
};
const COMMENT_TREE_INITIAL_STATE = {
  parentId: null,
  id: TREE_ROOT_ID,
  children: [],
};

const ContentCommentModalContainer = ({
  isVisible,
  onClose = () => {},
}) => {
  const navigation = useNavigation();
  const [activeCommentId, setActiveCommmentId] = useState(null);
  const { user: authenticatedUser } = useContext(UserContext);
  const {
    itemUuids: contentItemUuids,
    items: contentItems,
    activeIndex: activeContentIndex,
    getItems,
  } = useContext(ContentTilePagerContext);
  
  const contentUuid = contentItemUuids[activeContentIndex];
  const content = (
    contentUuid ? contentItems[contentUuid] : null
  );
  const commentsByIdRef = useRef(COMMENTS_BY_ID_INITIAL_STATE);
  const commentTreeRef = useRef(COMMENT_TREE_INITIAL_STATE);

  const [
    insertCommentResult,
    insertComment,
  ] = useMutation(InsertContentComment);
  const [
    getCommentsResult,
    getComments,
  ] = useQuery({
    query: GetContentComments,
    variables: {
      content_uuid: contentUuid,
      parent_comment_uuid: activeCommentId,
      parent_comment_is_null: activeCommentId ? false : true,
    },
    pause: !contentUuid || !isVisible,
  });

  const isActiveRoot = (commentTreeRef.current.id === TREE_ROOT_ID);
  const activeComment = commentsByIdRef.current[activeCommentId];

  if (getCommentsResult.data && !getCommentsResult.fetching) {
    const mappedComments = getCommentsResult
      .data
      .content_comment
      .map(({ comment }) => mapComment(comment));

    if (activeComment) {
      commentTreeRef.current.parentId = activeComment.parent ? activeComment.parent.uuid : TREE_ROOT_ID;
      commentTreeRef.current.id = activeComment.uuid;
    } else {
      commentTreeRef.current.parentId = null;
      commentTreeRef.current.id = TREE_ROOT_ID;
    }

    commentTreeRef.current.children = [
      ...mappedComments.map(({ uuid, parent, children }) => ({
        id: uuid,
        parentId: parent ? parent.uuid : null,
        children,
      }))
    ];

    mappedComments.forEach(({ uuid, ...comment }) => {
      commentsByIdRef.current[uuid] = {
        uuid,
        ...comment,
      };

      comment.children.forEach(({ uuid, ...childComment }) => {
        commentsByIdRef.current[uuid] = {
          uuid,
          ...childComment,
        };
      });
    });
  }

  function handleSubmit({
    text,
  }) {
    insertComment({
      text,
      content_uuid: contentUuid,
      parent_comment_uuid: activeCommentId,
      ancestors: activeCommentId ? ([
        { ancestor_uuid: activeCommentId },
        ...activeComment.ancestors.map(({ uuid }) => ({
          ancestor_uuid: uuid,
        })),
      ]) : [],
    }).then(() => {
      getItems()
      getComments({
        requestPolicy: 'cache-and-network',
      });
    });

    Keyboard.dismiss();
  }

  function handleBack() {
    const { parentId } = commentTreeRef.current;

    setActiveCommmentId(parentId === TREE_ROOT_ID ? null : parentId);
  }

  function handleViewReplies({ id }) {
    setActiveCommmentId(id);
  }

  function handleCreatorPress({ uuid }) {
    if (uuid === authenticatedUser.uuid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Member', { uuid });
    }

    handleClose();
  }

  function handleClose() {
    setActiveCommmentId(null);
    commentsByIdRef.current = COMMENTS_BY_ID_INITIAL_STATE;
    commentTreeRef.current = COMMENT_TREE_INITIAL_STATE;

    onClose();
  }

  function handleRefresh() {
    getComments({
      requestPolicy: 'cache-and-network',
    });
  }

  return (
    <ContentCommentModal
      content={content}
      activeComment={activeComment}
      commentsById={commentsByIdRef.current}
      commentTree={commentTreeRef.current}
      countComments={commentTreeRef.current.children.length}
      isVisible={isVisible}
      isFetchingItems={getCommentsResult.fetching}
      isFetchingInsert={insertCommentResult.fetching}
      isActiveRoot={isActiveRoot}
      onSubmit={handleSubmit}
      onCreatorPress={handleCreatorPress}
      onBack={handleBack}
      onViewReplies={handleViewReplies}
      onRefresh={handleRefresh}
      onClose={handleClose}
    />
  );
}

export default ContentCommentModalContainer;
