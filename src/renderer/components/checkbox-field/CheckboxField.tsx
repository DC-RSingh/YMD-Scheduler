import React from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { useField } from 'formik';

interface CheckboxFieldProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  isChecked?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ 
    name, label, required, disabled, fullWidth = true, isChecked = false
}: CheckboxFieldProps) => {
  const [field, meta] = useField({ name, type: 'checkbox' });

  const [checked, setChecked] = React.useState(isChecked);

  return (
    <FormControl
      id={name}
      error={meta.touched && !!meta.error}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      <FormControlLabel
        checked={checked}
        {...field}
        control={
          <Checkbox
            checked={checked}
            color="primary"
            value={name}
            onChange={(e) => {setChecked(e.target.checked); field.checked = checked; console.log(`${field.checked}`);}}
          />
        }
        // onChange={(e) => {field.onChange(e); console.log(`State Change: ${field.checked}`)} }
        // onChange={() => {setChecked(!checked); console.log(`${checked}`)}}
        label={label}
      />
    </FormControl>
  );
};

export default CheckboxField;
// import React from 'react';
// import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
// import { useField } from 'formik';

// interface Props {
//   name: string;
//   label: string;
//   required?: boolean;
//   disabled?: boolean;
// }

// const CheckboxField: React.FC<Props> = ({ name, label, required, disabled }: Props) => {
//   const [field, meta] = useField({ name, type: 'checkbox' });

//   return (
//     <FormControl
//       id={name}
//       error={meta.touched && !!meta.error}
//       required={required}
//       disabled={disabled}
//       fullWidth
//     >
//       <FormControlLabel
//         checked={field.checked}
//         {...field}
//         control={
//           <Checkbox
//             checked={field.checked}
//             color="primary"
//             value={name}
//             onChange={field.onChange}
//           />
//         }
//         label={label}
//       />
//     </FormControl>
//   );
// };

// export default CheckboxField;
