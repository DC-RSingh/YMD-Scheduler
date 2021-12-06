import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import ClassDialog from './ClassDialog'

export interface IClassForm {
    firstName: string;
    lastName: string;
}

const ClassDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues: IClassForm = {
        firstName: '',
        lastName: '',
    }

    const onSubmit = (registeredClass: IClassForm) => {
        return;
    }

    return (
        <ClassDialog
            show={uiStateStore.classDialogOpen}
            onClose={() => uiStateStore.setClassDialogOpen(false)}
            onSubmit={(registeredClass: IClassForm) => onSubmit(registeredClass)}
            initialValues={initialValues}
            dialogType={uiStateStore.classDialogType}
            handleClassExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingClass}
        />
    )
}

export default observer(ClassDialogContainer);
