import React from 'react';

import MemberAccessRequestTable from '~/components/MemberAccessRequestTable';
import MemberPendingInviteTable from '~/components/MemberPendingInviteTable';
import MemberTable from '~/components/MemberTable';

function MembersPage() {
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

  const items = [
    {
      id: 0,
      user: {
        name: 'Samantha Thand',
        image: 'https://avatar.siqqfat.com/samantha',
      },
      email: 'sthand@gmail.com',
      role: 'Admin',
      location: 'New York City, NY',
    },
    {
      id: 1,
      user: {
        name: 'Michael Stokes',
        image: 'https://avatar.siqqfat.com/michael',
      },
      email: 'michaelstokes@gmail.com',
      role: 'Admin',
      location: 'New York City, NY',
    },
    {
      id: 2,
      user: {
        name: 'Nicole Turner',
        image: 'https://avatar.siqqfat.com/nicole',
      },
      email: 'nicoleturner@gmail.com',
      role: 'Member',
      location: 'New York City, NY',
    },
    {
      id: 3,
      user: {
        name: 'Loretta Wilken',
        image: 'https://avatar.siqqfat.com/loretta',
      },
      email: 'lorettawilen@gmail.com',
      role: 'Member',
      location: 'New York City, NY',
    },
  ];

  return (
    <div className="members-page">
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
        <MemberTable
          items={items}
        />
      </div>

      <style jsx>{`
        .members-page {
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

export default MembersPage;
