import { useTheme } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react';
import { useStores } from '../../store';
import DrawerWrapper from './DrawerWrapper';

type DrawerWrapperContainerProps = {
  children: ReactNode;
};

const DrawerWrapperContainer = ({ children }: DrawerWrapperContainerProps) => {
    const theme = useTheme();
    const { uiStateStore } = useStores();

    // Resize the Window when a child of the drawer is opened
    useEffect(() => {
        const t = window.setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, theme.transitions.duration.enteringScreen);

        return () => window.clearTimeout(t);
    }, [uiStateStore.sideNavOpen, uiStateStore.addOverviewOpen]);

    return (
        <DrawerWrapper
        navMenuOpen={uiStateStore.sideNavOpen}
        addOverviewOpen={uiStateStore.addOverviewOpen}
        >
        {children}
        </DrawerWrapper>
    );
};

export default observer(DrawerWrapperContainer);
