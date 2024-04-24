import React from 'react';

const MySelect = ({ options, baseOption, valueField, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={event => onChange(event.target.value)}
    >
      <option disabled value="">{baseOption}</option>
      {options.map(option =>
        <option key={option[valueField]} value={option[valueField]}>
          {option.name}
        </option>
      )}
    </select>
  );
};

export default MySelect;