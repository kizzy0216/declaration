import React from 'react';
import { useQuery } from 'urql';

import MemberTable from '~/components/MemberTable';
import GetNetworkUsers from '~/queries/GetNetworkUsers';
import mapUser from '~/shared/mappings/mapUser';

function MemberTableContainer({
  networkId,
}) {
  const [getNetworkUsersResult] = useQuery({
    query: GetNetworkUsers,
    variables: {
      network_id: networkId,
    },
  });

  const {
    data,
    fetching: isFetching,
  } = getNetworkUsersResult;

  let items = [];
  if (!isFetching && data) {
    items = data
      .network_user
      .map(({ user, role }) => mapUser({
        ...user,
        role,
      }))
  }

  return (
    <MemberTable
      items={items}
    />
  );
}

export default MemberTableContainer;
