import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact component={Home} path="/" />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default Routes
