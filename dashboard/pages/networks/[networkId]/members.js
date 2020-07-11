import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

import GetNetworkById from '~/queries/GetNetworkById';
import NetworkMembershipRequestTableContainer from '~/containers/NetworkMembershipRequestTableContainer';
import NetworkMembershipInvitationTableContainer from '~/containers/NetworkMembershipInvitationTableContainer';
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

  let network;
  if (result.data && result.data.network.length > 0) {
    network = mapNetwork(result.data.network[0]);
  }

  return (
    <div className="network-members-page">
      <div className="row">
        <NetworkMembershipRequestTableContainer
          networkId={networkId}
          network={network}
        />
      </div>

      <div className="row">
        <NetworkMembershipInvitationTableContainer
          networkId={networkId}
          network={network}
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
