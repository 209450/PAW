import React, { Component } from 'react'
import './BoardMiniature.css'
import { Card, Button, OverlayTrigger, Row, Col } from 'react-bootstrap'
import imagePlaceHolder from '../../../assets/placeholders/boardminiature.svg'
import EditIcon from '../../../assets/icons/EditIcon'
import CardHeaderWithIcon from '../../CardHeaderWithIcon'

export default class BoardMiniature extends Component {

    static defaultProps = {
        image: imagePlaceHolder,
        title: "Board",
        text: "Description"
    }

    ee = (e) => {
        e.stopPropagation()
    }


    render() {
        const { image, title, text, cardOnClick } = this.props

        return (
            <Card className='card' onClick={cardOnClick} >
                <CardHeaderWithIcon title={title} icon={<EditIcon />} />
                <Card.Img variant="top" src={image} />
            </Card>

        )
    }
}
