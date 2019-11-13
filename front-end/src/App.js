import React from 'react';
import './App.css';
import {Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar'

function App() {
  return (
    <Container>
      <MainNavBar/>
    </Container>
  );
}

export default App;
