import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainNavBar.css';
import CollapseNavBarMenu from './CollapseNavBarMenu'
import '../../index.css'

class MainNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogged: true
        }
    }

    componentDidMount() {
        this.setState({ isLogged: true })
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
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
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