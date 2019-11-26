import React, { Component } from 'react'
import BoardMianiature from '../BoardPage/BoardMiniature'

export default class HomePage extends Component {
    aa = () =>{
        console.log("bbb")
    }

    ee = () =>{
        console.log("eee")
    }

    render() {
        return (
            <div>
                <BoardMianiature deleteButtonOnClick={this.aa} cardOnClick={this.ee}/>
            </div>
        )
    }
}
