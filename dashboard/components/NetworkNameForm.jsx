import React, { useState } from 'react';

import Input from '~/shared/components/Input';

const NetworkNameForm = ({
  initialValues = {},
  isFetching,
  onNameChange = () => {},
}) => {
  const [name, setName] = useState(initialValues.name || '');

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleNameChange(event) {
    const updatedName = event.target.value;

    setName(updatedName);
    onNameChange({ name: updatedName });
  }

  return (
    <div className="network-name-form">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          placeholder="Your network name"
          maxLength={30}
          isFetching={isFetching}
          onChange={handleNameChange}
        />
      </form>
    </div>
  );
}

export default NetworkNameForm;
