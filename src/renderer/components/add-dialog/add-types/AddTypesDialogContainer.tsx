import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import AddTypesDialog from './AddTypesDialog'

export interface IAddTypesForm {
    Type: string;
}

const AddTypesDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues: IAddTypesForm = {
        Type: ''
    }

    const onSubmit = (addTypes: IAddTypesForm) => {
        return;
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
