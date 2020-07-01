import React from 'react';

import Avatar from './Avatar';

function UserCell({
  value,
  theme = 'primary', // primary, secondary
}) {
  return (
    <div className="user-cell">
      <Avatar
        name={value.name}
        imageSrc={value.image}
        theme={theme}
      />

      <span className="name">
        {value.name}
      </span>

      <style jsx>{`
        .user-cell {
          display: flex;
          flex-flow: row;
          align-items: center;
        }

        .name {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}

export default UserCell;
