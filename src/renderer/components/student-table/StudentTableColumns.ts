import { Column } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
const StudentTableColumns: Column<any>[] = [
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
        Header: 'Email',
        accessor: 'ContactEmail',
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
        accessor: 'ContactTelephone',
    },
];

export default StudentTableColumns;