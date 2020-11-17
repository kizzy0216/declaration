import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import StarIcon from '~/shared/components/icons/StarIcon';
import UnStarIcon from '~/shared/components/icons/UnStarIcon';
import FlagIcon from '~/shared/components/icons/FlagIcon';
import UnlockIcon from '~/shared/components/icons/UnlockIcon';
import BroadcastIcon from '~/shared/components/icons/BroadcastIcon';
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
            label: 'Make admin',
            icon: <StarIcon />,
            size: 'small'
          }),
          item.role === NETWORK_ADMIN_ROLE && ({
            href: '#demote',
            onClick: () => onDemote({ item }),
            label: 'Make member',
            icon: <BroadcastIcon  />,
            size: 'small'
          }),
          !item.isBlocked && ({
            href: '#block',
            onClick: () => onBlock({ item }),
            label: 'Block user',
            icon: <FlagIcon />,
            size: 'small'
          }),
          item.isBlocked && ({
            href: '#unblock',
            onClick: () => onUnblock({ item }),
            label: 'Unblock user',
            icon: <UnlockIcon />,
            size: 'small'
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
  const subHeadings = [
    `${items.filter(item => item.role === 'NETWORK_ADMIN').length} Admin`,
    `${items.filter(item => item.isBlocked).length} Blocked`
  ];
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
        width: '176px'
      },
    },
    {
      Header: 'Email',
      accessor: 'user.email',
      style: {
        width: '213px'
      },
    },
    {
      Header: 'Role',
      accessor: 'role',
      Cell: ({ value }) => verbalizeUserRole(value),
      style: {
        width: '123.5px'
      },
    },
    {
      Header: 'Location',
      accessor: 'user.profile.location',
      style: {
        width: '170px'
      },
    },
    {
      Header: 'Blocked?',
      accessor: 'isBlocked',
      Cell: ({ value }) => (
        value ? 'True' : 'False'
      ),
      style: {
        width: '77px'
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
      subHeadings={subHeadings}
      columns={columns}
      data={items}
      isCollapsible
    />
  );
}

export default MemberTable;
