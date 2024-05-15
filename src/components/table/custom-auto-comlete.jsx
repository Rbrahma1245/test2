import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@mui/material/Autocomplete';

export default function CustomAutocomplete({ name, helperText, options, inputLable, width, margin, paramsData, onChange, optionLabel, ...other }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (optionLabel) {
      setValue(optionLabel);
    }
  }, [optionLabel]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue.value)
  };

  const mappedOptions = options.map((option) => ({
    value: option,
    label: option[inputLable],
  }));

  return (
    <Autocomplete
      fullWidth
      options={mappedOptions}
      value={value || ''}
      onChange={handleChange}
      getOptionLabel={(option) => {
        if (option === '' || option === undefined || option === null) {
          return ' ';
        }
        return option.label === undefined ? "" : option.label;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          fullWidth
          error={!mappedOptions.map((opt) => opt.value).includes(value)}
          // helperText={!mappedOptions.map(opt => opt.value).includes(value) ? 'Invalid option' : helperText}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: null,
            style: { fontSize: '14px' },
          }}
          style={{
            border: '1px solid black',
            borderRadius: '4px',
            paddingLeft: '10px',
            width,
            margin,
            fontSize: '14px',
          }}
          {...other}
        />
      )}
    />
  );
}

CustomAutocomplete.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.string,
  options: PropTypes.array,
  inputLable: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  paramsData: PropTypes.object,
  onChange: PropTypes.func,
  optionLabel: PropTypes.object
};