/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Column } from 'react-table';
import { convertUnixTimeStamp } from '../../../utils/helper.utils';

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
        Cell: (props): string => {
            return convertUnixTimeStamp(props.value).toLocaleDateString();
        }
    },
    {
        Header: 'Phone Number',
        accessor: 'ContactTelephone',
    },
];

export default StudentTableColumns;