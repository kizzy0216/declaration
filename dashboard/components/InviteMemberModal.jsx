import React, { useState } from 'react';

import Button from '~/shared/components/Button';
import Input from '~/shared/components/Input';
import CloseIcon from '~/shared/components/icons/CloseIcon';

function InviteMemberModal({
  initialValues = {},
  isFetching = false,
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const [name, setName] = useState(initialValues.name || '');
  const [email, setEmail] = useState(initialValues.email || '');

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name,
      email,
    });
  }

  return (
    <div className="invite-member-modal">
      <div className="close-button" onClick={onCancel}>
        <CloseIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <p className="heading">
          Add new member
        </p>
        <div className="input-row">
          <Input
            type="text"
            value={name}
            label="Member name"
            onChange={event => setName(event.target.value)}
            placeholder="Add member name"
          />
        </div>
        <div className="input-row">
          <Input
            type="email"
            value={email}
            label="Member email"
            isRequired
            onChange={event => setEmail(event.target.value)}
            placeholder="Add email address"
          />
        </div>

        <div className="button-row">
          <Input
            label="Invite Member"
            type="submit"
            isFetching={isFetching}
          />
        </div>

        {/* <Button
          label="Cancel"
          onClick={onCancel}
          size="large"
          theme="secondary"
        /> */}
      </form>
      <style jsx>{`
        .invite-member-modal {
          background: white;
          padding-top: 20px;
          padding-right: 30px;
          padding-bottom: 20px;
          padding-left: 30px;
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 320px;
          position: relative;

          & .close-button {
            position: absolute;
            right: 20px;
            top: 18px;
            cursor: pointer;
          }
        }

        .heading {
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 30px;
        }

        .input-row {
          margin-bottom: 30px;
        }

        .button-row {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export default InviteMemberModal;
