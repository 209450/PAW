import React, { Component } from 'react';
import {NavDropdown} from 'react-bootstrap'

class CollapseNavBarMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLogged: true,
            nick: "nick"
        }
    }

    render() {
        return (
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" drop='down'>
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }
}

export default CollapseNavBarMenu