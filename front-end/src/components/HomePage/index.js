import React, { Component } from 'react'
import BoardMiniature from '../BoardPage/BoardMiniature'
import { CardDeck, CardColumns } from 'react-bootstrap'
import './HomePage.css'
import BoardNewCard from '../BoardPage/BoardMiniature/BoardNewCard'
import NewBoardModal from '../BoardPage/NewBoardModal'

export default class HomePage extends Component {

    componentDidMount(){

    }

    state = {
        newBoardModalShowState: true
    }

    hideNewBoardModal(){
        this.setState({newBoardModalShowState: false})
    }

    showNewBoardModal(){
        this.setState({newBoardModalShowState: true})
    }

    openNewBoardModal = () => {
        this.showNewBoardModal()
    }

    onHideNewBoardModal = () =>{
        this.hideNewBoardModal()
    }

    createNewBoard = (title, description) =>{
        
    }
    

    render() {
        let {newBoardModalShowState} = this.state

        return (

            <CardColumns className="card-columns">
                <BoardMiniature cardOnClick={this.ee}/>
                <BoardNewCard onClick={this.openNewBoardModal}/>
                <NewBoardModal show={this.state.newBoardModalShowState} onHide={this.onHideNewBoardModal}/>
            </CardColumns>
        )
    }
}
