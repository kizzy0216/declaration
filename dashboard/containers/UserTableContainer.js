import React from 'react';
import { useQuery } from 'urql';

import UserTable from '~/components/UserTable';
import GetUsers from '~/queries/GetUsers';
import mapUser from '~/mappings/mapUser';

function UserTableContainer() {
  const [getUsersResult] = useQuery({
    query: GetUsers,
  });

  const {
    data,
    fetching: isFetching,
  } = getUsersResult;

  let items = [];
  if (!isFetching) {
    items = data
      .user
      .map(mapUser)
  }

  return (
    <UserTable
      items={items}
    />
  );
}

export default UserTableContainer;
