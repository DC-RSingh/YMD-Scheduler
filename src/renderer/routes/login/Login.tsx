import { observer } from "mobx-react-lite";
import React from "react";
import LoginDialogContainer from "../../components/login-dialog/LoginDialogContainer";
import Image from '../../../assets/img/login-bg.jpg'; // Photo by Johannes Plenio from Pexels
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
    loginWrapper: {
        display: 'flex',
        height: '100vh', // have image take up 100% of viewport height
        background: `linear-gradient(rgba(16, 16, 16, 0.8), rgba(16, 16, 16, 0.8)), url(${Image})`,
        backgroundSize: 'cover',
    },
}));

const Login: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.loginWrapper}>
            <LoginDialogContainer/>
        </div>
    );
};

export default observer(Login);