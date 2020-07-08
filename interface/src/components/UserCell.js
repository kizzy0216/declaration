import React from 'react';

import Avatar from './Avatar';

function UserCell({
  value,
  theme = 'primary', // primary, secondary
  showEmail = false,
  footer,
}) {
  return (
    <div className="user-cell">
      <span className="avatar-wrapper">
        <Avatar
          name={value.name}
          imageSrc={value.image}
          theme={theme}
        />
      </span>

      <div className="container">
        <p className="name">
          {value.name || 'Unknown Name'}
        </p>

        {showEmail && value.email &&
          <p className="email">
            {value.email}
          </p>
        }

        {footer}
      </div>

      <style jsx>{`
        .user-cell {
          display: flex;
          flex-flow: row;
          align-items: center;
        }

        .avatar-wrapper {
          flex: 0 0 auto;
        }

        .container {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default UserCell;
