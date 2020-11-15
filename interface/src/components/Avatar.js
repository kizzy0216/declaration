import React, { useState } from 'react';

function Avatar({
  name = '',
  imageSrc,
  theme = 'primary', // primary, secondary
  size = 'medium', // small, medium, large
}) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const initials = (
    name && name.length > 0
    ?  name
      .split(' ')
      .map((word) => word[0])
      .join('')
    : '??'
  );

  function handleLoad() {
    setHasLoaded(true);
  }

  return (
    <div
      className={[
        'avatar',
        hasLoaded && 'image-loaded',
        !!imageSrc && 'has-src',
        theme,
        size,
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

          &.small {
            width: 16px;
            height: 16px;
          }

          &.medium {
            width: 35px;
            height: 35px;
          }

          &.large {
            width: 60px;
            height: 60px;
          }

          &:not(.has-src) {
            & .initials {
              opacity: 1;
            }

            & img {
              opacity: 0;
            }
          }

          &.image-loaded {
            background: none;

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
          opacity: 0;
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
        }
      `}</style>
    </div>
  );
}

export default Avatar;
