import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo } from 'react'
import { useStores } from '../../../store'
import RoomDialog from './RoomDialog'

export interface IRoomForm {
    Type: number;
    Name: string;
    RoomSize: number;
    hasPiano: boolean;
}

const RoomDialogContainer: React.FC = () => {
    const { uiStateStore, roomStore } = useStores();

    let roomTypes = roomStore.roomTypes();

    useEffect(() => {
        roomTypes = roomStore.roomTypes();
        console.log(roomStore.newRoomTypesThisSession)
    }, [roomStore.newRoomTypesThisSession]);

    const initialValues: IRoomForm = {
        Type: 0,
        Name: '',
        RoomSize: 0,
        hasPiano: false
    }

    const onSubmit = (room: IRoomForm) => {
        uiStateStore.setCreatingRoom(true);
        roomStore.insertRoom(room);
    }

    return (
        <RoomDialog
            show={uiStateStore.roomDialogOpen}
            onClose={() => uiStateStore.setRoomDialogOpen(false)}
            onSubmit={(room: IRoomForm) => onSubmit(room)}
            initialValues={initialValues}
            dialogType={uiStateStore.roomDialogType}
            roomTypes={roomTypes}
            handleRoomExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingRoom}
        />
    )
}

export default observer(RoomDialogContainer);
