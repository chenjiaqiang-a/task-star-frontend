import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/home/home'
import Login from './pages/login/login'
import DoTask from './pages/dotask/dotask'
import Main from './pages/main/main'
import CreateTask from './pages/createtask/createtask'
import Search from './pages/search/search'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/dotask/:id" component={DoTask} />
                <Route path="/main" component={Main} />
                <Route path="/search" component={Search} />
                <Route path="/createtask" component={CreateTask} />
                <Redirect to="/home" />
            </Switch>
        )
    }
}
