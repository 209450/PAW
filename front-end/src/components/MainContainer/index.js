import React, { Component } from 'react';
import {Container} from 'react-bootstrap'
import './MainContainer.css'

class MainContainer extends Component {
    render() {
        return (
            <Container className="content-container" fluid='true'>
                {this.props.children}
            </Container>
        )
    }
}

export default MainContainer