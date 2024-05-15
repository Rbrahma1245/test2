import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

export default function CustomTextField({ name, helperText, type, params, maxLength, capitalText, errorMessage, onBlur, onChange, ...other }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(params.row[name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.row[name]]);

  const handleChange = (event) => {
    const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
    if (capitalText) {
      event.target.value = newValue.toUpperCase()
    }
    setValue(newValue);
    if (onChange) {
      onChange(event);
    }
  };
  const handleBlur = () => {
    if (onBlur) {
      onBlur(value);
    }
  };
  return (
    <TextField
      name={name}
      fullWidth
      type={type}
      value={type === 'number' && value === 0 ? '' : value}
      onKeyDown={(event) => {
        if (type === 'number' && event.key === ' ') {
          event.preventDefault();
        } else {
          event.stopPropagation();
        }
      }}
      inputProps={{ maxLength, autoComplete: "off", style: { fontSize: '14px' } }}
      onChange={handleChange}
      onBlur={handleBlur}
      error={type === 'number' && Number.isNaN(value)}
      helperText={type === 'number' && Number.isNaN(value) ? errorMessage : helperText}
      InputProps={{ disableUnderline: true }}
      style={{ border: '1px solid black', borderRadius: '4px', paddingLeft: '10px', fontSize: '5px' }}
      {...other}
    />
  );
}

CustomTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  params: PropTypes.object,
  maxLength: PropTypes.number,
  capitalText: PropTypes.bool,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  onBlur: PropTypes.func
};