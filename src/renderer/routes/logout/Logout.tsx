import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import ConfirmationDialog from '../../components/confirmation-dialog/ConfirmationDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStores } from '../../store';

const Logout: React.FC = () => {
    const { routeStore, userStore } = useStores();
    const [showLogoutDialog, setShowLogoutDialog] = useState(true);

    const handleLogout = () => {
        // log them out, but make sure all transactions are done before doing so
        userStore.authenticateFail();
        routeStore.redirect('/');
    };

    return (
        <ConfirmationDialog 
            show={showLogoutDialog}
            title={"Logout"}
            body="Are you sure you want to logout?"
            acceptButtonText={"Logout"}
            cancelButtonText={"Cancel"}
            onConfirm={() => handleLogout()}
            onClose={() => {setShowLogoutDialog(false); routeStore.redirect('/');}}
            endIcon={<LogoutIcon/>}
        />
    );
}

export default observer(Logout);
