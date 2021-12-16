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
    },
];

export default RoomTableColumns;