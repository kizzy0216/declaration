import React from 'react';

import SpinnerIcon from './icons/SpinnerIcon';

function Button ({
  label,
  theme = 'primary', // primary, secondary, tertiary, transparent
  type,
  size = 'medium', // medium, large
  leftIcon,
  rightIcon,
  isFetching = false,
  onClick = () => {},
}) {
  return (
    <button
      className={[
        theme,
        size,
        (leftIcon || rightIcon) && 'has-icon',
        leftIcon && 'has-left-icon',
        rightIcon && 'has-right-icon',
      ].filter(x => x).join(' ')}
      type={type}
      onClick={onClick}
    >
      {leftIcon &&
        <span className="icon-wrapper">
          {leftIcon}
        </span>
      }

      <span className="label">
        {isFetching
          ? (
            <SpinnerIcon fill="inherit" />
          ) : (
            label
          )
        }
      </span>

      {rightIcon &&
        <span className="icon-wrapper">
          {rightIcon}
        </span>
      }

      <style jsx>{`
        button {
          font-family: var(--font-family-sans-serif);
          font-weight: 500;
          border-radius: 7px;
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;

          &:hover {
            opacity: 0.7;
          }

          &:not(.transparent, .quaternary):hover {
            box-shadow: var(--box-shadow);
          }

          &.has-icon {
            & .label {
              text-align: left;
            }

            &.has-left-icon {
              & .label {
                padding-left: 10px;
              }
            }
          }
        }

        .medium {
          padding-top: 0.4em;
          padding-right: 0.8em;
          padding-bottom: 0.4em;
          padding-left: 0.8em;
          font-size: 14px;
          height: 30px;
        }

        .large {
          padding-top: 1.3em;
          padding-right: 1.3em;
          padding-bottom: 1.3em;
          padding-left: 1.3em;
        }

        .small {
          padding-top: 0.4em;
          padding-right: 25px;
          padding-bottom: 0.4em;
          padding-left: 25px;
          font-size: 12px;
          line-height: 14px;
        }

        .primary {
          background: var(--light-blue);
          color: white;
          fill: white;
        }

        .secondary {
          background: var(--light-gray);
          color: var(--gray);
          fill: var(--gray);
        }

        .tertiary {
          background: white;
          color: var(--gray);
          fill: var(--gray);
        }

        .transparent {
          color: black;
          fill: black;
        }

        .quaternary {
          color: var(--dark);
          fill: transparent;
          padding: 0;
          white-space: nowrap;
          margin-left: 30px;
        }

        .label {
          flex: 5;
        }

        .icon-wrapper {
          flex: 1;
          line-height: 0;
        }
      `}</style>
    </button>
  );
}

export default Button;
