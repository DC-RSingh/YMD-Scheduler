import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import AddTypesDialog from './AddTypesDialog'

export interface IAddTypesForm {
    Type: string;
}

const AddTypesDialogContainer: React.FC = () => {
    const { uiStateStore, roomStore, staffStore } = useStores();

    const initialValues: IAddTypesForm = {
        Type: ''
    }

    const onSubmit = (addTypes: IAddTypesForm) => {
        uiStateStore.setCreatingType(true);
        
        switch (uiStateStore.addTypesDialogType) {
            case 'Room':
                roomStore.insertRoomType(addTypes);
                break;
            case 'Staff':
                staffStore.insertStaffType(addTypes);
                break;
        }
    }

    return (
        <AddTypesDialog
            show={uiStateStore.addTypesDialogOpen}
            onClose={() => uiStateStore.setAddTypesDialogOpen(false)}
            onSubmit={(addTypes: IAddTypesForm) => onSubmit(addTypes)}
            initialValues={initialValues}
            dialogType={uiStateStore.addTypesDialogType}
            handleAddTypesExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingType}
        />
    )
}

export default observer(AddTypesDialogContainer);
