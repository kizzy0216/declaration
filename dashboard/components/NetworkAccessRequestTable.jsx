import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import ActionMenu from '~/shared/components/ActionMenu';
import Table from '~/shared/components/Table';

function NetworkAccessRequestTable({
  items,
  action,
  onAccept = () => {},
  onDecline = () => {},
}) {
  const heading = `${items.length} Network Access Requests`;

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
        width: '25ch',
      },
    },
    {
      Header: 'Email',
      accessor: 'user.email',
      style: {
        width: '25ch',
      },
    },
    {
      Header: 'Network name',
      accessor: 'networkName',
      style: {
        width: '20ch',
      },
    },
    {
      Header: 'Body',
      accessor: 'body',
      style: {
        width: '50ch',
      },
      Cell: ({ value }) => (
        <div className="body-wrapper">
          {value}
        </div>
      ),
    },
    {
      Header: 'Member count',
      accessor: 'userCountRange',
      style: {
        width: '15ch',
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
                href: '#accept',
                onClick: () => onAccept({ id: value }),
                label: 'Accept',
                theme: 'primary',
              },
              {
                href: '#decline',
                onClick: () => onDecline({ id: value }),
                label: 'Decline',
                theme: 'tertiary',
              },
            ]}
          />
        </div>
      ),
    },
  ], []);

  return (
    <>
      <Table
        action={action}
        heading={heading}
        columns={columns}
        data={items}
        isCollapsible
      />
      <style jsx>{`
        .actions-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
        }

        .body-wrapper {
          line-height: 1.5;
          white-space: pre-line;
          max-height: 110px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}

export default NetworkAccessRequestTable;
