import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Styleguide from './pages/Styleguide'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact={true} component={Home} path="/" />
            <Route component={Styleguide} path="/styleguide" />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default Routes
