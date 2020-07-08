import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import StarIcon from '~/shared/components/icons/StarIcon';
import FlagIcon from '~/shared/components/icons/FlagIcon';

function MemberTable({
  items,
}) {
  const heading = `${items.length.toLocaleString()} Members`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: ({ name, profile }) => ({ name, image: profile && profile.photo }),
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
      accessor: 'email',
      style: {
        width: '25ch'
      },
    },
    {
      Header: 'Role',
      accessor: 'role',
      style: {
        width: '20ch'
      },
    },
    {
      Header: 'Location',
      accessor: 'profile.location',
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
      accessor: 'id',
      Cell: ({ value }) => (
        <div className="actions-wrapper">
          <ActionMenu
            items={[
              {
                href: '#elevate',
                onClick: () => {},
                label: 'Make Admin',
                icon: <StarIcon />,
              },
              {
                href: '#block',
                onClick: () => {},
                label: 'Block',
                icon: <FlagIcon />,
              },
            ]}
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
