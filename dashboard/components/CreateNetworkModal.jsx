import React, { useState } from 'react';

import Button from '~/shared/components/Button';
import Input from '~/shared/components/Input';

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
      <form onSubmit={handleSubmit}>
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

        <Button
          label="Cancel"
          onClick={onCancel}
          size="large"
          theme="secondary"
        />
      </form>
      <style jsx>{`
        .create-network-modal {
          background: white;
          padding-top: 40px;
          padding-right: 40px;
          padding-bottom: 40px;
          padding-left: 40px;
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 400px;
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
