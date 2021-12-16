/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Column } from 'react-table';
import { electronService } from '../../../services/electron.service';

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
            const { roomType } = electronService.ipcRenderer.sendSync('retrieve-roomType-by-id', props.value);
            return roomType[0].Type; // FIXME: this is cryptic and needs to be changed from src/database/roomType.ts
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