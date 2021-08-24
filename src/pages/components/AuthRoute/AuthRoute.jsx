import React from 'react'
import {Redirect,Route} from "react-router-dom"

export default function AuthRoute(props) {
    let user = localStorage.getItem('musicId')
    return (
                 user ? <Route {...props}></Route> : <Redirect to='/login'></Redirect>
     );
}