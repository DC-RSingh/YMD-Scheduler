import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Redirect} from "react-router-dom";
import Login from "./renderer/routes/login/Login";
import Schedule from "./renderer/routes/schedule/Schedule";
import {StyledEngineProvider, ThemeProvider, CssBaseline, responsiveFontSizes} from "@mui/material";
import ymdTheme from "./assets/themes/ymd-theme";
import useStyles from "./app.styles";
import GlobalStyles from "./renderer/components/GlobalStyles";
import { configure } from "mobx";
import { rootStore } from "./renderer/store";
import ReactionContainer from "./renderer/components/ReactionContainer";
import DrawerWrapperContainer from "./renderer/components/drawer-wrapper/DrawerWrapperContainer";
import ToolbarContainer from "./renderer/components/toolbar/ToolbarContainer";
import localForage from 'localforage';
import { create } from "mobx-persist";
import Logout from "./renderer/routes/logout/Logout";
import Student from "./renderer/routes/student/Student";
import Staff from "./renderer/routes/staff/Staff";

configure({enforceActions: 'observed'});

const theme = responsiveFontSizes(ymdTheme());

// Configure Local Forage
localForage.config({
    name:'your-music-scheduler-db',
    driver: localForage.INDEXEDDB,
});

/**
 * The main app component comprising of the DOMtree for this application.
 * @returns The main app component
 */
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
                    <Route path="/login" component={Login} />
                    <DrawerWrapperContainer>
                        <ToolbarContainer />
                        <Route path="/schedule" exact component={Schedule}/>
                        <Route path="/student" exact component={Student} />
                        <Route path="/staff" exact component={Staff} />
                        <Route path="/room" exact component={Schedule} />
                        <Route path="/settings" component={Schedule} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/" exact
                            render={() => 
                                rootStore.userStore.authenticated ? (
                                    <Redirect to="/schedule"/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            }
                        />
                    </DrawerWrapperContainer>
                    <ReactionContainer/>
                </div>
            </Router>
            </Suspense>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

/**
 * Fetches values that persist after app close from local storage.
 */
const hydrate = create({
    storage: localForage,
    jsonify: true,
});

/**
 * Renders the App after fetching values from local storage and other pre-app loading tasks.
 */
const renderApp = () => {
    Promise.all([
        hydrate('uiState', rootStore.uiStateStore),
    ]).then(() => {
        ReactDOM.render(<App />, document.querySelector("#root")); // Render the React DOM tree
    });
}

// Render the App 
renderApp();
