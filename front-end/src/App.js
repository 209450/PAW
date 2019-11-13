import React from 'react';
import './App.css';
import { Button, Container, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar'
import MainContainer from './components/MainContainer'
import PageNotFound from './components/PageNotFound'
import { Switch, Router, Route } from 'react-router-dom'

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

function App() {
  return (
    <Container className='root-container' fluid='true'>
      <Router history={customHistory}>
        <MainNavBar />
        <MainContainer>
          <Switch>
            <Route exact path='/' component={null} />
            <Route exact path='/home' component={null} />
            <Route exact path='/registration' component={null} />
            <Route exact path='/login' component={null} />
            <Route component={PageNotFound} />
          </Switch>
        </MainContainer>

      </Router>
    </Container>
  );
}

export default App;
