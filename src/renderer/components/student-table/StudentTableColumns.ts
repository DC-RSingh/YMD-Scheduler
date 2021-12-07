import { Column } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
const StudentTableColumns: Column<any>[] = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Last Name',
        accessor: 'last_name',
    },
    {
        Header: 'Email',
        accessor: 'contact_email',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'DOB',
        accessor: 'date_of_birth',
    },
    {
        Header: 'Phone Number',
        accessor: 'contact_telephone',
    },
];

export default StudentTableColumns;