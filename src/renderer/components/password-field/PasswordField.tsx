import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useField } from 'formik';
import React, { useState } from 'react';
import useStyles from './PasswordField.styles';
import VisibilityIcon from '../visibility-icon/VisibilityIcon';

type PasswordFieldProps = {
  name: string;
  label: string;
  handleOnChange: (e: React.FormEvent<HTMLDivElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  helperText?: string;
  customError?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  autoFocus,
  helperText,
  customError,
  handleOnChange,
}: PasswordFieldProps) => {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const [visible, setVisible] = useState(false);

  const handleMouseDownIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const inputLabel = `${label} ${required ? "*" : "(Optional)"}`;

  return (
    <FormControl
      variant="outlined"
      className={classes.root}
      error={meta.touched && (!!meta.error || !!customError)}
      onChange={(e) => {
        field.onChange(e);
        handleOnChange(e);
      }}
      fullWidth
    >
      <InputLabel htmlFor={name}>{inputLabel}</InputLabel>
      <OutlinedInput
        id={name}
        label={inputLabel}
        type={visible ? 'text' : 'password'}
        autoFocus={autoFocus}
        placeholder={placeholder}
        required={required}
        endAdornment={
            <VisibilityIcon
            position="end"
            visible={visible}
            handleClickShowIcon={() => setVisible(!visible)}
            handleMouseDownIcon={handleMouseDownIcon}
          />
        }
        {...field}
      />
      {((meta.touched && (meta.error || customError)) || helperText) && (
        <FormHelperText className={classes.helperText}>
          {customError || helperText || meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;
