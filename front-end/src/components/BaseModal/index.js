import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class BaseModal extends Component {

    render() {
        const { show, onHide, title } = this.props

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        )
    }
}
