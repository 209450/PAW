import React, { Component } from 'react'
import { Card, Button, CardColumns } from 'react-bootstrap'
import BoardTask from './BoardTask'
import './Table.css'

export default class BoardTable extends Component {

    static defaultProps = {
        name: "Table",
        taskList: [3, 5, 2, 6, 6]
    }

    state = {
        taskList: this.props.taskList,
    }


    render() {
        const { name } = this.props

        return (
            <Card >
                <Card.Header>{name}</Card.Header>
                    {this.state.taskList.map((task) =>
                        <div className="row ">
                            {/* // <div className="col"> */}
                                <BoardTask />
                            {/* // </div> */}
                        </div>
                    )}
            </Card>
        )
    }
}
