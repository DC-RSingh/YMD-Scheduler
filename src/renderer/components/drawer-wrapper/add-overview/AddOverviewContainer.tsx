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
                handleAddClass={null}
                handleAddStaff={null}
                handleAddStudent={null}
            />
        </>
    )
}

/**
 * Container for the add overview drawer.
 */
export default observer(AddOverviewContainer);
