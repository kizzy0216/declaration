import React, { useState } from 'react';

function Avatar({
  name = '',
  imageSrc,
  theme = 'primary', // primary, secondary
}) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('');

  function handleLoad() {
    setHasLoaded(true);
  }

  return (
    <div
      className={[
        'avatar',
        hasLoaded && 'image-loaded',
        theme,
      ].filter(x => x).join(' ')}
    >
      <div className="initials">
        {initials}
      </div>

      {imageSrc &&
        <img
          src={imageSrc}
          onLoad={handleLoad}
        />
      }

      <style jsx>{`
        .avatar {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          position: relative;
          color: white;

          &.primary {
            background: var(--blue);
          }

          &.secondary {
            background: var(--gray);
          }

          &.image-loaded {
            & .initials {
              opacity: 0;
            }

            & img {
              opacity: 1;
            }
          }
        }

        .initials {
          line-height: 1;
          font-size: 14px;
          font-weight: bold;
          opacity: 1;
          transition: opacity 0.333s ease-in-out;
          user-select: none;
        }

        img {
          opacity: 0;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity 0.333s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Avatar;
