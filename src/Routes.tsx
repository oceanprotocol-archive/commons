import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import About from './pages/About'
import Details from './pages/Details'
import Home from './pages/Home'
import List from './pages/List'
import NotFound from './pages/NotFound'
import Publish from './pages/Publish'

const Routes = () => (
    <Router>
        <Switch>
            <Route exact={true} component={Home} path="/" />
            <Route component={About} path="/about" />
            <Route component={Publish} path="/publish" />
            <Route component={List} path="/list" />
            <Route component={Details} path="/asset/:did" />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default Routes
