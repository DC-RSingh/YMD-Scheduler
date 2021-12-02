import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./renderer/routes/login/Login";
import {StyledEngineProvider, ThemeProvider, CssBaseline, responsiveFontSizes} from "@mui/material";
import ymdTheme from "./assets/themes/ymd-theme";
import useStyles from "./app.styles";

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
                            <Switch>
                                <Route path="/" exact component={Login} />
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