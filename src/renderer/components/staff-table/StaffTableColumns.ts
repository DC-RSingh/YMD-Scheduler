/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Column } from 'react-table';
import { convertUnixTimeStamp } from '../../../utils/helper.utils';
import { rootStore } from '../../store';

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
        Cell: (props): string => {
            return rootStore.staffStore.getStaffTypeById(props.value)
        }
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
        Cell: (props): string => {
            return convertUnixTimeStamp(props.value).toLocaleDateString();
        }
    },
    {
        Header: 'Phone Number',
        accessor: 'Telephone',
    },
];

export default StaffTableColumns;