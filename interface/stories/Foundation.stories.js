import React from 'react';

import ActionMenu from '~/components/ActionMenu';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';

export default {
  title: 'Foundation',
};

export const buttons = () => {
  return (
    <>
      <div className="buttons">
        <div className="row">
          <Button
            label="Primary"
            theme="primary"
          />
        </div>
        <div className="row">
          <Button
            label="Secondary"
            theme="secondary"
          />
        </div>
        <div className="row">
          <Button
            label="Tertiary"
            theme="tertiary"
          />
        </div>
        <div className="row">
          <Button
            label="Transparent"
            theme="transparent"
          />
        </div>
      </div>
      <div className="row">
        <ActionMenu
          items={[
            {
              href: '#accept',
              label: 'Accept',
              theme: 'primary',
            },
            {
              href: '#decline',
              label: 'Decline',
              theme: 'secondary',
            }
          ]}
        />
      </div>
      <div className="right-align">
        <ActionMenu
          items={[
            {
              href: '#make-admin',
              label: 'Make Admin',
            },
            {
              href: '#make-ambassador',
              label: 'Make Ambassador',
            },
            {
              href: '#block-user',
              label: 'Block User',
            }
          ]}
        />
      </div>

      <style jsx>{`
        .buttons {
          max-width: 150px;
        }

        .row {
          margin-bottom: 20px;
        }

        .right-align {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}

export const inputs = () => {
  return (
    <div className="inputs">
      <div className="row">
        <Input
          type="text"
          label="Text"
          placeholder="Some text"
        />
      </div>
      <div className="row">
        <Input
          type="email"
          label="Email"
          placeholder="Some email"
        />
      </div>
      <div className="row">
        <Input
          type="password"
          label="Password"
          placeholder="Some password"
        />
      </div>
      <div className="row">
        <Input
          label="Textarea"
          type="text"
          rows={4}
        />
      </div>
      <div className="row">
        <Select
          label="Select"
          placeholder="Some select"
          options={[
            {
              label: 'Option A',
            },
            {
              label: 'Option B',
            },
            {
              label: 'Option C',
            },
          ]}
        />
      </div>

      <style jsx>{`
        .inputs {
          max-width: 50ch;
        }

        .row {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
