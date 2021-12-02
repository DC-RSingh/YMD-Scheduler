import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./renderer/routes/login/Login";
import {StyledEngineProvider, ThemeProvider, CssBaseline, responsiveFontSizes} from "@mui/material";

const theme = 2;

const App: React.FC = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" render={() => <div>404</div>} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector("#root")
);