import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import dynamic from 'next/dynamic';

import GetNetworkAccessRequests from '~/queries/GetNetworkAccessRequests';
import DeleteNetworkAccessRequest from '~/mutations/DeleteNetworkAccessRequest';
import InsertNetworkWithUser from '~/mutations/InsertNetworkWithUser';
import CreateNetworkModal from '~/components/CreateNetworkModal';
import DoubleConfirmModal from '~/shared/components/DoubleConfirmModal';
import Button from '~/shared/components/Button';
import NetworkAccessRequestTable from '~/components/NetworkAccessRequestTable';
const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import {
  NETWORK_ADMIN_ROLE,
} from '~/shared/constants';

function NetworkAccessRequestTableContainer() {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [getNetworkAccessRequestsResult] = useQuery({
    query: GetNetworkAccessRequests,
  });
  const [
    deleteAccessRequestResult, 
    deleteAccessRequest,
  ] = useMutation(DeleteNetworkAccessRequest);
  const [
    insertNetworkWithUserResult,
    insertNetworkWithUser,
  ] = useMutation(InsertNetworkWithUser);

  const {
    data,
    fetching: isFetching,
  } = getNetworkAccessRequestsResult;

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_access_request
      .map(({
        uuid,
        requester_name,
        requester_email,
        community_name,
        body,
        user_count_range,
      }) => ({
        id: uuid,
        user: {
          name: requester_name,
          email: requester_email,
        },
        networkName: community_name,
        body,
        userCountRange: user_count_range
          .replace(/\[/g, '')
          .replace(/\)/g, '')
          .split(',')
          .map((numberString) => {
            if (numberString[numberString.length - 1] === '1') {
              return Number(Number(numberString) - 1).toLocaleString();
            }

            return Number(numberString).toLocaleString();
          })
          .join(' - ')
      }));
  }

  function handleCreate({
    name,
    email,
    accessRequestId,
  }) {
    insertNetworkWithUser({
      network_name: name,
      user_email: email,
      user_role: NETWORK_ADMIN_ROLE,
    }).then(() => {
      if (accessRequestId) {
        deleteAccessRequest({
          uuid: accessRequestId,
        });
      }
      setIsCreateModalActive(false);
    });
  }

  function handleDelete({ id }) {
    deleteAccessRequest({ uuid: id });
    setIsDeleteModalActive(false);
  }

  function handleAccept({ id }) {
    // TODO replace with hashmap lookup
    const selectedNetwork = items.find(({ id: itemId }) => itemId === id);
    setSelectedNetwork(selectedNetwork);
    setIsCreateModalActive(true);
  }

  function handleDecline ({ id }) {
    // TODO replace with hashmap lookup
    const selectedNetwork = items.find(({ id: itemId }) => itemId === id);
    setSelectedNetwork(selectedNetwork);
    setIsDeleteModalActive(true);
  }

  return (
    <>
      {isCreateModalActive &&
        <ModalPortal
          onClose={() => setIsCreateModalActive(false)}
        >
          <CreateNetworkModal
            initialValues={{
              name: selectedNetwork.networkName,
              email: selectedNetwork.user.email,
            }}
            accessRequestId={selectedNetwork.id}
            isFetching={insertNetworkWithUserResult.fetching}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateModalActive(false)}
          />
        </ModalPortal>
      }
      
      {isDeleteModalActive &&
        <ModalPortal
          onClose={() => setIsDeleteModalActive(false)}
        >
          <DoubleConfirmModal
            heading={`Are you sure you want to decline this access request for ${selectedNetwork.networkName}?`}
            submitLabel="Yes, decline"
            isFetching={deleteAccessRequestResult.fetching}
            onSubmit={() => handleDelete({ id: selectedNetwork.id })}
            onCancel={() => setIsDeleteModalActive(false)}
          />
        </ModalPortal>
      }

      <NetworkAccessRequestTable
        items={items}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}

export default NetworkAccessRequestTableContainer;
