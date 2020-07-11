import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import formatDate from '~/shared/utils/formatDate';

function NetworkMembershipInvitationTable({
  items,
  action,
  onRevoke = () => {},
}) {
  const heading = `${items.length} Pending Invites`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: ({ user: {name, profile} }) => ({ name, image: profile && profile.photo }),
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
      Header: 'Sent at',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      id: 'actions',
      accessor: item => item,
      Cell: ({ value }) => (
        <div className="actions-wrapper">
          <ActionMenu
            items={[
              {
                href: '#revoke',
                onClick: () => onRevoke({ item: value }),
                label: 'Revoke',
                theme: 'tertiary',
              },
            ]}
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
      action={action}
      isCollapsible
    />
  );
}

export default NetworkMembershipInvitationTable;
