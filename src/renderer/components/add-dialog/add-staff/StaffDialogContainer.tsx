import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import StaffDialog from './StaffDialog'

export interface IStaffForm {
    firstName: string;
    lastName: string;
}

const StaffDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues: IStaffForm = {
        firstName: '',
        lastName: '',
    }

    const onSubmit = (staff: IStaffForm) => {
        return;
    }

    return (
        <StaffDialog
            show={uiStateStore.staffDialogOpen}
            onClose={() => uiStateStore.setStaffDialogOpen(false)}
            onSubmit={(staff: IStaffForm) => onSubmit(staff)}
            initialValues={initialValues}
            dialogType={uiStateStore.staffDialogType}
            handleStaffExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingStaff}
        />
    )
}

export default observer(StaffDialogContainer);
