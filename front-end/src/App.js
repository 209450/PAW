import React from 'react';
import './App.css';
import { Button, Container, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar'
import MainContainer from './components/MainContainer'

function App() {
  return (
    <Container className='root-container' fluid='true'>
      <MainNavBar />
      <MainContainer>
        
      </MainContainer>
    </Container>
  );
}

export default App;
