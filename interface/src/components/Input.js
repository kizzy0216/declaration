import React from 'react';

import Button from './Button';

function Input({
  label,
  value,
  type, // text, email, password, submit
  placeholder,
  isAutofocused = false,
  isRequired = false,
  rows,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) {
  const uniqueId = `input-${type}-${(label || '').replace(/[^\w_]/g, '-')}`;

  return (
    <div className="input">
      {type !== 'submit' && label &&
        <label htmlFor={uniqueId}>
          {label}
        </label>
      }

      {type === 'submit' &&
        <Button
          type={type}
          label={label}
          size="large"
        />
      }

      {type === 'text' && rows &&
        <textarea
          id={uniqueId}
          autoFocus={isAutofocused}
          required={isRequired}
          rows={rows}
        />
      }

      {type !== 'submit' && !rows &&
        <input
          id={uniqueId}
          type={type}
          value={value}
          placeholder={placeholder}
          autoFocus={isAutofocused}
          required={isRequired}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      }

      <style jsx>{`
        .input {
          font-family: var(--font-family-sans-serif);
          width: 100%;
          font-size: 14px;
        }

        label {
          display: block;
          width: 100%;
          margin-bottom: 5px;
          font-weight: 500;
        }

        input, textarea {
          font-family: var(--font-family-sans-serif);
          width: 100%;
          background: var(--light-gray);
          color: black;
          padding-top: 1.3em;
          padding-right: 1.3em;
          padding-bottom: 1.3em;
          padding-left: 1.3em;
          border-radius: var(--border-radius);
        }
      `}</style>
    </div>
  );
}

export default Input;
