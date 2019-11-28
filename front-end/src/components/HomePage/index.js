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
                    <NewBoardModal show={newBoardModalShowState} onHide={this.onHideNewBoardModal} />
                </CardColumns>
                {this.state.redirectToBoard}

                <Dogs />
            </div>
        )
    }
}

const USERS = gql`
        {
            users {
              id
              name
              password
            }
          }
        `;

function Dogs({ onDogSelected}) {
    const { loading, error, data } = useQuery(USERS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)

    return (
        <select name="dog" onChange={onDogSelected}>
            {data.dogs.map(dog => (
                <option key={dog.id} value={dog.breed}>
                    {dog.breed}
                </option>
            ))}
        </select>
    );
}