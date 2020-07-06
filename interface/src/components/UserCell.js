import React from 'react';

import Avatar from './Avatar';

function UserCell({
  value,
  theme = 'primary', // primary, secondary
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

      <span className="name">
        {value.name}
      </span>

      <style jsx>{`
        .user-cell {
          display: flex;
          flex-flow: row;
          align-items: center;
        }

        .avatar-wrapper {
          flex: 0 0 auto;
        }

        .name {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default UserCell;
