/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Column } from 'react-table';
import { rootStore } from '../../store';

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
        Cell: (props): string => {
            return rootStore.roomStore.getRoomTypeById(props.value)
        }
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