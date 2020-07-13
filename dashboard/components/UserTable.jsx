import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import Table from '~/shared/components/Table';
import verbalizeUserRole from '~/shared/utils/verbalizeUserRole';

function UserTable({
  items,
}) {
  const heading = `${items.length.toLocaleString()} Users`;
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
      Header: 'Networks',
      accessor: ({
        networkUuids,
        networksByUuid,
        rolesByNetworkUuid,
      }) => ({
        networkUuids,
        networksByUuid,
        rolesByNetworkUuid,
      }),
      Cell: ({ value: { networkUuids, networksByUuid, rolesByNetworkUuid } }) => (
        <>
          {networkUuids.length === 0
            ? (
              <p>-</p>
            ) : (
              networkUuids.map((networkUuid) => (
                <p
                  key={networkUuid}
                >
                  {networksByUuid[networkUuid].name}
                  &nbsp;({verbalizeUserRole(rolesByNetworkUuid[networkUuid])})
                </p>
              ))
            )
          }
          <style jsx>{`
            p:not(:last-of-type) {
              margin-bottom: 10px;
            }
          `}</style>
        </>
      ),
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

export default UserTable;
