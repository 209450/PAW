import React, { Component } from 'react'
import { Jumbotron, Card, Button } from 'react-bootstrap'
import './BoardTask.css'

export default class BoardTask extends Component {

    static defaultProps = {
        name: "Task",
    }

    render() {
        const {name} = this.props

        return (
            <div className="container-fluid task-container">
                {name}
            </div>
        )
    }
}
