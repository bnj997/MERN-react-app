import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'

//Switch is like an if statement that only evaluations one of the routes
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
};

export default App;
