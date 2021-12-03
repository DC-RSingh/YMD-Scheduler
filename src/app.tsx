import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./renderer/routes/login/Login";
import Schedule from "./renderer/routes/schedule/Schedule";
import {StyledEngineProvider, ThemeProvider, CssBaseline, responsiveFontSizes} from "@mui/material";
import ymdTheme from "./assets/themes/ymd-theme";
import useStyles from "./app.styles";
import GlobalStyles from "./renderer/components/GlobalStyles";
import { configure } from "mobx";
import { rootStore } from "./renderer/store";

configure({enforceActions: 'observed'});

const theme = responsiveFontSizes(ymdTheme());

const App: React.FC = () => {
    // Use custom styles creating in app.styles
    const classes = useStyles();

    // Remove the preload div from document when app first loads
    useEffect(() => {
        const preload = document.getElementById('preload');
        if (preload) preload.remove();
    }, []);

    return (
        // Override MUI styles with styles we created
        <StyledEngineProvider injectFirst>
            {/* Allows Theme to be accessed down the React Tree */}
            <ThemeProvider theme={theme}>
            {/* Provides a fallback when components are still rendering */}
            <Suspense fallback={null}>
            <Router>
                <div className={classes.app}>
                    <CssBaseline />
                    <GlobalStyles />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/schedule" component={Schedule}/>
                        <Route path="/" exact
                            render={() => 
                                rootStore.userStore.getAuthenticationStatus() ? (
                                    <Redirect to="/schedule"/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            }
                        />
                    </Switch>
                </div>
            </Router>
            </Suspense>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);