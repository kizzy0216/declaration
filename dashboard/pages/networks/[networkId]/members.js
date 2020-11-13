import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';

import GetNetworkById from '~/queries/GetNetworkById';
import Header from '~/containers/Header';
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
        <Header
          networkId={networkId}
          network={network}
        />
      </div>

      <div className="tables-section">
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
      </div>

      <style jsx>{`
        .network-members-page {
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .tables-section {
          padding-right: 25.5px;
          padding-left: 25.5px;
        }

        .row {
          margin-bottom: 50px;
        }
      `}</style>
    </div>
  );
}

export default NetworkMembersPage;
