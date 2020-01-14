import React from 'react'
import EditIcon from '../../assets/icons/EditIcon'
import { Button } from 'react-bootstrap'

export default function EditButton({ onClick, ...props}) {
    return (
        <Button variant="link" onClick={onClick}>
            <EditIcon />
        </Button>
    )
}
