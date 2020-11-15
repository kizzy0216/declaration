import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import { formatDate } from '~/shared/utils/formatDate';

function NetworkMembershipInvitationTable({
  items,
  action,
  onDecline = () => {},
}) {
  const heading = `${items.length} Pending invites`;
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
      Header: 'Sent at',
      accessor: 'createdAt',
      // Cell: ({ value }) => formatDateTime(value)
      Cell: ({ value }) => {return `Sent ${formatDate(value)}`}
    },
    {
      id: 'actions',
      accessor: item => item,
      Cell: ({ value }) => (
        <div className="actions-wrapper">
          <ActionMenu
            items={[
              {
                href: '#Decline',
                onClick: () => onDecline({ item: value }),
                label: 'Decline',
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
