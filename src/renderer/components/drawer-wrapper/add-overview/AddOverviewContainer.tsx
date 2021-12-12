import { observer } from 'mobx-react-lite';
import React from 'react'
import AddOverview from './AddOverview';
import { useStores } from '../../../store';

const AddOverviewContainer: React.FC = () => {
    const { uiStateStore } = useStores();

    return (
        <>
            <AddOverview
                open={uiStateStore.addOverviewOpen}
                toggleAddOverview={() => uiStateStore.toggleAddOverview()}
                handleAddRoom={() => uiStateStore.setRoomDialogOpen(true, 'Create')}
                handleAddStaff={() => uiStateStore.setStaffDialogOpen(true, 'Create')}
                handleAddStudent={() => uiStateStore.setStudentDialogOpen(true, 'Create')}
                handleAddCredential={undefined}
                handleAddRestriction={undefined}
                handleAddRoomType={undefined}
                handleAddSkill={undefined}
                handleAddStaffType={undefined}
            />
        </>
    )
}

/**
 * Container for the add overview drawer.
 */
export default observer(AddOverviewContainer);
