import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import StarIcon from '~/shared/components/icons/StarIcon';
import UnStarIcon from '~/shared/components/icons/UnStarIcon';
import FlagIcon from '~/shared/components/icons/FlagIcon';
import UnFlagIcon from '~/shared/components/icons/UnFlagIcon';
import {
  NETWORK_ADMIN_ROLE,
  MEMBER_ROLE,
} from '~/shared/constants';
import verbalizeUserRole from '~/shared/utils/verbalizeUserRole';

function Actions({
  item,
  onBlock = () => {},
  onUnblock = () => {},
  onPromote = () => {},
  onDemote = () => {},
}) {
  return (
    <div className="actions-wrapper">
      <ActionMenu
        items={[
          item.role !== NETWORK_ADMIN_ROLE && ({
            href: '#promote',
            onClick: () => onPromote({ item }),
            label: 'Make Admin',
            icon: <StarIcon />,
          }),
          item.role === NETWORK_ADMIN_ROLE && ({
            href: '#demote',
            onClick: () => onDemote({ item }),
            label: 'Make Member',
            icon: <UnStarIcon />,
          }),
          !item.isBlocked && ({
            href: '#block',
            onClick: () => onBlock({ item }),
            label: 'Block',
            icon: <FlagIcon />,
          }),
          item.isBlocked && ({
            href: '#unblock',
            onClick: () => onUnblock({ item }),
            label: 'Unblock',
            icon: <UnFlagIcon />,
          }),
        ].filter(x => x)}
        isPopoverOnly={true}
      />
      <style jsx>{`
        .actions-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </div>
  );
}


function MemberTable({
  items,
  onBlock = () => {},
  onUnblock = () => {},
  onPromote = () => {},
  onDemote = () => {},
}) {
  const heading = `${items.length.toLocaleString()} Members`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: ({ user: { name, profile } }) => ({ name, image: profile && profile.photo }),
      Cell: ({ value }) => (
        <UserCell
          value={value}
          theme="secondary"
        />
      ),
      style: {
        width: '25ch'
      },
    },
    {
      Header: 'Email',
      accessor: 'user.email',
      style: {
        width: '25ch'
      },
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => verbalizeUserRole(value),
      style: {
        width: '20ch'
      },
    },
    {
      Header: 'Location',
      accessor: 'user.profile.location',
      style: {
        width: '30ch'
      },
    },
    {
      Header: 'Blocked?',
      accessor: 'isBlocked',
      Cell: ({ value }) => (
        value ? 'True' : 'False'
      ),
      style: {
        width: '10ch'
      },
    },
    {
      id: 'actions',
      accessor: item => item,
      Cell: ({ value }) => (
        <Actions
          item={value}
          onBlock={onBlock}
          onUnblock={onUnblock}
          onPromote={onPromote}
          onDemote={onDemote}
        />
      ),
    }
  ], []);

  return (
    <Table
      heading={heading}
      columns={columns}
      data={items}
      isCollapsible
    />
  );
}

export default MemberTable;
