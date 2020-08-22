import React from 'react';
import { useMutation, useQuery } from 'urql';

import InsertContentStar from '~/mutations/InsertContentStar';
import InsertContentPollVote from '~/mutations/InsertContentPollVote';
import ContentTile from '~/components/ContentTile';

function ContentTileContainer({
  poll,
  ...props
}) {
  const [
    insertPollVoteResult,
    insertPollVote,
  ] = useMutation(InsertContentPollVote);
  const [
    insertStarResult,
    insertStar,
  ] = useMutation(InsertContentStar);

  function handlePollOptionSelect({ uuid }) {
    insertPollVote({
      content_partial_poll_uuid: poll.uuid,
      poll_option_uuid: uuid,
    }, {
      additionalTypenames: ['content_partial_poll'],
    });
  }

  function handleStar({ amount }) {
    insertStar({ amount });
  }

  return (
    <ContentTile
      poll={poll}
      onPollOptionSelect={handlePollOptionSelect}
      onStar={handleStar}
      {...props}
    />
  );
}

export default ContentTileContainer;
