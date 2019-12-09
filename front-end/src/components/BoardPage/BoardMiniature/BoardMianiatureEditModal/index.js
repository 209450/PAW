import React, { Component } from 'react'
import BaseModal from '../../../BaseModal'
import { Form, Button } from 'react-bootstrap'

export default class BoardMianiatureEditModal extends Component {
    render() {
        const {show, onHide, postURL} = this.props

        return (
            <BaseModal show={show} onHide={onHide} title="Edit">
                <Form action={postURL} method="POST">
                        <Form.Group>
                            <Form.Label>New Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter new title" required/>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Submit</Button>
                    </Form>
            </BaseModal>
        )
    }
}
