import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '../../../store';
import NavigationMenu from './NavigationMenu';

const NavigationMenuContainer: React.FC = () => {
    const {uiStateStore, routeStore} = useStores();

    return (
        <NavigationMenu 
            open={uiStateStore.sideNavOpen}
            toggleSidenav={() => uiStateStore.toggleSideNav()}
            handleRedirect={(path) => routeStore.redirect(path)}
        />
    )
}

export default observer(NavigationMenuContainer);
