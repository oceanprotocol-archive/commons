import React from 'react'
import { Route, Switch } from 'react-router-dom'

import About from './routes/About'
import Details from './routes/Details'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Publish from './routes/Publish/'
import Search from './routes/Search'
import Styleguide from './routes/Styleguide'

const Routes = () => (
    <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Styleguide} path="/styleguide" />
        <Route component={About} path="/about" />
        <Route component={Publish} path="/publish" />
        <Route component={Search} path="/search" />
        <Route component={Details} path="/asset/:did" />
        <Route component={NotFound} />
    </Switch>
)

export default Routes
