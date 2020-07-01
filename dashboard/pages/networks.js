import React from 'react';

import NetworkAccessRequestTable from '~/components/NetworkAccessRequestTable';

function NetworksPage() {
  const items = [{
    id: 0,
    user: {
      name: 'John Doe',
    },
    email: 'jdoe@example.com',
    networkName: 'Doe Soc',
    body: `
      Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine.
      You don't get sick, I do.  That's also clear.
      But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.
    `.trim(),
    userCountRange: '0-100',
  }];

  return (
    <div className="networks-page">
      <NetworkAccessRequestTable
        items={items}
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
