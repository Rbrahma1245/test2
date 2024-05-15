import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function CustomTextArea({ name, helperText, type, params, disabled, maxLength, errorMessage, ...other }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(params.row[name]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.row[name]]);

  const handleChange = (event) => {
    const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
    setValue(newValue);
    params.onInput(event);
  };

  return (
    <TextareaAutosize
      name={name}
      disabled={disabled}
      maxRows={3}
      minRows={2}
      fullWidth
      maxLength={maxLength}
      type={type}
      value={type === 'number' && value === 0 ? '' : value}
      onChange={handleChange}
      onKeyDown={(event) => {
        if (type === 'number' && event.key === ' ') {
          event.preventDefault();
        } else {
          event.stopPropagation();
        }
      }}
      error={type === 'number' && Number.isNaN(value)}
      helperText={type === 'number' && Number.isNaN(value) ? errorMessage : helperText}
      InputProps={{ maxLength, disableUnderline: true }}
      style={{
        border: `${disabled ? 'none' : '1px solid black'}`,
        borderRadius: '4px',
        paddingLeft: '10px',
        resize: 'none',
        width: '100%',
        backgroundColor: 'transparent',
        color: "#212B36",
        fontSize: "0.875rem",
        fontFamily: "Public Sans, sans-serif",
        fontWeight: "400",
        lineHeight: "14px"
      }}
      {...other}
    />
  );
}

CustomTextArea.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.string,
  type: PropTypes.string,
  params: PropTypes.object,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  errorMessage: PropTypes.string,
};