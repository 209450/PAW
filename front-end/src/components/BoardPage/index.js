import React, { Component } from 'react'
import BoardTable from './BoardTable'
import { CardColumns, CardDeck } from 'react-bootstrap'
import BoardNavBar from './BoardNavBar'
import EditBoardModal from './EditBoardModal'

export default class BoardPage extends Component {

    static defaultProps = {
        tableList: ["aa", 3, 5, 6, 3, 6],
        showEditModal: false
    }

    state = {
        tableList: this.props.tableList,
        showEditModal: this.props.showEditModal
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
        const {showEditModal} = this.state

        return (
            <div>
                <BoardNavBar editButtonCallback={this.editButtonCallback}/>
                <CardDeck className="card-columns">
                    {this.state.tableList.map((table) => <BoardTable />)}
                </CardDeck>
                <EditBoardModal postURL="" show={showEditModal} onHide={this.hideEditModal}/>
            </div>
        )
    }
}
