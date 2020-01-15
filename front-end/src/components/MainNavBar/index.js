import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainNavBar.css';
import CollapseNavBarMenu from './CollapseNavBarMenu'
import '../../App.css'

class MainNavBar extends Component {
    state = {
        isLogged: false
    }

    componentDidMount() {
    }

    logged = () => {
        return (
            <Nav>
                <CollapseNavBarMenu />
            </Nav>
        )
    }

    unLogged = () => {
        return (
            <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
    }

    render() {
        return (
            <Navbar className="main-nav-bar justify-content-between">
                <Nav>
                    <Nav.Link href="/home">home</Nav.Link>
                </Nav>
                <Navbar.Brand className="logo" href="/">LOGO</Navbar.Brand>
                {this.state.isLogged ? this.logged() : this.unLogged()}
            </Navbar>

        )
    }
}


export default MainNavBar