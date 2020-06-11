import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppNavbar from "./components/layout/AppNavbar";
import Home from "./components/Pages/Homes";
import About from "./components/Pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import uploadproduct from './components/Pages/Upload product/Uploadproduct';
import 'bootstrap/dist/css/bootstrap.min.css';


import AuthState from  './context/auth/AuthState'
import AlertState from  './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () =>  {
  
    return (
      <AuthState>
        <AlertState>
          <Router>
            <Fragment>
              <AppNavbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/product/upload" component={uploadproduct} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AuthState>
    );

  }

export default App;
