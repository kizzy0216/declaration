import React, { useRef, useCallback, useState } from 'react';
import { useMutation } from 'urql';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MARKETING_BASE_URL = process.env.MARKETING_BASE_URL;

const ModalPortal = dynamic(() => import('~/shared/components/ModalPortal'), { ssr: false });
import SupermanIcon from '~/shared/components/icons/SupermanIcon';
import Avatar from '~/shared/components/Avatar';
import ArrowDownIcon from '~/shared/components/icons/ArrowDownIcon';
import GreenCircleCheckIcon from '~/shared/components/icons/GreenCircleCheckIcon';
import CircleUncheckIcon from '~/shared/components/icons/CircleUncheckIcon';
import useClickOutside from '~/shared/hooks/useClickOutside';
import InsertNetworkWithUser from '~/mutations/InsertNetworkWithUser';
import CreateNetworkModal from '~/components/CreateNetworkModal';
import { SUPER_ADMIN_VIEW_CONTEXT } from '~/shared/constants';

function ViewSwitcherPopover({
  active,
  items,
  onToggle = () => {},
}) {
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [
    insertNetworkWithUserResult,
    insertNetworkWithUser,
  ] = useMutation(InsertNetworkWithUser);
  const popoverRef = useRef(null);
  useClickOutside(popoverRef, useCallback(() => onToggle()));

  function handleToggle(event) {
    event.preventDefault();
    onToggle();
  }

  function handleCreate({
    name,
    email,
  }) {
    insertNetworkWithUser({
      network_name: name,
      user_email: email,
      user_role: NETWORK_ADMIN_ROLE,
    }).then(() => {
      setIsCreateModalActive(false);
    });
  }

  function handleCreateNew() {
    setIsCreateModalActive(true);
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

  return (
    <div
      ref={popoverRef}
      className="view-switcher-popover"
    >
      {isCreateModalActive &&
        <ModalPortal
          onClose={() => setIsCreateModalActive(false)}
        >
          <CreateNetworkModal
            isFetching={insertNetworkWithUserResult.fetching}
            onSubmit={handleCreate}
            onCancel={() => setIsCreateModalActive(false)}
          />
        </ModalPortal>
      }

      <div className="heading">
        <span className="left">
          <h1>{active.name && (active.name.length > 18 ? active.name.substring(0, 18) + '...' : active.name)}</h1>
        </span>

        <span className="icon-wrapper">
          <GreenCircleCheckIcon />
        </span>
      </div>

      {items
        .filter(item => (Number(item.id) !== Number(active.id)))
        .map((item) => (
          <Link
            href={getHref(item)}
            as={getAs(item)}
            key={item.id}
          >
            <a onClick={handleClick} className="heading">
              <h1 className="left">
                {item.name && (item.name.length > 18 ? item.name.substring(0, 18) + '...' : item.name)}
              </h1>
              <span className="icon-wrapper">
                <div className="unchecked"></div>
              </span>
            </a>
          </Link>
      ))}

      <button className="create-button" onClick={handleCreateNew}>
          Create a new network
      </button>

      <div className="popover-footer">
        <div className="left-blank"></div>
        <a href={`${MARKETING_BASE_URL}/log-out`} className="logout-button">Log out</a>
        <a
          href="#toggle"
          onClick={handleToggle}
          className="toggle-button"
        >
          <span className="icon-wrapper arrow">
            <ArrowDownIcon />
          </span>
        </a>
      </div>

      <style jsx>{`
        .view-switcher-popover {
          padding-top: 22px;
          padding-right: 15px;
          padding-bottom: 15px;
          padding-left: 20px;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          background: white;
          position: absolute;
          top: 0;
          left: -15px;
          width: calc(100% + 30px);
          z-index: 4;
        }

        .heading {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--light-gray);
          padding-bottom: 13px;

          & .left {
            flex: 1;
            display: flex;
            flex-flow: row;
            justify-content: flex-start;
            align-items: center;
            color: var(--dark);
            fill: var(--gray);
          }
        }

        h1 {
          display: inline-block;
          font-family: var(--font-family-sans-serif);
          font-size: 14px;
          font-weight: 400;
          user-select: none;
          margin-left: 5px;
          white-space: nowrap;
        }

        a {
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .icon-wrapper {
          line-height: 0;

          & .unchecked {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #ccc;
          }
        }

        .icon-wrapper.logo {
          font-size: 32px;
        }

        .create-button {
          font-family: var(--font-family-sans-serif);
          font-size: 12px;
          font-weight: 500;
          color: var(--dark);
          width: 100%;
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 10.5px;
          padding-right: 10.5px;
          margin-top: 10px;
          border-radius: 7px;
          box-shadow: 0 10px 40px 0 #00000033;
          cursor: pointer;

          &:hover {
            opacity: 0.7;
          }
        }

        .popover-footer {
          display: flex;
          margin-top: 10px;

          & .left-blank {
            flex: 1;
          }

          & .logout-button {
            flex: 4;
            font-family: var(--font-family-sans-serif);
            text-align: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 500;
            color: var(--dark);
            align-self: center;
            cursor: pointer;

            &:hover {
              opacity: 0.7;
            }
          }

          & .toggle-button {
            flex: 1;
            display: flex;
            flex-direction: row-reverse;
          }

          & .arrow {
            transform: rotate(180deg);
            transform-origin: 50% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default ViewSwitcherPopover;
