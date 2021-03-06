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
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Login from './components/Login/App';
  
const customHistory = createBrowserHistory();

const pathComponents = {
  PageNotFound: () => <PageNotFound redirectPath='/' />,
  HomePage: () => <HomePage />,
  BoardPage: () => <BoardPage />
}
const pathFormsComponents = {
  LoginForm: () => <Login headerText="Sing In" postURL={'/login'} />,
  RegistrationForm: () => <Login headerText="Register" postURL={'/registration'}/>
}


const requestSettings = (operation) => {
  // const token = localStorage.getItem()
  operation.setContext(
    {
      headers: {
        'content-type': 'application/json',
      }
    }
  )

}

const client = new ApolloClient({
  uri: 'api/graphql/',
  request: requestSettings,
})

function App() {
  const { PageNotFound, HomePage, BoardPage } = pathComponents
  const { LoginForm, RegistrationForm } = pathFormsComponents
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
              <Route exact path='/register' component={RegistrationForm} />
              <Route exact path='/login' component={LoginForm} />
              <Route component={PageNotFound} />
            </Switch>
          </MainContainer>
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
