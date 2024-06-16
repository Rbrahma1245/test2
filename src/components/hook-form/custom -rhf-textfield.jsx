import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function CustomRHFTextField({ name, helperText, type, readOnlyMode, maxLength, capitalText, errorMessage, onBlur,onChange, ...other }) {
  const { control,trigger  } = useFormContext();
  const shouldCapitalizeText = capitalText === undefined ? false : capitalText;
  const handleError = (value) => {
    if (onBlur) {
      onBlur(value);
    }
  };
  const handleOnChange = async (value) => {
    if (onChange) {
      onChange(value);
    }

        // Trigger validation on change
        await trigger(name);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          inputProps={{ readOnly: readOnlyMode, maxLength, style: shouldCapitalizeText ? { textTransform: 'uppercase' } : {} }}
          disabled={readOnlyMode}
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (field.name === "pagePath" && event.target.value !== "") {
              const newValue = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
              if (newValue !== "") {
                field.onChange(newValue);
                handleError(null);
              }
            } else if (type === 'number') {
              const onChangeValue = event.target.value?.split('.')[0];
              if (maxLength && onChangeValue.length < maxLength) {
                const value = Number(event.target.value) === 0 ? '' : onChangeValue;
                field.onChange(Number(value));
                handleError(null);
              }
            } else {
              const trimmedValue = event.target.value.trimStart();
              if (event.target.value === "" || trimmedValue !== "") {
                const onChangeValue = event.target.value.replace(/^\s+/, '');
                field.onChange(onChangeValue);
                handleError(null);
              }
            }
            handleOnChange(event.target.value);
          }}
          onBlur={() => {
            handleError(field.value);
          }}
          error={!!errorMessage || !!error}
          helperText={errorMessage || error?.message || helperText}
          {...other}
        />
      )}
    />
  );
}

CustomRHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  capitalText: PropTypes.bool,
  maxLength: PropTypes.number,
  readOnlyMode: PropTypes.bool,
  onFocus: PropTypes.func,
  onError: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,

  errorMessage: PropTypes.string,
};