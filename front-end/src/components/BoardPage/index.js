import React, { Component } from 'react'
import BoardTable from './BoardTable'
import { CardColumns, CardDeck, Container, Modal, Button } from 'react-bootstrap'
import BoardNavBar from './BoardNavBar'
import EditBoardModal from './EditBoardModal'
import EditTaskDropdown from './BoardTable/EditTaskDropdown'
import './BoardPage.css'
import AddNewBoardModal from './AddNewBoardModal'
import BoardTask from './BoardTable/BoardTask'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

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
                    <UserTables/>
                </CardDeck>
                
                <EditBoardModal postURL="" show={showEditModal} onHide={this.hideEditModal}/>
                <AddNewBoardModal postURL="" show={showAddNewTaskModal} onHide={this.hideAddNewTableModal}/>
            </Container>
        )
    }
}

const TABLES = gql`
query {
    user(name: "Steve"){
      boards(id: 0){
        tables{
          id
          name
        }
      }
    }
  }
`;

function UserTables({ cardCallback }) {
    const { loading, error, data } = useQuery(TABLES);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.networkError)
        return <p>Error :(</p>;
    }

    return data.tables.map((table) => (
        <BoardTable key={table.id} name={table.name}>
            <UserTasks />
        </BoardTable>
    ));
}

const TASKS = gql`
query {
user(name: "Steve"){
    boards(id: 0){
      tables(id: 0){
        tasks{
          id
          name
        }
      }
    }
  }
}
`;

function UserTasks({ cardCallback }) {
    const { loading, error, data } = useQuery(TASKS);
    
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.networkError)
        return <p>Error :(</p>;
    }

    return data.tables.map((task) => (
        <BoardTask key={task.id} name={task.name}/>
    ));
}