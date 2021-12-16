import { Column } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
const StaffTableColumns: Column<any>[] = [
    {
        Header: 'Id',
        accessor: 'Id',
    },
    {
        Header: 'First Name',
        accessor: 'FirstName',
    },
    {
        Header: 'Last Name',
        accessor: 'LastName',
    },
    {
        Header: 'Type',
        accessor: 'Type',
    },
    {
        Header: 'Max Hours',
        accessor: 'MaxHoursPerWeek',
    },
    {
        Header: 'Email',
        accessor: 'Email',
    },
    {
        Header: 'Gender',
        accessor: 'Gender',
    },
    {
        Header: 'DOB',
        accessor: 'DateOfBirth',
    },
    {
        Header: 'Phone Number',
        accessor: 'Telephone',
    },
];

export default StaffTableColumns;