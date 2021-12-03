import { observer } from "mobx-react-lite";
import React from "react";
import LoginDialog, {ILoginForm} from "./LoginDialog";
import { useStores } from '../../store';

const LoginDialogContainer: React.FC = () => {
    const {uiStateStore, userStore} = useStores();

    const initialValues: ILoginForm = {
        // TODO: Fill in values if remember me is present
        username: '',
        password: '',
        remember: false
    };

    const onSubmit = (user: ILoginForm) => {
        userStore.login(user);
    }

    return (

        <LoginDialog
            show={true}
            initialValues={initialValues}
            onSubmit={(user: ILoginForm) => onSubmit(user)}
            loginError={uiStateStore.loginError}
            handleClearError={() => {uiStateStore.setLoginError(undefined)}}
            loading={uiStateStore.loginAuthenticating}
        />
    );
};

export default observer(LoginDialogContainer);