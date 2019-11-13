import React from 'react';
import './App.css';
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar'
import MainContainer from './components/MainContainer'

function App() {
  return (
    <Container>
      <MainNavBar/>
      <MainContainer>
        
      </MainContainer>
    </Container>
  );
}

export default App;
