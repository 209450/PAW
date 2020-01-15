import { Container, ButtonToolbar, DropdownButton, Dropdown, Button } from 'react-bootstrap'
import './EditTaskDropdown.css'

import React, { Component } from 'react'

export default class EditTaskDropdown extends Component {

    static defaultProps = {
        width: 250,    
    };

    state = {
        width: this.props.width
    }

    close = () => {
        this.setState({width: 0})
    }

    componentDidMount(){
        // this.close()
    }

    render() {
        return (
            <div className="edit-task-dropdown" style={{ width: this.state.width }}>
                <Button variant="link" className="close-button" onClick={this.close}>&times;</Button>
                {this.props.children}
            </div>
        )
    }
}
