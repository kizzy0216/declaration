import React, { useContext } from 'react';
import { useQuery } from 'urql';

import ContentTilePager from '~/components/ContentTilePager';
import { ContentTilePagerContextProvider } from '~/contexts/ContentTilePagerContext';
import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import GetNetworkContent from '~/queries/GetNetworkContent';
import mapContent from '@shared/mappings/mapContent';

function ContentTilePagerContainer() {
  const { user: authenticatedUser } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const [
    getContentResult,
    getContent,
  ] = useQuery({
    query: GetNetworkContent,
    variables: {
      network_uuid: activeNetwork.uuid,
      viewer_uuid: authenticatedUser.uuid,
    },
    pause: !activeNetwork || !authenticatedUser,
  });

  let items = [];
  if (getContentResult.data && !getContentResult.fetching) {
    items = getContentResult
      .data
      .content
      .map(mapContent);
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <ContentTilePagerContextProvider>
      <ContentTilePager
        items={items}
      />
    </ContentTilePagerContextProvider>
  );
}

export default ContentTilePagerContainer;
