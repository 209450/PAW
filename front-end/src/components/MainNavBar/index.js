import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainNavBar.css';
import CollapseNavBarMenu from './CollapseNavBarMenu'

class MainNavBar extends Component {
    render() {
        return (
            <Navbar className="main-nav-bar justify-content-between">
                <Nav>
                    <Nav.Link href="/">home</Nav.Link>
                </Nav>
                <Navbar.Brand>LOGO</Navbar.Brand>
                <Nav>
                    <CollapseNavBarMenu/>
                </Nav>
            </Navbar>

        )
    }
}

export default MainNavBar