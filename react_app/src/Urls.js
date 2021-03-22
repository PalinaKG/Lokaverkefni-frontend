import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import PasswordUpdate from "./Components/PasswordUpdate";
import ImportData from "./Components/Import_data";
import Questionnaire from "./Components/Questionnaire";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest}) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

function Urls(props) {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login"> <Login {...props} /></Route>
                    <PrivateRoute exact path="/update_password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/import_data" isAuthenticated={props.isAuthenticated}><ImportData {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/questionnaire" isAuthenticated={props.isAuthenticated}><Questionnaire {...props}/></PrivateRoute>
                    <PrivateRoute exact path="" isAuthenticated={props.isAuthenticated}><Home {...props}/></PrivateRoute>
                </Switch>
            </BrowserRouter>
        </div>
    )
};

export default Urls;