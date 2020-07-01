import React from 'react';

function Button ({
  label,
  theme = 'primary', // primary, secondary, tertiary, transparent
  type,
  size = 'medium', // medium, large
  leftIcon,
  rightIcon,
}) {
  return (
    <button
      className={[
        theme,
        size,
        (leftIcon || rightIcon) && 'has-icon',
      ].filter(x => x).join(' ')}
      type={type}
    >
      {leftIcon &&
        <span className="icon-wrapper">
          {leftIcon}
        </span>
      }

      <span className="label">
        {label}
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
          border-radius: var(--border-radius);
          cursor: pointer;
          width: 100%;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;

          &:not(.transparent):hover {
            box-shadow: var(--box-shadow);
          }
        }

        .medium {
          padding-top: 0.4em;
          padding-right: 1.6em;
          padding-bottom: 0.4em;
          padding-left: 1.6em;
        }

        .large {
          padding-top: 1.3em;
          padding-right: 1.3em;
          padding-bottom: 1.3em;
          padding-left: 1.3em;
        }

        .primary {
          background: var(--blue);
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

        .label {
          flex: 1;
        }

        .icon-wrapper {
          line-height: 0;
        }
      `}</style>
    </button>
  );
}

export default Button;
