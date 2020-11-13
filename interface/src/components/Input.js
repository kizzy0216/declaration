import React from 'react';

import Button from './Button';
import SpinnerIcon from './icons/SpinnerIcon';

function Input({
  label,
  value,
  type, // text, email, password, submit
  placeholder,
  rows,
  maxLength,
  inputFieldClassName,
  isAutofocused = false,
  isRequired = false,
  isFetching = false,
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
          isFetching={isFetching}
        />
      }

      {type === 'text' && rows &&
        <textarea
          id={uniqueId}
          autoFocus={isAutofocused}
          required={isRequired}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      }

      {type !== 'submit' && !rows &&
        <input
          id={uniqueId}
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={isAutofocused}
          required={isRequired}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={inputFieldClassName && inputFieldClassName}
        />
      }


      {isFetching && type !== 'submit' &&
        <span className="icon-wrapper">
          <SpinnerIcon fill="inherit" />
        </span>
      }

      <style jsx>{`
        .input {
          font-family: var(--font-family-sans-serif);
          width: 100%;
          position: relative;
        }

        label {
          display: block;
          width: 100%;
          margin-bottom: 5px;
          font-weight: 500;
          font-size: 14px;
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
          font-size: 14px;
        }

        textarea {
          white-space: pre-line;
        }

        .icon-wrapper {
          position: absolute;
          top: 0;
          right: 0;
        }

        .search-box {
          width: 150px;
          height: 30px;
          font-family:  var(--font-family-sans-serif);
          font-size: 14px;
          color: #999;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

export default Input;
