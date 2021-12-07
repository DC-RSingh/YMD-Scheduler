import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import RoomDialog from './RoomDialog'

export interface IRoomForm {
    firstName: string;
    lastName: string;
}

const RoomDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues: IRoomForm = {
        firstName: '',
        lastName: '',
    }

    const onSubmit = (room: IRoomForm) => {
        return;
    }

    return (
        <RoomDialog
            show={uiStateStore.roomDialogOpen}
            onClose={() => uiStateStore.setRoomDialogOpen(false)}
            onSubmit={(room: IRoomForm) => onSubmit(room)}
            initialValues={initialValues}
            dialogType={uiStateStore.roomDialogType}
            handleRoomExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingRoom}
        />
    )
}

export default observer(RoomDialogContainer);
