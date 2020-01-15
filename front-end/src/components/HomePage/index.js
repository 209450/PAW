import React, { Component } from 'react'
import BoardMiniature from '../BoardPage/BoardMiniature'
import { CardDeck, CardColumns } from 'react-bootstrap'
import './HomePage.css'
import BoardNewCard from '../BoardPage/BoardMiniature/BoardNewCard'
import NewBoardModal from '../BoardPage/NewBoardModal'
import { Link, useRouteMatch, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";

export default class HomePage extends Component {

    static defaultProps = {
        boardList: ["aa"]
    }

    state = {
        newBoardModalShowState: false,
        boardList: this.props.boardList,
        redirectToBoard: null
    }

    componentDidMount() {

    }


    hideNewBoardModal() {
        this.setState({ newBoardModalShowState: false })
    }

    showNewBoardModal() {
        this.setState({ newBoardModalShowState: true })
    }

    openNewBoardModal = () => {
        this.showNewBoardModal()
    }

    onHideNewBoardModal = () => {
        this.hideNewBoardModal()
    }

    cardOnClick = (event) => {
        this.setState({ redirectToBoard: <Redirect to={`/home/id`} /> })
    }


    render() {
        let { newBoardModalShowState } = this.state

        return (
            <div>
                <CardColumns className="card-columns">
                    {this.state.boardList.map((board) => <BoardMiniature cardOnClick={this.cardOnClick.bind(board)} />)}
                    <BoardNewCard onClick={this.openNewBoardModal} />
                    <NewBoardModal postURL="" show={newBoardModalShowState} onHide={this.onHideNewBoardModal} />
                </CardColumns>
                {this.state.redirectToBoard}
            </div>
        )
    }
}

