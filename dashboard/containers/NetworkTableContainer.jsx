import React, { useState} from 'react';
import { useQuery, useMutation } from 'urql';
import dynamic from 'next/dynamic';

import InsertNetworkWithUser from '~/mutations/InsertNetworkWithUser';
import GetNetworksWithAdmins from '~/queries/GetNetworksWithAdmins';
import Button from '~/shared/components/Button';
import NetworkTable from '~/components/NetworkTable';
import CreateNetworkModal from '~/components/CreateNetworkModal';
const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import {
  NETWORK_ADMIN_ROLE,
} from '~/shared/constants';

function NetworkTableContainer() {
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [getNetworksResult] = useQuery({
    query: GetNetworksWithAdmins,
  });
  const {
    data,
    fetching: isFetching,
  } = getNetworksResult;
  const [
    insertNetworkWithUserResult,
    insertNetworkWithUser,
  ] = useMutation(InsertNetworkWithUser);

  let items = [];
  if (!isFetching) {
    items = data
      .network
      .map(({
        uuid,
        name,
        network_users_aggregate,
        network_users,
      }) => ({
        id: uuid,
        name,
        userCount: network_users_aggregate.aggregate.count,
        admins: network_users.map(({
          user: {
            uuid,
            name,
            email,
          },
        }) => ({
          id: uuid,
          name,
          email,
        })),
        // TODO deal with more than 3 admins in a network
      }))
  }

  function handleCreate({
    name,
    email,
  }) {
    insertNetworkWithUser({
      network_name: name,
      user_email: email,
      user_role: NETWORK_ADMIN_ROLE,
    }).then(() => {
      setIsCreateModalActive(false);
    });
  }

  function handleCreateNew() {
    setIsCreateModalActive(true);
  }

  return (
    <>
      {isCreateModalActive &&
        <ModalPortal
          onClose={() => setIsCreateModalActive(false)}
        >
          <CreateNetworkModal
            isFetching={insertNetworkWithUserResult.fetching}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateModalActive(false)}
          />
        </ModalPortal>
      }

      <NetworkTable
        items={items}
        action={
          <Button
            label="Create new Network"
            onClick={handleCreateNew}
          />
        }
      />
    </>
  );
}

export default NetworkTableContainer;
