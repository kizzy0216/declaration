import React, { useRef, useCallback } from 'react';
import Link from 'next/link';

import SupermanIcon from '~/shared/components/icons/SupermanIcon';
import Avatar from '~/shared/components/Avatar';
import ArrowDownIcon from '~/shared/components/icons/ArrowDownIcon';
import useClickOutside from '~/shared/hooks/useClickOutside';
import { SUPER_ADMIN_VIEW_CONTEXT } from '~/shared/constants';

function ViewSwitcherPopover({
  active,
  items,
  onToggle = () => {},
}) {
  const popoverRef = useRef(null);
  useClickOutside(popoverRef, useCallback(() => onToggle()));

  function handleToggle(event) {
    event.preventDefault();
    onToggle();
  }

  const getHref = ({ id }) => {
    if (id === SUPER_ADMIN_VIEW_CONTEXT) {
      return '/networks';
    }

    return '/networks/[networkId]';
  };

  const getAs = ({ id }) => {
    if (id === SUPER_ADMIN_VIEW_CONTEXT) {
      return '/networks';
    }

    return `/networks/${id}`;
  };

  function handleClick() {
    onToggle();
  }

  console.log(items, active);

  return (
    <div
      ref={popoverRef}
      className="view-switcher-popover"
    >
      <div className="heading">
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

          <h1>{active.name}</h1>
        </span>

        <a
          href="#toggle"
          onClick={handleToggle}
        >
          <span className="icon-wrapper arrow">
            <ArrowDownIcon />
          </span>
        </a>
      </div>

      {items
        .filter(item => (Number(item.id) !== Number(active.id)))
        .map((item) => (
          <Link
            href={getHref(item)}
            as={getAs(item)}
            key={item.id}
          >
            <a onClick={handleClick}>
              <span className="icon-wrapper logo">
                { item.id === SUPER_ADMIN_VIEW_CONTEXT
                  ? <SupermanIcon />
                  : (
                    <Avatar
                      imageSrc={item.avatar}
                    />
                  )
                }
              </span>

              <h1>
                {item.name}
              </h1>
            </a>
          </Link>
      ))}
      <style jsx>{`
        .view-switcher-popover {
          padding-top: 15px;
          padding-right: 15px;
          padding-bottom: 15px;
          padding-left: 15px;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          background: white;
          position: absolute;
          top: 0;
          left: -15px;
          width: calc(100% + 20px);
        }

        .heading {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          & .left {
            flex: 1;
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            align-items: center;
            color: var(--gray);
            fill: var(--gray);
          }

          & .arrow {
            transform: rotate(180deg);
            transform-origin: 50% 50%;
          }
        }

        h1 {
          display: inline-block;
          font-size: 16px;
          font-weight: 500;
          user-select: none;
          margin-left: 5px;
        }

        a {
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;
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

export default ViewSwitcherPopover;
