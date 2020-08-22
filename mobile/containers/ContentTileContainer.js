import React, { useContext } from 'react';
import { useMutation, useQuery } from 'urql';

import { UserContext } from '~/contexts/UserContext';
import InsertContentStar from '~/mutations/InsertContentStar';
import InsertContentPollVote from '~/mutations/InsertContentPollVote';
import DeleteContentStar from '~/mutations/DeleteContentStar';
import ContentTile from '~/components/ContentTile';

function ContentTileContainer({
  uuid: contentUuid,
  poll,
  starsByAstronomerUuid = {},
  ...props
}) {
  const { user: authenticatedUser } = useContext(UserContext);
  const [
    insertPollVoteResult,
    insertPollVote,
  ] = useMutation(InsertContentPollVote);
  const [
    insertStarResult,
    insertStar,
  ] = useMutation(InsertContentStar);
  const [
    deleteStarResult,
    deleteStar,
  ] = useMutation(DeleteContentStar);

  const isStarred = (
    starsByAstronomerUuid[authenticatedUser.uuid] &&
    starsByAstronomerUuid[authenticatedUser.uuid].amount &&
    starsByAstronomerUuid[authenticatedUser.uuid].amount > 0
  );

  function handlePollOptionSelect({ uuid }) {
    insertPollVote({
      content_partial_poll_uuid: poll.uuid,
      poll_option_uuid: uuid,
    }, {
      additionalTypenames: ['content_partial_poll'],
    });
  }

  function handleStar({ amount }) {
    insertStar({
      amount,
      content_uuid: contentUuid,
    });
  }

  function handleUnStar() {
    deleteStar({
      content_uuid: contentUuid,
      astronomer_uuid: authenticatedUser.uuid,
    });
  }

  return (
    <ContentTile
      uuid={contentUuid}
      poll={poll}
      isStarred={isStarred}
      onPollOptionSelect={handlePollOptionSelect}
      onStar={handleStar}
      onUnStar={handleUnStar}
      {...props}
    />
  );
}

export default ContentTileContainer;
