import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import dynamic from 'next/dynamic';

const MOBILE_BASE_URL = process.env.MOBILE_BASE_URL;

const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import NetworkMembershipInvitationTable from '~/components/NetworkMembershipInvitationTable';
import DoubleConfirmModal from '~/shared/components/DoubleConfirmModal';
import InviteMemberModal from '~/components/InviteMemberModal';
import GetNetworkMembershipInvitations from '~/queries/GetNetworkMembershipInvitations';
import InsertNetworkMembershipInvitation from '~/mutations/InsertNetworkMembershipInvitation';
import DeleteNetworkMembershipInvitation from '~/mutations/DeleteNetworkMembershipInvitation';
import mapNetworkMembershipInvitation from '~/shared/mappings/mapNetworkMembershipInvitation';

function NetworkMembershipInvitationTableContainer({
  networkId,
  network,
}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [isInviteMemberModalActive, setIsInviteMemberModalActive] = useState(false);
  const [isRevokeModalActive, setIsRevokeModalActive] = useState(false);
  const [getInvitations] = useQuery({
    query: GetNetworkMembershipInvitations,
    variables: {
      network_id: networkId,
    },
    pause: !networkId
  });
  const [
    insertInvitationResult,
    insertInvitation,
  ] = useMutation(InsertNetworkMembershipInvitation);
  const [
    deleteInvitationResult,
    deleteInvitation,
  ] = useMutation(DeleteNetworkMembershipInvitation);

  const {
    data,
    fetching: isFetching,
  } = getInvitations;

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_membership_invitation
      .map(mapNetworkMembershipInvitation)
  }

  function handleInsert({
    name,
    email,
  }) {
    insertInvitation({
      network_uuid: network.uuid,
      user_name: name,
      user_email: email,
      redirect: `${MOBILE_BASE_URL}/accept-invitation`,
    }).then(() => setIsInviteMemberModalActive(false));
  }

  function handleDelete({ item }) {
    deleteInvitation({
      uuid: item.uuid,
    });
    setIsRevokeModalActive(false);
  }

  function handleRevoke({ item }) {
    setSelectedItem(item);
    setIsRevokeModalActive(true);
  }

  return (
    <>
      {isInviteMemberModalActive &&
        <ModalPortal
          onClose={() => setIsInviteMemberModalActive(false)}
        >
          <InviteMemberModal
            isFetching={insertInvitationResult.fetching}
            onSubmit={handleInsert}
            onCancel={() => setIsInviteMemberModalActive(false)}
          />
        </ModalPortal>
      }

      {isRevokeModalActive &&
        <ModalPortal
          onClose={() => setIsRevokeModalActive(false)}
        >
          <DoubleConfirmModal
            heading="Decline member invitation"
            description={`Are you sure you want to decline this membership invitation for\n ${selectedItem.user.name || selectedItem.user.email}?`}
            submitLabel="Yes, decline"
            isFetching={deleteInvitationResult.fetching}
            onSubmit={() => handleDelete({ item: selectedItem })}
            onCancel={() => setIsRevokeModalActive(false)}
          />
        </ModalPortal>
      }

      {items.length !== 0 &&
        <NetworkMembershipInvitationTable
          items={items}
          // action={
          //   <Button
          //     label="Invite new Member"
          //     onClick={() => setIsInviteMemberModalActive(true)}
          //   />
          // }
          onDecline={handleRevoke}
        />
      }
    </>
  );
}

export default NetworkMembershipInvitationTableContainer;
