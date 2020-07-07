import React from 'react';

import Input from './Input';
import Button from './Button';

function DoubleConfirmModal({
  heading = 'Are you sure?',
  submitLabel = 'Yes, do it',
  cancelLabel = 'No, cancel',
  isFetching = false,
  onSubmit = () => {},
  onCancel = () => {},
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="double-confirm-modal">
      <form onSubmit={handleSubmit}>
        <p className="heading">
          {heading}
        </p>

        <div className="row">
          <Input
            type="submit"
            label={submitLabel}
            isFetching={isFetching}
          />
        </div>

        <div className="row">
          <Button
            label={cancelLabel}
            size="large"
            theme="secondary"
            onClick={onCancel}
          />
        </div>
      </form>
      <style jsx>{`
        .double-confirm-modal {
          background: white;
          padding-top: 40px;
          padding-right: 40px;
          padding-bottom: 40px;
          padding-left: 40px;
          border-radius: var(--border-radius);
          width: 100%;
          max-width: 400px;
        }

        .heading {
          margin-bottom: 30px;
          text-align: center;
          font-weight: bold;
          max-width: 30ch;
          margin-left: auto;
          margin-right: auto;
        }

        .row {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

export default DoubleConfirmModal;
