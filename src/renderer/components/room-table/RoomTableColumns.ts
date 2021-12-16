/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Column } from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
const RoomTableColumns: Column<any>[] = [
    {
        Header: 'Id',
        accessor: 'Id',
    },
    {
        Header: 'Room Name',
        accessor: 'Name',
    },
    {
        Header: 'Type',
        accessor: 'Type',
    },
    {
        Header: 'Room Size',
        accessor: 'RoomSize',
    },
    {
        Header: 'Has Piano?',
        accessor: 'hasPiano',
        Cell: (props): string => {
            let yesNo = 'Yes';
            if (!props.value) {
                yesNo = 'No';
            }
            return yesNo;
        }
    },
];

export default RoomTableColumns;