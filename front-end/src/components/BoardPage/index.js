import React, { Component } from 'react'
import BoardTable from './BoardTable'
import { CardColumns, CardDeck } from 'react-bootstrap'

export default class BoardPage extends Component {

    static defaultProps = {
        tableList: ["aa", 3, 5, 6, 3, 6]
    }

    state = {
        tableList: this.props.tableList,
    }


    render() {
        return (
            <CardDeck className="card-columns">
                {this.state.tableList.map((table) => <BoardTable />)}
            </CardDeck>
        )
    }
}
