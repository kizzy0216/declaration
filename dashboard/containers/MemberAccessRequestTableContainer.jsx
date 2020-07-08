import React from 'react';
import { useQuery } from 'urql';

import MemberAccessRequestTable from '~/components/MemberAccessRequestTable';
import GetNetworkMembershipRequests from '~/queries/GetNetworkMembershipRequests';
import mapUser from '~/mappings/mapUser';

function MemberAccessRequestTableContainer({
  networkId,
}) {
  const [getNetworkMembershipRequests] = useQuery({
    query: GetNetworkMembershipRequests,
    variables: {
      network_id: networkId,
    },
  });

  const {
    data,
    fetching: isFetching,
  } = getNetworkMembershipRequests;

  let items = [];
  if (!isFetching) {
    items = data
      .network_user
      .map(({ user, role }) => mapUser({
        ...user,
        role,
      }))
  }

  return (
    <MemberAccessRequestTable
      items={items}
    />
  );
}

export default MemberAccessRequestTableContainer;
