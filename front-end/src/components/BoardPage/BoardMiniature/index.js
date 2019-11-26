import React, { Component } from 'react'
import './BoardMiniature.css'
import { Card, Button, OverlayTrigger } from 'react-bootstrap'
import imagePlaceHolder from './placeholders/boardminiature.svg'

export default class BoardMiniature extends Component {

    static defaultProps = {
        image: imagePlaceHolder,
        title: "Board",
        text: "Description"
    }

    render() {
        const { image, title, text, cardOnClick, deleteButtonOnClick } = this.props

        return (
            <Card className='card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.ImgOverlay>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-on-hover">{text}</Card.Text>
                </Card.ImgOverlay>
            </Card>

        )
    }
}
