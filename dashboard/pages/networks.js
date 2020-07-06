import React from 'react';
import { useQuery, useMutation } from 'urql';

import NetworkAccessRequestTable from '~/components/NetworkAccessRequestTable';
import GetNetworkAccessRequests from '~/queries/GetNetworkAccessRequests';
import DeleteNetworkAccessRequest from '~/mutations/DeleteNetworkAccessRequest';

function NetworksPage() {
  const [result] = useQuery({
    query: GetNetworkAccessRequests,
  });
  const [
    deleteAccessRequestResult, 
    deleteAccessRequest,
  ] = useMutation(DeleteNetworkAccessRequest);

  const {
    data,
    fetching: isFetching,
  } = result;

  let items = [];
  if (!isFetching) {
    items = result
      .data
      .network_access_request
      .map(({
        uuid,
        requester_name,
        requester_email,
        community_name,
        body,
        user_count_range,
      }) => ({
        id: uuid,
        user: {
          name: requester_name,
          email: requester_email,
        },
        networkName: community_name,
        body,
        userCountRange: user_count_range
          .replace(/\[/g, '')
          .replace(/\)/g, '')
          .split(',')
          .map((numberString) => {
            if (numberString[numberString.length - 1] === '1') {
              return Number(Number(numberString) - 1).toLocaleString();
            }

            return Number(numberString).toLocaleString();
          })
          .join(' - ')
      }));
  }

  function handleAccept({ id }) {
  }

  function handleDecline ({ id }) {
    deleteAccessRequest({ uuid: id });
  }

  return (
    <div className="networks-page">
      <NetworkAccessRequestTable
        items={items}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />

      <style jsx>{`
        .networks-page {
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}

export default NetworksPage;
