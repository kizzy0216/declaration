import React, { useMemo } from 'react';

import UserCell from '~/shared/components/UserCell';
import Table from '~/shared/components/Table';

function NetworkTable({
  items,
  action,
}) {
  const heading = `${items.length} Networks`;
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      style: {
        width: '20ch',
      },
    },
    {
      Header: 'Member count',
      accessor: 'userCount',
      style: {
        width: '15ch',
      },
    },
    {
      Header: 'Admins',
      accessor: 'admins',
      Cell: ({ value }) => (
        <div className="admins">
          {value.map(({ name, email, id }) => (
            <UserCell
              key={id}
              value={{
                name,
                email,
              }}
              showEmail
            />
          ))}
          <style jsx>{`
            .admins {
              display: flex;
              flex-flow: row wrap;
              justify-content: flex-start;
            }
          `}</style>
        </div>
      ),
    },
  ], []);

  return (
    <Table
      action={action}
      heading={heading}
      columns={columns}
      data={items}
      isCollapsible
    />
  );
}

export default NetworkTable;
