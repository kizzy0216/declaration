import React from 'react';

import NetworkAccessRequestTableContainer from '~/containers/NetworkAccessRequestTableContainer';
import NetworkTableContainer from '~/containers/NetworkTableContainer';

function NetworksPage() {
  return (
    <div className="networks-page">
      <div className="row">
        <NetworkAccessRequestTableContainer />
      </div>

      <div className="row">
        <NetworkTableContainer />
      </div>

      <style jsx>{`
        .networks-page {
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

export default NetworksPage;
