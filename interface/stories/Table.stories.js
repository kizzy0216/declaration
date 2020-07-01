import React, { useMemo } from 'react';

import ActionMenu from '~/components/ActionMenu';
import UserCell from '~/components/UserCell';
import Button from '~/components/Button';
import Table from '~/components/Table';

export default {
  title: 'Tables',
};

export const tableWithTwoActions = () => {
  return (
    <>
      <Table
        heading="2 New Member Requests"
        action={
          <Button label="Accept All & Send Invites" />
        }
        columns={
          useMemo(() => [
            {
              Header: 'Name',
              accessor: 'user',
              Cell: ({ value }) => (
                <UserCell value={value} />
              ),
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Email',
              accessor: 'email',
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Status',
              accessor: 'status',
            },
            {
              id: 'actions',
              accessor: 'id',
              Cell: ({ value }) => (
                <div className="actions-wrapper">
                  <ActionMenu
                    items={[
                      {
                        href: '#accept',
                        onClick: () => {},
                        label: 'Accept',
                        theme: 'primary',
                      },
                      {
                        href: '#decline',
                        onClick: () => {},
                        label: 'Decline',
                        theme: 'tertiary',
                      },
                    ]}
                  />
                </div>
              ),
            }
          ], [])
        }
        data={
          useMemo(() => [
            {
              id: 0,
              user: {
                name: 'John Smith',
                image: 'https://avatar.siqqfat.com/1',
              },
              email: 'jsmith@gmail.com',
              status: 'Sent 3/12/20',
            },
            {
              id: 1,
              user: {
                name: 'Elizabeth Higgins',
                image: 'https://avatar.siqqfat.com/2',
              },
              email: 'lizhiggins@gmail.com',
              status: 'Sent 3/12/20',
            },
          ], [])
        }
      />
      <style jsx>{`
        .actions-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export const tableWithOneAction = () => {
  return (
    <>
      <Table
        heading="2 New Pending Invites"
        columns={
          useMemo(() => [
            {
              Header: 'Name',
              accessor: 'user',
              Cell: ({ value }) => (
                <UserCell
                  value={value}
                  theme="secondary"
                />
              ),
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Email',
              accessor: 'email',
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Status',
              accessor: 'status',
            },
            {
              id: 'actions',
              accessor: 'id',
              Cell: ({ value }) => (
                <div className="actions-wrapper">
                  <ActionMenu
                    items={[
                      {
                        href: '#decline',
                        onClick: () => {},
                        label: 'Decline',
                        theme: 'tertiary',
                      },
                    ]}
                  />
                </div>
              ),
            }
          ], [])
        }
        data={
          useMemo(() => [
            {
              id: 0,
              user: {
                name: 'Melissa Horn',
                image: null,
              },
              email: 'melissahorn@gmail.com',
              status: 'Sent 3/09/20',
            },
            {
              id: 1,
              user: {
                name: 'Ryan Andrews',
                image: null,
              },
              email: 'ryanandrews@gmail.com',
              status: 'Sent 3/01/20',
            },
          ], [])
        }
      />
      <style jsx>{`
        .actions-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export const tableWithActions = () => {
  return (
    <>
      <Table
        heading="2,473 Members"
        subHeadings={[
          '4 Admin',
          '2,439 Active',
          '250 Blocked',
          '4 Deleted',
        ]}
        columns={
          useMemo(() => [
            {
              Header: 'Name',
              accessor: 'user',
              Cell: ({ value }) => (
                <UserCell
                  value={value}
                  theme="secondary"
                />
              ),
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Email',
              accessor: 'email',
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Role',
              accessor: 'role',
              style: {
                width: '25ch'
              },
            },
            {
              Header: 'Location',
              accessor: 'location',
              style: {
                width: '25ch'
              },
            },
            {
              id: 'actions',
              accessor: 'id',
              Cell: ({ value }) => (
                <div className="actions-wrapper">
                  <ActionMenu
                    items={[
                      {
                        href: '#elevate',
                        onClick: () => {},
                        label: 'Make Admin',
                      },
                      {
                        href: '#block',
                        onClick: () => {},
                        label: 'Block',
                      },
                    ]}
                    isPopoverOnly={true}
                  />
                </div>
              ),
            }
          ], [])
        }
        data={
          useMemo(() => [
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
          ], [])
        }
      />
      <style jsx>{`
        .actions-wrapper {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;
        }
      `}</style>
    </>
  );
}
