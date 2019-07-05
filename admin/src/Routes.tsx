import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Search from './routes/Search'
import About from './routes/About'

import Asset from './components/templates/Asset'

const Routes = () => (
    <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Search} path="/search" />
        <Route component={Asset} path="/asset/:did" />
        <Route component={About} path="/about" />
        <Route component={NotFound} />
    </Switch>
)

export default Routes
