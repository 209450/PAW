import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

export default class PageNotFound extends Component {

    static defaultProps = {
        timeToRedirect : 10 
    }

    state = {
        timeToRedirect: this.props.timeToRedirect,
    }

    componentDidMount() {
        this.updateCounter = setInterval(this.countDownTime, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.updateCounter)
    }

    countDownTime = () => {
        this.setState({ timeToRedirect: this.state.timeToRedirect - 1 })
    }

    timeUpToRedirect = () => {
        if(this.state.timeToRedirect <= 0) return <Redirect to={this.props.redirectPath} />
        else return null
    }

    render() {

        return (
            <Alert variant='danger'>
                <h1>404</h1>
                <h2>Page not found!</h2>
                <h3>Redirect in {this.state.timeToRedirect}...</h3>
                {this.timeUpToRedirect()}
            </Alert>
        )
    }
}
