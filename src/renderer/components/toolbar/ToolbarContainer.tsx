import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../store';
import Toolbar from './Toolbar';

const ToolbarContainer: React.FC = () => {
    const {uiStateStore} = useStores();

    return (
        <Toolbar
            sideNavOpened={uiStateStore.sideNavOpen}
            addOverviewOpened={uiStateStore.addOverviewOpen}
            toggleAddOverview={() => uiStateStore.toggleAddOverview()}
            handleNotificationsOpen={null}  // temporary until notifications are setup
        />
    )
}

export default observer(ToolbarContainer);
