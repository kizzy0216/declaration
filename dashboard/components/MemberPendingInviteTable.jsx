import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';

function MemberPendingInviteTable({
  items,
}) {
  const heading = `${items.length} Pending Invites`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'user',
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
      Header: 'Status',
      accessor: 'status',
    },
    {
      id: 'actions',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className="actions-wrapper">
          <ActionMenu
            items={[
              {
                href: '#revoke',
                onClick: () => {},
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
      isCollapsible
    />
  );
}

export default MemberPendingInviteTable;
