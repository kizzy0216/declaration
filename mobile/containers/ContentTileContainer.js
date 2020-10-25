import React, {
  useContext,
  useState,
  useCallback,
} from 'react';
import { useMutation, useQuery } from 'urql';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '~/contexts/UserContext';
import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
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
  const navigation = useNavigation();
  const { user: authenticatedUser } = useContext(UserContext);
  const { reRender } = useContext(ContentTilePagerContext);
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
  const [isStarred, setIsStarred] = useState(
    starsByAstronomerUuid[authenticatedUser.uuid] &&
    starsByAstronomerUuid[authenticatedUser.uuid].amount &&
    starsByAstronomerUuid[authenticatedUser.uuid].amount > 0
  );

  const handlePollOptionSelect = useCallback(({ uuid }) => {
    insertPollVote({
      content_partial_poll_uuid: poll.uuid,
      poll_option_uuid: uuid,
    }, {
      additionalTypenames: ['content_partial_poll'],
    });
  }, [insertPollVote]);

  const handleStar = useCallback(({ amount }) => {
    setIsStarred(true);

    insertStar({
      amount,
      content_uuid: contentUuid,
    });
  }, [insertStar]);

  const handleUnStar = useCallback(() => {
    setIsStarred(false);

    deleteStar({
      content_uuid: contentUuid,
      astronomer_uuid: authenticatedUser.uuid,
    });
  }, [deleteStar]);

  const handleCreatorPress = useCallback(({ uuid }) => {
    if (uuid === authenticatedUser.uuid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Member', { uuid });
    }
  }, []);

  return (
      <ContentTile
        uuid={contentUuid}
        poll={poll}
        isStarred={isStarred}
        onPollOptionSelect={handlePollOptionSelect}
        onStar={handleStar}
        onUnStar={handleUnStar}
        onCreatorPress={handleCreatorPress}
        {...props}
      />
  );
}

export default ContentTileContainer;
