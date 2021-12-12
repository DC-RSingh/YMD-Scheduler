import React from 'react';
import { useField, useFormikContext } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';

interface DatePickerProps {
    name: string;
    label: string;
}

const DatePickerField: React.FC<DatePickerProps> = ({
    name, label}: DatePickerProps) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                {...field}
                label={label}
                onChange={(newValue) => {
                    setFieldValue(field.name, newValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} helperText={params?.inputProps?.placeholder} />
                )}
            /> 
        </LocalizationProvider>
    )
}

export default DatePickerField;
