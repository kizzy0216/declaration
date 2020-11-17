import React, { useState } from 'react';

import Button from '~/shared/components/Button';
import Input from '~/shared/components/Input';
import CloseIcon from '~/shared/components/icons/CloseIcon';

function CreateNetworkModal({
  initialValues = {},
  isFetching = false,
  accessRequestId,
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
      accessRequestId,
    });
  }

  return (
    <div className="create-network-modal">
      <div className="close-button" onClick={onCancel}>
        <CloseIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <p className="heading">
          Create new network
        </p>
        <div className="input-row">
          <Input
            type="text"
            value={name}
            label="Network name"
            isRequired
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div className="input-row">
          <Input
            type="email"
            value={email}
            label="Network admin email"
            onChange={event => setEmail(event.target.value)}
          />
        </div>

        <div className="button-row">
          <Input
            label="Create Network"
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
        .create-network-modal {
          font-family: var(--font-family-sans-serif);
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

export default CreateNetworkModal;
