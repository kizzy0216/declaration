import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import dynamic from 'next/dynamic';

const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import MemberTable from '~/components/MemberTable';
import DoubleConfirmModal from '~/shared/components/DoubleConfirmModal';
import GetNetworkUsers from '~/queries/GetNetworkUsers';
import mapNetworkUser from '~/shared/mappings/mapNetworkUser';
import UpdateNetworkUserIsBlocked from '~/mutations/UpdateNetworkUserIsBlocked';
import UpdateNetworkUserRole from '~/mutations/UpdateNetworkUserRole';
import {
  MEMBER_ROLE,
  NETWORK_ADMIN_ROLE,
} from '~/shared/constants';

function MemberTableContainer({
  networkId,
}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [isBlockModalActive, setIsBlockModalActive] = useState(false);
  const [isUnblockModalActive, setIsUnblockModalActive] = useState(false);
  const [isPromoteModalActive, setIsPromoteModalActive] = useState(false);
  const [isDemoteModalActive, setIsDemoteModalActive] = useState(false);

  const [
    updateRoleResult,
    updateRole,
  ] = useMutation(UpdateNetworkUserRole);
  const [
    updateIsBlockedResult,
    updateIsBlocked,
  ] = useMutation(UpdateNetworkUserIsBlocked);
  const [getNetworkUsersResult] = useQuery({
    query: GetNetworkUsers,
    variables: {
      network_id: networkId,
    },
  });
  const {
    data,
    fetching: isFetching,
  } = getNetworkUsersResult;

  function handleBlock({ item }) {
    setSelectedItem(item);
    setIsBlockModalActive(true);
  }

  function handleUnblock({ item }) {
    setSelectedItem(item);
    setIsUnblockModalActive(true);
  }

  function handlePromote({ item }) {
    setSelectedItem(item);
    setIsPromoteModalActive(true);
  }

  function handleDemote({ item }) {
    setSelectedItem(item);
    setIsDemoteModalActive(true);
  }

  function handleUpdateIsBlocked({ selectedItem }) {
    updateIsBlocked({
      network_uuid: selectedItem.networkUuid,
      user_uuid: selectedItem.userUuid || selectedItem.user.uuid,
      is_blocked: !selectedItem.isBlocked,
    });
    setIsBlockModalActive(false);
    setIsUnblockModalActive(false);
  }

  function handleUpdateRole({ selectedItem }) {
    const updatedRole = (
      selectedItem.role === MEMBER_ROLE
        ? NETWORK_ADMIN_ROLE
        : selectedItem.role === NETWORK_ADMIN_ROLE
          ? MEMBER_ROLE
          : undefined
    );

    updateRole({
      network_uuid: selectedItem.networkUuid,
      user_uuid: selectedItem.userUuid || selectedItem.user.uuid,
      role: updatedRole,
    });
    setIsPromoteModalActive(false);
    setIsDemoteModalActive(false);
  }

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_user
      .map(mapNetworkUser)
  }

  return (
    <>
      {isBlockModalActive &&
        <ModalPortal onClose={() => setIsBlockModalActive(false)}>
          <DoubleConfirmModal
            heading={
              `Are you sure you want to block ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, block"
            isFetching={updateIsBlockedResult.fetching}
            onSubmit={() => handleUpdateIsBlocked({ selectedItem })}
            onCancel={() => setIsBlockModalActive(false)}
          />
        </ModalPortal>
      }
      {isUnblockModalActive &&
        <ModalPortal onClose={() => setIsUnblockModalActive(false)}>
          <DoubleConfirmModal
            heading={
              `Are you sure you want to unblock ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, unblock"
            isFetching={updateIsBlockedResult.fetching}
            onSubmit={() => handleUpdateIsBlocked({ selectedItem })}
            onCancel={() => setIsUnblockModalActive(false)}
          />
        </ModalPortal>
      }
      {isPromoteModalActive &&
        <ModalPortal onClose={() => setIsPromoteModalActive(false)}>
          <DoubleConfirmModal
            heading={
              `Are you sure you want to promote ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, promote"
            isFetching={updateRoleResult.fetching}
            onSubmit={() => handleUpdateRole({ selectedItem })}
            onCancel={() => setIsPromoteModalActive(false)}
          />
        </ModalPortal>
      }
      {isDemoteModalActive &&
        <ModalPortal onClose={() => setIsDemoteModalActive(false)}>
          <DoubleConfirmModal
            heading={
              `Are you sure you want to demote ${selectedItem.user.name || selectedItem.user.email}?`
            }
            submitLabel="Yes, demote"
            isFetching={updateRoleResult.fetching}
            onSubmit={() => handleUpdateRole({ selectedItem })}
            onCancel={() => setIsDemoteModalActive(false)}
          />
        </ModalPortal>
      }

      <MemberTable
        items={items}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onPromote={handlePromote}
        onDemote={handleDemote}
      />
    </>
  );
}

export default MemberTableContainer;
