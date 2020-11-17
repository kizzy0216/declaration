import React, { useState } from 'react'
import { useMutation } from 'urql';
import dynamic from 'next/dynamic';

const MOBILE_BASE_URL = process.env.MOBILE_BASE_URL;

const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import Input from '~/shared/components/Input'
import Button from '~/shared/components/Button';
import TriangleDownIcon from '~/shared/components/icons/TriangleDownIcon';
import InsertNetworkMembershipInvitation from '~/mutations/InsertNetworkMembershipInvitation';
import InviteMemberModal from '~/components/InviteMemberModal';

function Header({
  network
}) {
  const [isInviteMemberModalActive, setIsInviteMemberModalActive] = useState(false);
  const [
    insertInvitationResult,
    insertInvitation,
  ] = useMutation(InsertNetworkMembershipInvitation);

  function handleInsert({
    name,
    email,
  }) {
    insertInvitation({
      network_uuid: network.uuid,
      user_name: name,
      user_email: email,
      redirect: `${MOBILE_BASE_URL}/accept-invitation`,
    }).then(() => setIsInviteMemberModalActive(false));
  }

  return (
    <>
      {isInviteMemberModalActive &&
        <ModalPortal
          onClose={() => setIsInviteMemberModalActive(false)}
        >
          <InviteMemberModal
            isFetching={insertInvitationResult.fetching}
            onSubmit={handleInsert}
            onCancel={() => setIsInviteMemberModalActive(false)}
          />
        </ModalPortal>
      }

      <div className="container">
        <div className="action-box">
          <Input
            placeholder="Search"
            inputFieldClassName="search-box"
          />
          <ButtonsBox
            buttons={[
              {
                onClick: () => setIsInviteMemberModalActive(true),
                label: 'Add individuals',
                theme: 'quaternary',
              },
              // {
              //   onClick: () => {},
              //   label: 'Upload CSV',
              //   theme: 'quaternary',
              // },
            ]}
          />
        </div>

        <TableHeaders
          fields={[
            {
              name: 'Name',
              style: {
                width: 175
              }
            },
            {
              name: 'Email',
              style: {
                width: 212
              }
            },
            {
              name: 'Status',
              style: {
                width: 120
              }
            },
            {
              name: 'City, State',
              style: {
                width: 170
              }
            },
            {
              name: 'Level',
            },
          ]}
        />
      </div>

      <style jsx>{`
        .container {
          height: 90px;
          border-bottom: 2px solid var(--light-gray);
          padding-top: 20px;
          padding-right: 25.5px;
          padding-left: 25.5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #fff;
        }

        .action-box {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

function ButtonsBox({
  buttons
}) {
  const renderButtons = buttons.map((button, index) => <Button
    key={index}
    theme={button.theme}
    label={button.label}
    onClick={button.onClick}
  />)

  return (
    <>
      <div className="btn-box">
        {renderButtons}
      </div>
      <style jsx>{`
        .btn-box {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  )
}

function TableHeaders({
  fields
}) {
  const renderFields = fields.map((field, index) => <div
    key={index}
    className="field"
    style={field.style && field.style}
  >
    {field.name}
    {field.sortAction && <div className="icon-wrapper">
      <TriangleDownIcon onClick={field.sortAction} />
    </div>}
    <style jsx>{`
      .field {
        font-family: var(--font-family-sans-serif);
        font-size: 12px;
        font-weight: 400;
        color: var(--dark);
        display: flex;
        align-items: flex-start;
      }

      .icon-wrapper {
        margin-left: 8.5px;
      }
    `}</style>
  </div>)

  return (
    <>
      <div className="fields-container">
        {renderFields}
      </div>
      <style jsx>{`
        .fields-container {
          display: flex;
          margin-bottom: 5px;
        }
      `}</style>
    </>
  )
}

export default Header;