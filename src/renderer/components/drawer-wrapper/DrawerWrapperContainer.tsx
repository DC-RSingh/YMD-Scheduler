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
    useEffect(() => {
        const t = window.setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        }, theme.transitions.duration.enteringScreen);
        return () => window.clearTimeout(t);
    }, [uiStateStore.sideNavOpen]);

    return (
        <DrawerWrapper
        navMenuOpen={uiStateStore.sideNavOpen}
        >
        {children}
        </DrawerWrapper>
    );
};

export default observer(DrawerWrapperContainer);
