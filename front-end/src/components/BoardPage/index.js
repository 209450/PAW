import React, { Component } from 'react'
import BoardTable from './BoardTable'
import { CardColumns, CardDeck, Container, Modal } from 'react-bootstrap'
import BoardNavBar from './BoardNavBar'
import EditBoardModal from './EditBoardModal'
import EditTaskDropdown from './BoardTable/EditTaskDropdown'
import './BoardPage.css'

export default class BoardPage extends Component {

    static defaultProps = {
        tableList: ["aa", 3, 5, 6, 3, 6],
        showEditModal: false
    }

    state = {
        tableList: this.props.tableList,
        showEditModal: this.props.showEditModal,
        editTaskWidth: 0
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
        const {showEditModal, editTaskWidth} = this.state

        return (
            <Container className="board-page" fluid>
                <BoardNavBar editButtonCallback={this.editButtonCallback}/>
                <CardDeck className="card-columns flex-row flex-nowrap">
                    {this.state.tableList.map((table) => <BoardTable />)}
                </CardDeck>
                <EditBoardModal postURL="" show={showEditModal} onHide={this.hideEditModal}/>
            </Container>
        )
    }
}
