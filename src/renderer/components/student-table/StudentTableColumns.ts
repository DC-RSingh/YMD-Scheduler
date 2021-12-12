import { Column } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
const StudentTableColumns: Column<any>[] = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'First Name',
        accessor: 'firstName',
    },
    {
        Header: 'Last Name',
        accessor: 'lastName',
    },
    {
        Header: 'Email',
        accessor: 'contactEmail',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'DOB',
        accessor: 'dateOfBirth',
    },
    {
        Header: 'Phone Number',
        accessor: 'contactTelephone',
    },
];

export default StudentTableColumns;