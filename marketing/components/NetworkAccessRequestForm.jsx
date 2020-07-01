import { useState } from 'react';

import Input from '~/shared/components/Input';
import Select from '~/shared/components/Select';

function NetworkAccessRequestForm({
  isFetching = false,
  error = '',
  onSubmit,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [userCountRange, setUserCountRange] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name,
      email,
      communityName,
      userCountRange,
      body,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <Input
          type="text"
          label="Name"
          placeholder="Name"
          isRequired
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
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
      <div className="row">
        <Input
          type="text"
          label="Company/School/Institution name"
          placeholder="Company/School/Institution name"
          isRequired
          value={communityName}
          onChange={event => setCommunityName(event.target.value)}
        />
      </div>
      <div className="row">
        <Select
          label="Total Members"
          placeholder="Number of expected members"
          options={[
            {
              label: '0 - 100',
              value: '(0,100)',
            },
            {
              label: '100 - 500',
              value: '(100,500)',
            },
            {
              label: '500 - 2,000',
              value: '(500,2000)',
            },
            {
              label: '2,000 - 5,000',
              value: '(2000,5000)',
            },
            {
              label: '5,000 - 10,000',
              value: '(2000,10000)',
            },
            {
              label: '10,000+',
              value: '(10000,)'
            },
          ]}
          isRequired
          value={userCountRange}
          onChange={event => setUserCountRange(event.target.value)}
        />
      </div>
      <div className="row">
        <Input
          label="Additional comments"
          type="text"
          rows={4}
          value={body}
          onChange={event => setBody(event.target.value)}
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

export default NetworkAccessRequestForm;