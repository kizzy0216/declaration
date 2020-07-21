import React from 'react';

import Avatar from '~/shared/components/Avatar';
import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';

const NetworkAvatarForm = ({
  initialValues = {},
  isFetching,
  onFileChange = () => {},
}) => {
  function handleFileChange(event) {
    const file = event.target.files[0];
    onFileChange({ file });
  }

  return (
    <div className="network-avatar-form">
      <label
        className="avatar-wrapper"
        htmlFor="avatar-file-input"
      >
        <Avatar
          imageSrc={initialValues.avatar}
          size="large"
        />
        <input
          id="avatar-file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      {isFetching &&
        <SpinnerIcon />
      }

      <style jsx>{`
        .network-avatar-form {
        }

        label {
          cursor: pointer;
        }

        input {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default NetworkAvatarForm;
