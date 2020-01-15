import React, { Component } from 'react'
import { Jumbotron, Card, Button, Container, Col, Row, ListGroup } from 'react-bootstrap'
import './BoardTask.css'
import EditButton from '../../../EditButton'
import EditTaskDropdown from '../EditTaskDropdown'
import EditTaskModal from '../EditTaskModal'

export default class BoardTask extends Component {

    static defaultProps = {
        name: "Task",
        showModal: false,
    }

    state = {
        showModal: this.props.showModal
    }

    showEditModal = () =>{
        this.setState({showModal: true})
    }

    hideEditModal = () =>{
        this.setState({showModal: false})
    }

    editButtonCallback = () =>{
        this.showEditModal()
    }


    render() {
        const { name } = this.props
        const {showModal} = this.state

        return (
            <Container className="task-container no-gutters" fluid>
                <ListGroup>
                    <ListGroup.Item>{name}</ListGroup.Item>
                    <ListGroup.Item className="text-center">
                        <EditButton onClick={this.editButtonCallback}/>
                    </ListGroup.Item>
                </ListGroup>
                
                <EditTaskModal postURL="" show={showModal} onHide={this.hideEditModal}/>
            </Container>
        )
    }
}
