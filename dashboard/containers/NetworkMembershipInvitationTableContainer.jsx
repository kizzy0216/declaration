import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import dynamic from 'next/dynamic';

const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import NetworkMembershipInvitationTable from '~/components/NetworkMembershipInvitationTable';
import DoubleConfirmModal from '~/shared/components/DoubleConfirmModal';
import InviteMemberModal from '~/components/InviteMemberModal';
import Button from '~/shared/components/Button';
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
    }).then(() => setIsInviteMemberModalActive(false));
  }

  function handleRevoke({ item }) {
    setSelectedItem(item);
  }

  return (
    <>
      {isInviteMemberModalActive &&
        <ModalPortal
          onClose={() => setIsInviteMemberModalActive(false)}
        >
          <InviteMemberModal
            onSubmit={handleInsert}
            onCancel={() => setIsInviteMemberModalActive(false)}
            isFetching={insertInvitationResult.fetching}
          />
        </ModalPortal>
      }

      {isRevokeModalActive &&
        <ModalPortal
          onClose={() => setIsRevokeModalActive(false)}
        >
          <DoubleConfirmModal
            heading={`Are you sure you want to revoke this membership invitation for ${selectedItem.name || selectedItem.email}?`}
            submitLabel="Yes, revoke"
            cancelLabel="No, cancel"
          />
        </ModalPortal>
      }

      <NetworkMembershipInvitationTable
        items={items}
        action={
          <Button
            label="Invite new Member"
            onClick={() => setIsInviteMemberModalActive(true)}
          />
        }
        onRevoke={handleRevoke}
      />
    </>
  );
}

export default NetworkMembershipInvitationTableContainer;
