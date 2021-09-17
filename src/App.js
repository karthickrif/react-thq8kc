import React, { useState, useEffect } from 'react';
import './style.css';
import LoginPage from './Login';
import HomePage from './Home';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import ClientsTable from './HomeComponents/Clients';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
var route;
var snack;
function App(props) {
  const { dispatch, data, sessionData, authStatus } = props;
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (sessionData != undefined) {
      setRedirect(true);
    }
  });
  function handleClose() {
    // setSnackStatus(false);
  }
  if (redirect) {
    return (
      <div>
      <Router>
        <Route exact path="/home" children={<HomePage />} />
        <Redirect to="/home" />
      </Router>
      <Snackbar
          open={authStatus != undefined && authStatus == 'success' && redirect}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
        >
          <MuiAlert severity="success" elevation={6} variant="filled">
            Successfly Logged
          </MuiAlert>
        </Snackbar>
      </div>
    );
  } else {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/login" children={<LoginPage />} />
            <Route exact path="/home" children={<HomePage />} />
            <Redirect from="/" to="/login" />
            <Route exact path="/home/clients" children={<ClientsTable />} />
          </Switch>
        </Router>
        <Snackbar
          open={authStatus != undefined && authStatus == 'failed' && !redirect}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
        >
          <MuiAlert severity="error" elevation={6} variant="filled">
            Sign In Failed
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
    authStatus: state.LoginReducer && state.LoginReducer.authStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
