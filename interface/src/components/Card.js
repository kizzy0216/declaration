import React from 'react';

import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';

const Card = ({
  heading,
  note,
  error,
  children,
  isFetching,
}) => {
  return (
    <div className="card">
      <div className="container">
        <h4>{heading}</h4>

        <div className="children-wrapper">
          {children}
        </div>
      </div>

      {(note || error) &&
        <div className="footer">
          {note &&
            <p className="note">
              {note}
            </p>
          }
          {error &&
            <p className="error">
              {error}
            </p>
          }
        </div>
      }

      {isFetching &&
        <span className="icon-wrapper">
          <SpinnerIcon
            fill="inherit"
            width="20px"
            height="20px"
          />
        </span>
      }

      <style jsx>{`
        .card {
          border-radius: var(--border-radius);
          border: solid 1px var(--light-gray);
          box-shadow: var(--box-shadow);
          position: relative;
        }

        h4 {
          margin-bottom: 20px;
        }

        .container {
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
        }

        .footer {
          background: var(--light-gray);
          padding-top: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          padding-left: 20px;
          font-size: 14px;
          color: var(--lead);
        }

        .icon-wrapper {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .error {
          color: var(--red);
        }

        .note + .error {
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}

export default Card;
