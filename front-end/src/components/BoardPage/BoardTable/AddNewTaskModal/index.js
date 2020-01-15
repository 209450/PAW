import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BaseModal from '../../../Abstracts/BaseModal'

export default class AddNewTaskModal extends Component {
    render() {
        const { show, onHide, postURL } = this.props

        return (
            <BaseModal show={show} onHide={onHide} title={"Add new Task"}>
                <Form action={postURL} method="POST">
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" >Submit</Button>
                </Form>
            </BaseModal>
        )
    }
}
