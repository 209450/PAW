import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import './BoardNewCard.css'
import image from './placeholders/boardminiature.svg'

export default class BoardNewCard extends Component {
    render() {
        const { cardOnClick } = this.props

        return (
            <Card bg="light text-center " onClick={cardOnClick} className={"card"} >
                <Card.Img variant="top" src={image} style={{ opacity: 0 }} />
                <Card.ImgOverlay>
                    <Card.Text>
                        <blockquote className="blockquote card-body">
                            <p>
                                New Board
                         </p>

                        </blockquote>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        )
    }
}
