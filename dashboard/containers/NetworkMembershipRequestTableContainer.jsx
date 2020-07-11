import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  useQuery,
  useMutation,
} from 'urql';

import InsertNetworkMember from '~/mutations/InsertNetworkMember';
import DeleteNetworkMembershipRequest from '~/mutations/DeleteNetworkMembershipRequest';
import GetNetworkMembershipRequests from '~/queries/GetNetworkMembershipRequests';
const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import DoubleConfirmModal from '~/shared/components/DoubleConfirmModal';
import NetworkMembershipRequestTable from '~/components/NetworkMembershipRequestTable';
import mapNetworkMembershipRequest from '~/shared/mappings/mapNetworkMembershipRequest';
import mapUser from '~/shared/mappings/mapUser';

function NetworkMembershipRequestTableContainer({
  networkId,
  network,
}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [isInsertModalActive, setIsInsertModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [getRequests] = useQuery({
    query: GetNetworkMembershipRequests,
    variables: {
      network_id: networkId,
    },
    pause: !networkId,
  });
  const [
    deleteRequestResult, 
    deleteRequest,
  ] = useMutation(DeleteNetworkMembershipRequest);
  const [
    insertMemberResult,
    insertMember,
  ] = useMutation(InsertNetworkMember);

  const {
    data,
    fetching: isFetching,
  } = getRequests;

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_membership_request
      .map(mapNetworkMembershipRequest)
  }

  function handleInsert({ selectedItem }) {
    insertMember({
      network_uuid: network.uuid,
      user_uuid: selectedItem.user.uuid,
    }).then(() => {
      deleteRequest({
        uuid: selectedItem.uuid,
      });
      setIsInsertModalActive(false);
    });
  }

  function handleDelete({ selectedItem }) {
    deleteRequest({ uuid: selectedItem.uuid });
    setIsDeleteModalActive(false);
  }

  function handleAccept({ item }) {
    setSelectedItem(item);
    setIsInsertModalActive(true);
  }

  function handleDecline ({ item }) {
    setSelectedItem(item);
    setIsDeleteModalActive(true);
  }

  return (
    <>
      {isInsertModalActive &&
        <ModalPortal
          onClose={() => setIsInsertModalActive(false)}
        >
          <DoubleConfirmModal
            heading={
              `Are you sure you want to accept this membership request from ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, accept"
            isFetching={insertMemberResult.fetching}
            onSubmit={() => handleInsert({ selectedItem })}
            onCancel={() => setIsInsertModalActive(false)}
          />
        </ModalPortal>
      }
      
      {isDeleteModalActive &&
        <ModalPortal
          onClose={() => setIsDeleteModalActive(false)}
        >
          <DoubleConfirmModal
            heading={
              `Are you sure you want to decline this membership request from ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, decline"
            isFetching={deleteRequestResult.fetching}
            onSubmit={() => handleDelete({ selectedItem })}
            onCancel={() => setIsDeleteModalActive(false)}
          />
        </ModalPortal>
      }

      <NetworkMembershipRequestTable
        items={items}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}

export default NetworkMembershipRequestTableContainer;
