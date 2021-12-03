import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useStores } from '../store';

const ReactionContainer = (): any => {
    const { routeStore } = useStores();
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        const path = routeStore.redirectedTo;
        if (path && path !== location.pathname) {
            history.push(path);
        }
    }, [routeStore.redirectedTo]);

  return null;
};

/**
 * Controls application redirection by observing Route Store changes.
 */
export default observer(ReactionContainer);
