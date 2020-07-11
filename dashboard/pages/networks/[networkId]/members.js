import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

import GetNetworkById from '~/queries/GetNetworkById';
import MemberAccessRequestTableContainer from '~/containers/MemberAccessRequestTableContainer';
import MemberPendingInviteTable from '~/components/MemberPendingInviteTable';
import MemberTableContainer from '~/containers/MemberTableContainer';
import mapNetwork from '~/shared/mappings/mapNetwork';

function NetworkMembersPage() {
  const router = useRouter();
  const { networkId } = router.query;
  const [result] = useQuery({
    query: GetNetworkById,
    variables: {
      id: networkId,
    },
  });

  const accessRequestItems = [{
    id: 0,
    user: {
      name: 'John Doe',
    },
    email: 'jdoe@example.com',
    status: 'Received 3/12/20',
  }];

  const pendingInviteItems = [{
    id: 0,
    user: {
      name: 'John Doe',
    },
    email: 'jdoe@example.com',
    status: 'Sent 3/12/20',
  }];

  let network;
  if (result.data && result.data.network.length > 0) {
    network = mapNetwork(result.data.network[0]);
  }

  return (
    <div className="network-members-page">
      <div className="row">
        <MemberAccessRequestTableContainer
          networkId={networkId}
          network={network}
          items={accessRequestItems}
        />
      </div>

      <div className="row">
        <MemberPendingInviteTable
          items={pendingInviteItems}
        />
      </div>

      <div className="row">
        <MemberTableContainer
          networkId={networkId}
        />
      </div>

      <style jsx>{`
        .network-members-page {
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
        }

        .row {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

export default NetworkMembersPage;
