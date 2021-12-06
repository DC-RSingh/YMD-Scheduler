import React, { useEffect } from 'react';
import { FilterProps, HeaderProps } from 'react-table';
import { TextField } from '@mui/material';

import { camelToWords } from '../../../utils/object.utils';

const DefaultHeader = ({ column }: HeaderProps<any>): JSX.Element => (
  <>{column.id.startsWith('_') ? null : camelToWords(column.id)}</>
);

export const defaultColumn = {
  Filter: DefaultColumnFilter,
  Header: DefaultHeader,
  // When using the useFlexLayout:
  minWidth: 80, // minWidth is only used as a limit for resizing
  width: 100, // width is used for both the flex-basis and flex-grow
  maxWidth: 200, // maxWidth is only used as a limit for resizing
};

// eslint-disable-next-line @typescript-eslint/ban-types
function DefaultColumnFilter<T extends object>({
  column: { id, filterValue, setFilter, render },
}: FilterProps<T>): JSX.Element {
  const [value, setValue] = React.useState(filterValue || '');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  // ensure that reset loads the new value
  useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  return (
    <TextField
      name={id}
      label={render('Header')}
      value={value}
      variant={'standard'}
      onChange={handleChange}
      onBlur={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
}

export default DefaultColumnFilter;
