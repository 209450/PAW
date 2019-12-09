import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import BaseModal from '../../BaseModal'

export default class NewBoardModal extends Component {

    render() {
        const { onHide, show, postURL } = this.props

        return (
                <BaseModal show={show} onHide={onHide} title="New Board">
                    <Form action={postURL} method="POST">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Submit</Button>
                    </Form>
                </BaseModal>
        )
    }
}
