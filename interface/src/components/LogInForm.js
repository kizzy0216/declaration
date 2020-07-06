import React, { useState } from 'react';

import Input from './Input';
import Select from './Select';

function LogInForm({
  isFetching = false,
  error = '',
  onSubmit,
}) {
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      email,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          isRequired
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <Input
        label="Send"
        type="submit"
        isFetching={isFetching}
      />

      <style jsx>{`
        .row {
          margin-bottom: 30px;
        }
      `}</style>
    </form>
  );
}

export default LogInForm;
