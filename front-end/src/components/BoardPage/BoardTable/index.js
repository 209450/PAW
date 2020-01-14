import React, { Component } from 'react'
import { Card, Button, CardColumns, Navbar, Nav, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import BoardTask from './BoardTask'
import './Table.css'
import EditIcon from '../../../assets/icons/EditIcon'
import BoardEditModal from '../BoardEditModal'
import EditButton from '../../EditButton'
import './Table.css'

export default class BoardTable extends Component {

    static defaultProps = {
        name: "Table",
        taskList: [3, 5, 2, 6, 6]
    }

    state = {
        taskList: this.props.taskList,
    }

    showEditModal = () =>{
        this.setState({showEditModal: true})
    }

    hideEditModal = () =>{
        this.setState({showEditModal: false})
    }

    editButtonCallback = () =>{
        this.showEditModal()
    }


    render() {
        const { name, editButtonOnClick } = this.props
        const { showEditModal} = this.state

        return (
            <Card className="board-table">
                <Card.Header>
                    {name}
                </Card.Header>
                {this.state.taskList.map((task) =>
                    <div className="row ">
                        {/* // <div className="col"> */}
                        <BoardTask />
                        {/* // </div> */}
                    </div>
                )}
                <Card.Footer>
                    <EditButton onClick={this.editButtonCallback}/>
                </Card.Footer>
                <BoardEditModal postURL="" show={showEditModal} onHide={this.hideEditModal} />
            </Card>
        )
    }
}
