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
import MemberAccessRequestTable from '~/components/MemberAccessRequestTable';
import mapNetworkMembershipRequest from '~/shared/mappings/mapNetworkMembershipRequest';
import mapUser from '~/shared/mappings/mapUser';

function MemberAccessRequestTableContainer({
  networkId,
  network,
}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [isInsertModalActive, setIsInsertModalActive] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [getNetworkMembershipRequests] = useQuery({
    query: GetNetworkMembershipRequests,
    variables: {
      network_id: networkId,
    },
    pause: !networkId,
  });
  const [
    deleteMembershipRequestResult, 
    deleteMembershipRequest,
  ] = useMutation(DeleteNetworkMembershipRequest);
  const [
    insertNetworkMemberResult,
    insertNetworkMember,
  ] = useMutation(InsertNetworkMember);

  const {
    data,
    fetching: isFetching,
  } = getNetworkMembershipRequests;

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_membership_request
      .map(mapNetworkMembershipRequest)
  }

  function handleInsert({ selectedItem }) {
    insertNetworkMember({
      network_uuid: network.uuid,
      user_uuid: selectedItem.user.uuid,
    }).then(() => {
      deleteMembershipRequest({
        uuid: selectedItem.uuid,
      });
      setIsInsertModalActive(false);
    });
  }

  function handleDelete({ selectedItem }) {
    deleteMembershipRequest({ uuid: selectedItem.uuid });
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
            isFetching={insertNetworkMemberResult.fetching}
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
            isFetching={deleteMembershipRequest.fetching}
            onSubmit={() => handleDelete({ selectedItem })}
            onCancel={() => setIsDeleteModalActive(false)}
          />
        </ModalPortal>
      }

      <MemberAccessRequestTable
        items={items}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    </>
  );
}

export default MemberAccessRequestTableContainer;
