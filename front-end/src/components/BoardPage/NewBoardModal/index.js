import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default class NewBoardModal extends Component {

    render() {
        let { show } = this.props
        const { onHide, postURL } = this.props

        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>New Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={postURL} method="POST">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
