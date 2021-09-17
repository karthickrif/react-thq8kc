import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
var logo;
import ClientsTable from './HomeComponents/Clients';
import CasesTable from './HomeComponents/Cases';
import UsersTable from './HomeComponents/Users';
import { GetClientTable } from './Reducers/ClientReducer';
import { GetCasesTable } from './Reducers/CasesReducer';
import { GetUsersTable } from './Reducers/UsersReducer';

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

function HomePage(props) {
  const { dispatch, data, sessionData } = props;
  const [logo, setLogo] = useState({
    img: '',
    clientcount: 0,
    casescount: 0,
    userscount: 0,
  });
  const [fade, setFade] = useState({
    value: true,
    gridWidth: 9,
    navWidth: 'displayClass',
  });
  const [progStatus, setProgStatus] = useState(false);

  function getdata() {
    if (logo.clientcount == 0) {
      dispatch(GetClientTable());
    }
    setLogo({
      img: logo.img,
      clientcount: 1,
      casescount: logo.casescount,
      userscount: logo.userscount,
    });
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }
  function getCases() {
    if (logo.casescount == 0) {
      dispatch(GetCasesTable());
    }
    setLogo({
      img: logo.img,
      clientcount: logo.clientcount,
      casescount: 1,
      userscount: logo.userscount,
    });
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }
  function getUsers() {
    if (logo.userscount == 0) {
      dispatch(GetUsersTable());
    }
    setLogo({
      img: logo.img,
      clientcount: logo.clientcount,
      casescount: logo.casescount,
      userscount: 1,
    });
    setProgStatus(true);
    setTimeout(() => setProgStatus(false), 2000);
  }

  function handleFade() {
    if (fade.value == true) {
      setFade({ value: false, gridWidth: 12, navWidth: 'hideClass' });
    } else {
      setFade({ value: true, gridWidth: 9, navWidth: 'displayClass' });
    }
  }

  return (
    <div>
      <Router>
        <Grid container spacing={1}>
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            className={fade.navWidth}
          >
            <Grid
              container
              spacing={2}
              direction="column"
              className="Home_leftsidebar"
            >
              <Fade in={fade.value}>
                <div>
                  <Grid item>
                    <img
                      src={
                        sessionData != undefined
                          ? sessionData.practiceDetails.logoFile
                          : ''
                      }
                      alt="profile"
                      className="profile_img"
                    />
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/clients" className="homeLink">
                      <Button onClick={getdata} className="sideBarBtn">
                        Clients
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/cases" className="homeLink">
                      <Button onClick={getCases} className="sideBarBtn">
                        Cases
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item className="leftsidebarOptions">
                    <Link to="/home/users" className="homeLink">
                      <Button onClick={getUsers} className="sideBarBtn">
                        Users
                      </Button>
                    </Link>
                  </Grid>
                </div>
              </Fade>
            </Grid>
          </Grid>
          <Grid
            item
            xs={fade.gridWidth}
            sm={fade.gridWidth}
            md={fade.gridWidth}
            lg={fade.gridWidth}
            xl={fade.gridWidth}
            className="gridClass"
          >
            <AppBar position="static" className="home_navBar">
              <Toolbar variant="dense" className="home_toolbar">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleFade}
                >
                  <MenuIcon />
                </IconButton>
                {progStatus == false ? (
                  ''
                ) : (
                  <CircularProgress className="home_tableProgress" />
                )}
              </Toolbar>
            </AppBar>
            <div className="GreetUser">
              Welcome{' '}
              <span className="UserName">
                {sessionData != undefined && sessionData.name != undefined
                  ? sessionData.name + '!'
                  : 'User!'}
              </span>
            </div>
            <div>&nbsp;</div>
            <Switch>
              <Route exact path="/home/clients" children={<ClientsTable />} />
              <Route exact path="/home/cases" children={<CasesTable />} />
              <Route exact path="/home/users" children={<UsersTable />} />
              {/* <Route exact path="/home/cases" children={<CasesTable/>} />
          <Route exact path="/home/users" children={<UsersTable/>} /> */}
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.LoginReducer && state.LoginReducer.loginData,
    sessionData: state.LoginReducer && state.LoginReducer.sessionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
