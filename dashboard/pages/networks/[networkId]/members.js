import React from 'react';
import { useRouter } from 'next/router';

import MemberAccessRequestTable from '~/components/MemberAccessRequestTable';
import MemberPendingInviteTable from '~/components/MemberPendingInviteTable';
import MemberTableContainer from '~/containers/MemberTableContainer';

function NetworkMembersPage() {
  const router = useRouter();
  const { networkId } = router.query;

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

  return (
    <div className="network-members-page">
      <div className="row">
        <MemberAccessRequestTable
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
