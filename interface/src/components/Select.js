import React from 'react';

function Select({
  label,
  placeholder,
  options = [],
  value = '',
  isAutofocused = false,
  isRequired = false,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) {
  const uniqueId = `input-${(label || '').replace(/[^\w_]/g, '-')}`;
  const optionEls = options.map(({ label, value }) => (
    <option key={value} value={value}>
      {label || value}
    </option>
  ));

  return (
    <div className="select">
      <label htmlFor={uniqueId}>
        {label}
      </label>

      <select
        id={uniqueId}
        value={value}
        required={isRequired}
        autoFocus={isAutofocused}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {placeholder &&
          <option disabled value="">
            {placeholder}
          </option>
        }
        {optionEls}
      </select>

      <style jsx>{`
        .select {
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

        select {
          font-family: var(--font-family-sans-serif);
          width: 100%;
          background: var(--light-gray);
          color: var(--gray);
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

export default Select;
