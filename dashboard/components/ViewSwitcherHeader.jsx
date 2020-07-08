import React from 'react';

import SupermanIcon from '~/shared/components/icons/SupermanIcon';
import VennDiagramIcon from '~/shared/components/icons/VennDiagramIcon';
import ArrowDownIcon from '~/shared/components/icons/ArrowDownIcon';
import { SUPER_ADMIN_VIEW_CONTEXT } from '~/shared/constants';

function ViewSwitcherHeader({
  active,
  items,
  onToggle = () => {},
}) {
  const hasMoreItems = (items
    .filter(item => (item.id !== active.id))
    .length > 0
  );

  function handleToggle(event) {
    event.preventDefault();

    if (hasMoreItems) {
      onToggle();
    }
  }

  return (
    <div className="view-switcher-header">
      <a
        href="#toggle-view"
        onClick={handleToggle}
      >
        <span className="left">
          <span className="icon-wrapper logo">
            { active.id === SUPER_ADMIN_VIEW_CONTEXT
              ? <SupermanIcon />
              : <VennDiagramIcon />
            }
          </span>

          <h1>
            {active.name}
          </h1>
        </span>

        {hasMoreItems &&
          <span className="icon-wrapper">
            <ArrowDownIcon />
          </span>
        }
      </a>

      <style jsx>{`
        .view-switcher-header {
          padding-top: 15px;
        }

        a {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          user-select: none;
          margin-left: 5px;
        }

        .left {
          flex: 1;
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
        }

        .icon-wrapper {
          line-height: 0;
        }

        .icon-wrapper.logo {
          font-size: 32px;
        }
      `}</style>
    </div>
  );
}

export default ViewSwitcherHeader;
