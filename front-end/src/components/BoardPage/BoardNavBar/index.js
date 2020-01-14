import React, { Component } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import './BoardNavBar.css'
import EditIcon from '../../../assets/icons/EditIcon'

export default class BoardNavBar extends Component {

    static defaultProps = {
        boardTitle: "Board",    
    };

    render() {
        const {boardTitle, editButtonCallback} = this.props

        return (
            <Navbar bg="light" expand="lg" className="board-nav-bar">
                <Navbar.Brand href="#home">{boardTitle}</Navbar.Brand>
                <Nav.Item>
                    <Button variant="outline-light" onClick={editButtonCallback}>
                        <EditIcon/>
                    </Button>
                </Nav.Item>
            </Navbar>
        )
    }
}
