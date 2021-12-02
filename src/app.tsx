import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./renderer/routes/login/Login";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" render={() => <div>404</div>} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector("#app")
);