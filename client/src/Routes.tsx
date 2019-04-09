import React from 'react'
import { Route, Switch } from 'react-router-dom'
import withTracker from './withTracker'

import About from './routes/About'
import Details from './routes/Details/'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Publish from './routes/Publish/'
import Search from './routes/Search'
import Faucet from './routes/Faucet'
import History from './routes/History'
import Styleguide from './routes/Styleguide'

const Routes = () => (
    <Switch>
        <Route exact component={withTracker(Home)} path="/" />
        <Route component={withTracker(Styleguide)} path="/styleguide" />
        <Route component={withTracker(About)} path="/about" />
        <Route component={withTracker(Publish)} path="/publish" />
        <Route component={withTracker(Search)} path="/search" />
        <Route component={withTracker(Details)} path="/asset/:did" />
        <Route component={withTracker(Faucet)} path="/faucet" />
        <Route component={withTracker(History)} path="/history" />
        <Route component={withTracker(NotFound)} />
    </Switch>
)

export default Routes
