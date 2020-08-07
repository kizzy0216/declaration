import React from 'react';
import Currency from 'currency.js';

import TextInput from '~/components/TextInput';

const FORMATTERS = {
  USD: value => Currency(value, { fromCents: true }),
  JPY: value => Currency(value, { fromCents: true, precision: 0, symbol: '¥' }),
  EUR: value => Currency(value, { fromCents: true, symbol: '€', decimal: ',', separator: '.' }),
};

function CurrencyInput({
  currency = 'USD',
  label = '',
  placeholder = '',
  value = 0, // always cents
  onChange = () => {},
}) {
  const money = FORMATTERS[currency](value).format();

  function handleChange(value) {
    const digits = String(value).match(/\d+/g);
    const cents = digits
      ? parseInt(digits.join(''), 10)
      : 0;

    onChange(cents);
  }

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      keyboardType="numeric"
      value={money}
      onChange={handleChange}
    />
  );
}

export default CurrencyInput;
