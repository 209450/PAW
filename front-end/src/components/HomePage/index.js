import React, { Component } from 'react'
import BoardMiniature from '../BoardPage/BoardMiniature'
import { CardDeck, CardColumns } from 'react-bootstrap'
import './HomePage.css'
import BoardNewCard from '../BoardPage/BoardMiniature/BoardNewCard'

export default class HomePage extends Component {


    ee = () =>{
        console.log("eee")
    }

    render() {
        return (
            <CardColumns className="card-columns">
                <BoardMiniature cardOnClick={this.ee}/>
                <BoardNewCard onClick={this.ee}/>
            </CardColumns>
        )
    }
}
