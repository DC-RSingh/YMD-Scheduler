import { observer } from 'mobx-react-lite';
import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { Formik } from 'formik';
import * as Yup from 'yup';
import useStyles from './LoginDialog.styles';
import { LoadingButton } from '@mui/lab';
import LoginIcon from '@mui/icons-material/Login';
import SimpleField from '../simple-field/SimpleField';
import PasswordField from '../password-field/PasswordField';
import CheckboxField from '../checkbox-field/CheckboxField';

/** Interface for the Login Dialog Form containing a username, password and remember me. */
export interface ILoginForm {
    username: string; 
    password: string;
    remember: boolean;
}

/** Properties for a LoginDialog component. */
export type LoginDialogProps = {
    show: boolean;
    initialValues: ILoginForm;
    onSubmit: (user: ILoginForm) => void;
    loginError?: Error;
    handleClearError: () => void;
    loading: boolean;
};

const LoginDialog: React.FC<LoginDialogProps> =  ({
    show,
    initialValues,
    onSubmit,
    loginError,
    handleClearError,
    loading
}: LoginDialogProps) => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    return (
        // <>
        //     <Typography variant="h6">Click the Button for Results!</Typography>
        //     <Typography variant="h6">Counter Store Value: {counterStore.count} </Typography>
        //     <Button title="increment" variant="outlined" color="primary" onClick={() => counterStore.incrementCount()}>
        //         Press Me!
        //     </Button>
        // </>
        <Dialog open={show}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => onSubmit(values)}
                validationSchema={validationSchema}
            >
                {({ isValid, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Login to YMD Scheduler</DialogTitle>
                        <DialogContent>
                            <SimpleField
                                name="username"
                                type="text"
                                label="User Name"
                                placeholder="Enter your User Name"
                                customError={loginError ? loginError.message : undefined}
                                required
                                autoFocus
                            />
                            <PasswordField
                                name="password"
                                label="Password"
                                placeholder="Enter your Password"
                                handleOnChange={() => handleClearError()}
                                customError={loginError ? loginError.message : undefined}
                                required
                            />
                            <CheckboxField 
                                name="rememberMe"
                                label="Remember Me"
                                // isChecked={initialValues.remember}
                            />
                        </DialogContent>
                        <DialogActions className={classes.dialogActions}>
                            <LoadingButton
                                type="submit"
                                disabled={!isValid}
                                color="primary"
                                variant="contained"
                                loading={loading}
                                loadingPosition="end"
                                endIcon={<LoginIcon/>}
                            >
                                Login
                            </LoadingButton>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

export default observer(LoginDialog);
