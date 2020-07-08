import React, { useState, useRef, useCallback } from 'react';

import Button from './Button';
import ActionLink from './ActionLink';
import KebabIcon from './icons/KebabIcon';
import useClickOutside from '../hooks/useClickOutside';

function ActionMenu({
  items = [],
  isPopoverOnly = false,
}) {
  const popoverRef = useRef();
  const isPopover = (isPopoverOnly || items.length >=3);
  const [isPopoverActive, setIsPopoverActive] = useState(false);

  function handleTogglePopover(event) {
    event.preventDefault();

    setIsPopoverActive(!isPopoverActive);
  }

  useClickOutside(popoverRef, useCallback(() => setIsPopoverActive(false)));

  return (
    <div className={[
      'action-menu',
      isPopoverActive && 'active',
    ].filter(x => x).join(' ')}>
      <div className="container">
        {!isPopover &&
          <ul className="static-list">
            {items.map((item) => (
              <li key={item.href}>
                <ActionLink
                  href={item.href}
                  onClick={item.onClick}
                >
                  <Button
                    label={item.label}
                    theme={item.theme}
                    leftIcon={item.icon}
                  />
                </ActionLink>
              </li>
            ))}
          </ul>
        }
        
        {isPopover &&
          <a
            className="toggle"
            href="#toggle-popover"
            onClick={handleTogglePopover}
          >
            <KebabIcon fill="inherit" />
          </a>
        }

        {isPopover &&
          <div
            className="popover"
            ref={popoverRef}
          >
            <a
              className="toggle"
              href="#toggle-popover"
              onClick={handleTogglePopover}
            >
              <KebabIcon fill="inherit" />
            </a>
            <ul className="popover-list">
              {items.map((item) => (
                <li key={item.href}>
                  <ActionLink
                    href={item.href}
                    onClick={item.onClick}
                  >
                    <Button
                      label={item.label}
                      theme="transparent"
                      leftIcon={item.icon}
                    />
                  </ActionLink>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
      <style jsx>{`
        .action-menu {
        }

        .container {
          position: relative;
        }

        .active {
          & .popover {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            z-index: var(--z-index-buoyant);
            box-shadow: var(--box-shadow);
            border-radius: var(--border-radius);
            padding-bottom: 10px;

            background: white;
          }

          & .toggle {
            position: relative;
            left: 100%;
            transform: translateX(-100%);
          }
        }

        .popover {
          display: none;
          min-width: 175px;

          & li:not(:last-of-type) {
            margin-bottom: 20px;
          }
        }

        .static-list {
          display: flex;
          flex-flow: row;

          & li:not(:last-child) {
            margin-right: 10px;
          }
        }

        ul {
          list-style: none;
        }

        .toggle {
          font-weight: bold;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          fill: var(--gray);
        }
      `}</style>
    </div>
  );
}

export default ActionMenu;
