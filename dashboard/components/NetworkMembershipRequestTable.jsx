import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';
import { formatDateTime } from '~/shared/utils/formatDate';

function NetworkMembershipRequestTable({
  items,
  onAccept = () => {},
  onDecline = () => {},
}) {
  const heading = `${items.length} Access Requests`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: ({ user: {name, profile} }) => ({ name, image: profile && profile.photo }),
      Cell: ({ value }) => (
        <UserCell value={value} />
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
      Header: 'Received at',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDateTime(value)
    },
    {
      Header: 'Body',
      accessor: 'body',
      style: {
        width: '30ch',
      },
      Cell: ({ value }) => (
        <div className="body-wrapper">
          {value}
          <style jsx>{`
            .body-wrapper {
              line-height: 1.5;
              white-space: pre-line;
              max-height: 110px;
              overflow-y: auto;
            }
          `}</style>
        </div>
      ),
    },
    {
      id: 'actions',
      accessor: item => item,
      Cell: ({ value }) => (
        <div className="actions-wrapper">
          <ActionMenu
            items={[
              {
                href: '#accept',
                onClick: () => onAccept({ item: value }),
                label: 'Accept',
                theme: 'primary',
              },
              {
                href: '#decline',
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
      isCollapsible
    />
  );
}

export default NetworkMembershipRequestTable;
