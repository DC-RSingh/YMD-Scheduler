import { observer } from "mobx-react-lite";
import React from "react";
import LoginDialog, {ILoginForm} from "./LoginDialog";

const LoginDialogContainer: React.FC = () => {
    const initialValues: ILoginForm = {
        username: '',
        password: '',
        remember: false
    };

    const onSubmit = (user: ILoginForm) => {
        return;
    }

    return (
        <LoginDialog
            show={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
        />
    );
};

export default observer(LoginDialogContainer);