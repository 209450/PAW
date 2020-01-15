
import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'

export default function CardHeaderWithIcon({title, icon, ...props}) {
    return (
        <Card.Header>
            <Row >
                <Col sm={10} md={10}>
                    {title}
                </Col>
                <Col sm={2} md={2}>
                    {icon}
                </Col>
            </Row>
        </Card.Header>
    )
}
