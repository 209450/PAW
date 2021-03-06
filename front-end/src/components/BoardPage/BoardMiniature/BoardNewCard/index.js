import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './BoardNewCard.css'
import image from '../../../../assets/placeholders/boardminiature.svg'

export default class BoardNewCard extends Component {
    render() {
        const { onClick } = this.props

        return (
            <Card bg="light text-center " onClick={onClick} >
                <Card.Header>Click to add a new card</Card.Header>
                <Card.Img variant="top" src={image} style={{ opacity: 0 }} />
            </Card>
        )
    }
}
