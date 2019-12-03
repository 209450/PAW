import React from 'react';
import './App.css';
import { Button, Container, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar'
import MainContainer from './components/MainContainer'
import PageNotFound from './components/PageNotFound'
import { Switch, Router, Route } from 'react-router-dom'

import { createBrowserHistory } from "history";
import HomePage from './components/HomePage';
import BoardPage from './components/BoardPage';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const customHistory = createBrowserHistory();

const pathComponents = {
  PageNotFound: () => <PageNotFound redirectPath='/' />,
  HomePage: () => <HomePage />,
  BoardPage: () => <BoardPage />
}

const client = new ApolloClient({
  uri: 'http://localhost:8080/api/graphql/',
});

function App() {
  const { PageNotFound, HomePage, BoardPage } = pathComponents

  return (
    <ApolloProvider client={client}>
      <Container className='root-container' fluid='true'>
        <Router history={customHistory}>
          <MainNavBar />
          <MainContainer>
            <Switch>
              <Route exact path='/' component={null} />
              <Route exact path='/home' component={HomePage} />
              <Route exact path='/home/:board' component={BoardPage} />
              <Route exact path='/registration' component={null} />
              <Route exact path='/login' component={null} />
              <Route component={PageNotFound} />
            </Switch>
          </MainContainer>

        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
