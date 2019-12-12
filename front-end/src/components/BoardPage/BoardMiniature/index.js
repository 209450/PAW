import React, { Component } from 'react'
import './BoardMiniature.css'
import { Card, Button, OverlayTrigger, Row, Col } from 'react-bootstrap'
import imagePlaceHolder from '../../../assets/placeholders/boardminiature.svg'
import EditIcon from '../../../assets/icons/EditIcon'
import CardHeaderWithIcon from '../../CardHeaderWithIcon'
import BoardMianiatureEditModal from './BoardMianiatureEditModal'

export default class BoardMiniature extends Component {

    static defaultProps = {
        image: imagePlaceHolder,
        title: "Board",
        text: "Description",

    }

    state = {
        editModalShow: false
    }

    showModal = () => {
        this.setState({ editModalShow: true })
    }

    hideModal = () => {
        this.setState({ editModalShow: false })
    }

    iconClicked = (event) => {
        event.stopPropagation()
        this.showModal()
    }


    render() {
        const { image, title, text, cardOnClick } = this.props

        let { editModalShow } = this.state


        return (
            <Card className='card' onClick={cardOnClick} >
                <Card.Header>{title}</Card.Header>
                <Card.Img variant="top" src={image} />
                <BoardMianiatureEditModal show={editModalShow} onHide={this.hideModal} postURL={"/"} />
            </Card>

        )
    }
}
