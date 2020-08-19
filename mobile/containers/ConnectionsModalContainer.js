import React, { useContext, useState } from 'react';
import { useQuery } from 'urql';

import { NetworkContext } from '~/contexts/NetworkContext';
import { UserContext } from '~/contexts/UserContext';
import ConnectionsModal from '~/components/ConnectionsModal';
import GetNetworkUserConnections from '~/queries/GetNetworkUserConnections';
import mapUser from '@shared/mappings/mapUser';

function ConnectionsModalContainer({
  initialSelected = [],
  isVisible,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [selected, setSelected] = useState([]);
  const { user: authenticatedUser } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const [
    getConnectionsResult,
    getConnections,
  ] = useQuery({
    query: GetNetworkUserConnections,
    variables: {
      user_uuid: authenticatedUser.uuid,
      network_uuid: activeNetwork.uuid,
    },
  });

  let itemsByUuid = {};
  let items = [];
  if (!getConnectionsResult.fetching && getConnectionsResult.data.network_user_relationship) {
    items = getConnectionsResult
      .data
      .network_user_relationship
      .map(({ to_user, from_user }) => {
        let mappedUser;
        if (to_user.uuid !== authenticatedUser.uuid) {
          mappedUser = mapUser(to_user);
        } else {
          mappedUser = mapUser(from_user);
        }

        itemsByUuid[mappedUser.uuid] = mappedUser;
        return mappedUser;
      })
  }

  function handleSubmit() {
    onClose();
    onSubmit({
      selected: selected.map(uuid => itemsByUuid[uuid]),
    });
  }

  return (
    <ConnectionsModal
      initialSelected={initialSelected}
      items={items}
      isVisible={isVisible}
      isFetching={getConnectionsResult.fetching}
      onClose={onClose}
      onSelect={setSelected}
      onSubmit={handleSubmit}
    />
  );
}

export default ConnectionsModalContainer;
