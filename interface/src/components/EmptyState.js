import React from 'react';

import EmptySetIcon from './icons/EmptySetIcon';

function EmptyState({
  heading = 'Nothing to see here',
  subHeading,
}) {
  return (
    <div className="empty-state">
      <div className="icon-wrapper">
        <EmptySetIcon fill="inherit" />
      </div>

      <h2 className="heading">
        {heading}
      </h2>

      {subHeading &&
        <h3 className="sub-heading">
          {subHeading}
        </h3>
      }

      <style jsx>{`
        .empty-state {
          display: flex;
          flex-flow: column;
          jusify-content: center;
          align-items: center;
          width: 100%;
          fill: var(--gray);
          color: var(--gray);
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .icon-wrapper {
          font-size: 64px;
          margin-botom: 20px;
        }
      `}</style>
    </div>
  );
}

export default EmptyState;
