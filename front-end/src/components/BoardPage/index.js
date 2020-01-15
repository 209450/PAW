import React, { Component } from 'react'
import BoardTable from './BoardTable'
import { CardColumns, CardDeck, Container, Modal, Button } from 'react-bootstrap'
import BoardNavBar from './BoardNavBar'
import EditBoardModal from './EditBoardModal'
import EditTaskDropdown from './BoardTable/EditTaskDropdown'
import './BoardPage.css'
import AddNewBoardModal from './AddNewBoardModal'

export default class BoardPage extends Component {

    static defaultProps = {
        tableList: ["aa", 3, 5, 6, 3, 6],
    }

    state = {
        tableList: this.props.tableList,
        showEditModal: false,
        showAddNewTaskModal: false,
        editTaskWidth: 0
    }

    showAddNewTableModal = ()=>{
        this.setState({showAddNewTaskModal: true})
    }

    hideAddNewTableModal = ()=>{
        this.setState({showAddNewTaskModal: false})
    }

    addNewTableCallback = ()=>{
        this.showAddNewTableModal()
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
        const {showEditModal, editTaskWidth, showAddNewTaskModal} = this.state

        return (
            <Container className="board-page" fluid>
                <BoardNavBar editButtonCallback={this.editButtonCallback} newTableCallback={this.addNewTableCallback}/>
                <CardDeck className="card-columns flex-row flex-nowrap">
                    {this.state.tableList.map((table) => <BoardTable />)}
                </CardDeck>
                
                <EditBoardModal postURL="" show={showEditModal} onHide={this.hideEditModal}/>
                <AddNewBoardModal postURL="" show={showAddNewTaskModal} onHide={this.hideAddNewTableModal}/>
            </Container>
        )
    }
}
