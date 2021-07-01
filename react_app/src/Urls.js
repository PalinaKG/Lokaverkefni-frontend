import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PasswordUpdate from "./Pages/PasswordUpdate";
import ImportData from "./Pages/Import_data";
import Questionnaire from "./Pages/Questionnaire";
// import ResultsHR from "./Components/ResultsHR"
import UserResultsEMG from "./Pages/UserResults/UserResultsEMG";
import UserResultsQuest from "./Pages/UserResults/UserResultsQUEST";
import UserResultsHR from "./Pages/UserResults/UserResultsHR";
import UserResultsHome from "./Pages/UserResults/UserResultsHome";
import UserResultsMSScore from "./Pages/UserResults/UserResultsMSScore";
import UserResultsAll from "./Pages/UserResults/UserResultsAll";

import ResearcherResultsEMG from "./Pages/ResearcherResults/ResearcherResultsEMG";
import ResearcherResultsQuest from "./Pages/ResearcherResults/ResearcherResultsQUEST";
import ResearcherResultsHR from "./Pages/ResearcherResults/ResearcherResultsHR";
import ResearcherResultsHome from "./Pages/ResearcherResults/ResearcherResultsHome";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest }) {
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
              state: { from: location },
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
          <Route exact path="/login">
            {" "}
            <Login {...props} />
          </Route>
          <PrivateRoute
            exact
            path="/update_password/"
            isAuthenticated={props.isAuthenticated}
          >
            <PasswordUpdate {...props} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/import_data"
            isAuthenticated={props.isAuthenticated}
          >
            <ImportData {...props} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/questionnaire"
            isAuthenticated={props.isAuthenticated}
          >
            <Questionnaire {...props} />
          </PrivateRoute>
          {/*                     
                    <PrivateRoute exact path="/researcher_results/" isAuthenticated={props.isAuthenticated}><ResearcherResultsHome {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/researcher_results/hr" isAuthenticated={props.isAuthenticated}><ResearcherResultsHR {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/researcher_results/emg" isAuthenticated={props.isAuthenticated}><ResearcherResultsEMG {...props}/></PrivateRoute>
                    <PrivateRoute exact path="/researcher_results/quest" isAuthenticated={props.isAuthenticated}><ResearcherResultsQuest {...props}/></PrivateRoute> */}

          <PrivateRoute
            exact
            path="/researcher_results/"
            isAuthenticated={props.isAuthenticated}
          >
            <UserResultsHome {...props} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/researcher_results/hr"
            isAuthenticated={props.isAuthenticated}
          >
            <UserResultsHR {...props} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/researcher_results/emg"
            isAuthenticated={props.isAuthenticated}
          >
            <UserResultsEMG {...props} />
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/researcher_results/quest"
            isAuthenticated={props.isAuthenticated}
          >
            <UserResultsQuest {...props} />
          </PrivateRoute>

          <Route exact path="/user_results">
            <UserResultsAll {...props} />
          </Route>
          <Route exact path="/user_results/msscore">
            <UserResultsMSScore {...props} />
          </Route>
          <Route exact path="/user_results/hr">
            <UserResultsHR {...props} />
          </Route>
          <Route exact path="/user_results/emg">
            <UserResultsEMG {...props} />
          </Route>
          <Route exact path="/user_results/quest">
            <UserResultsQuest {...props} />
          </Route>
          <Route exact path="">
            <Home {...props} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Urls;
