import React from 'react'
import { Redirect, Route } from "react-router-dom"

export default class AuthRoute extends React.Component {
    state = {}
    render() {
        let token = localStorage.getItem('token')
        return (
            <div>
                {
                    token ? <Route {...this.props}></Route> :
                        <Redirect to="/login"></Redirect>
                }
            </div>
        )
    }
}