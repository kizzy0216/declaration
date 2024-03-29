import React from 'react';

import SupermanIcon from '~/shared/components/icons/SupermanIcon';
import Avatar from '~/shared/components/Avatar';
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
              : (
                <Avatar
                  imageSrc={active.avatar}
                />
              )
            }
          </span>

          <h1>
            {active.name && (active.name.length > 12 ? active.name.substring(0, 12) + '...' : active.name)}
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

          & h1 {
            margin-left: 10px;
            font-family: var(--font-family-sans-serif);
            font-size: 16px;
            color: var(--dark);
            font-weight: 500;
          }
        }

        .icon-wrapper {
          line-height: 0;
        }

        .icon-wrapper.logo {
          font-size: 35px;
        }
      `}</style>
    </div>
  );
}

export default ViewSwitcherHeader;
