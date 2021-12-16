import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '../../../store'
import AddFiltersDialog from './AddFiltersDialog'

// export interface IAddCredentialForm {
//     Credential: string;
// }

// export interface IAddRestrictionForm {
//     Restriction: string;
// }

// export interface IAddSkillForm {
//     Skill: string;
// }

export interface IAddFiltersForm {
    Skill: string;
    Credential: string;
    Restriction: string;
}

const AddFiltersDialogContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    const initialValues = {
        Credential: '',
        Restriction: '',
        Skill: '',
    }

    const onSubmit = (addFilters: IAddFiltersForm) => {
        return;
    }

    return (
        <AddFiltersDialog
            show={uiStateStore.addFiltersDialogOpen}
            onClose={() => uiStateStore.setAddFiltersDialogOpen(false)}
            onSubmit={(addFilters) => onSubmit(addFilters)}
            initialValues={initialValues}
            dialogType={uiStateStore.addFiltersDialogType}
            handleAddFiltersExists={null}
            handleClearError={null}
            loading={uiStateStore.creatingType}
        />
    )
}

export default observer(AddFiltersDialogContainer);
