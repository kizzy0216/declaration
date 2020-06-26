import React, { useState } from 'react';

import Button from './Button';
import ActionLink from './ActionLink';

function ActionMenu({
  items = [],
}) {
  const [isPopoverActive, setIsPopoverActive] = useState(false);

  function handleTogglePopover(event) {
    event.preventDefault();

    setIsPopoverActive(!isPopoverActive);
  }

  return (
    <div className={`action-menu ${isPopoverActive ? 'active': ''}`}>
      {items.length < 3 &&
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
                />
              </ActionLink>
            </li>
          ))}
        </ul>
      }

      {items.length >= 3 &&
        <div className="popover">
          <a
            className="toggle"
            href="#toggle-popover"
            onClick={handleTogglePopover}
          >
            ...
          </a>
          {isPopoverActive &&
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
                    />
                  </ActionLink>
                </li>
              ))}
            </ul>
          }
        </div>
      }

      <style jsx>{`
        .active {
          position: absolute;
          box-shadow: var(--box-shadow);
          border-radius: var(--border-radius);
          padding-bottom: 10px;

          & .toggle {
            position: relative;
            left: 100%;
            transform: translateX(-100%);
          }
        }

        .popover {
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

          & li {
            margin-bottom: 10px;
          }
        }

        .toggle {
          font-weight: bold;
          padding-top: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default ActionMenu;
