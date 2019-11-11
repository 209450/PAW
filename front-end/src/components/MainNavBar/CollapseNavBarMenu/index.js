import React, { Component } from 'react';
import {NavDropdown} from 'react-bootstrap'

class CollapseNavBarMenu extends Component {
    render() {
        return (
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" drop='down'>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        )
    }
}

export default CollapseNavBarMenu