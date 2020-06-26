import React from 'react';

function Button ({
  label,
  theme = 'primary', // primary, secondary, tertiary, transparent
  type,
  size = 'medium', // medium, large
}) {
  return (
    <button
      className={`${theme} ${size}`}
      type={type}
    >
      {label}

      <style jsx>{`
        button {
          font-family: var(--font-family-sans-serif);
          font-weight: 500;
          border-radius: var(--border-radius);
          cursor: pointer;
          width: 100%;

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
        }

        .secondary {
          background: var(--light-gray);
          color: var(--gray);
        }

        .tertiary {
          background: white;
          color: var(--gray);
        }

        .transparent {
          color: black;
        }
      `}</style>
    </button>
  );
}

export default Button;
