import React from 'react';

import Input from './Input';
import Button from './Button';
import CloseIcon from './icons/CloseIcon';

function DeclineConfirmModal({
  heading = 'Are you sure?',
  description,
  submitLabel,
  cancelLabel,
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
      <div className="close-button" onClick={onCancel}>
        <CloseIcon />
      </div>
      <form onSubmit={handleSubmit}>
        <p className="heading">
          {heading}
        </p>
        {description &&
          <p className="description">
            {description}
          </p>
        }

        {submitLabel &&
          <div className="row">
            <Input
                type="submit"
                label={submitLabel}
                isFetching={isFetching}
            />
          </div>
        }

        {cancelLabel &&
          <div className="row">
            <Button
                label={cancelLabel}
                size="large"
                theme="secondary"
                onClick={onCancel}
            />
          </div>
        }
      </form>
      <style jsx>{`
        .double-confirm-modal {
          font-family: var(--font-family-sans-serif);
          background: white;
          padding-top: 20px;
          padding-right: 30px;
          padding-bottom: 10px;
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
        }

        .description {
          margin-bottom: 30px;
          margin-top: 20px;
          text-align: center;
          font-weight: 400;
          font-size: 14px;
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

export default DeclineConfirmModal;
