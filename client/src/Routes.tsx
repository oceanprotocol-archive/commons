import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Spinner from './components/atoms/Spinner'

// import About from './routes/About'
// import Home from './routes/Home'
// import NotFound from './routes/NotFound'
// import Publish from './routes/Publish/'
// import Search from './routes/Search'
// import Faucet from './routes/Faucet'
// import History from './routes/History'
// import Channels from './routes/Channels'
// import Styleguide from './routes/Styleguide'
// import Topics from './routes/Topics'

// import Asset from './components/templates/Asset'
// import Channel from './components/templates/Channel'
const About = lazy(() => import('./routes/About'))
const Home = lazy(() => import('./routes/Home'))
const NotFound = lazy(() => import('./routes/NotFound'))
const Publish = lazy(() => import('./routes/Publish/'))
const Search = lazy(() => import('./routes/Search'))
const Faucet = lazy(() => import('./routes/Faucet'))
const History = lazy(() => import('./routes/History'))
const Channels = lazy(() => import('./routes/Channels'))
const Styleguide = lazy(() => import('./routes/Styleguide'))
const Topics = lazy(() => import('./routes/Topics'))

const Asset = lazy(() => import('./components/templates/Asset'))
const Channel = lazy(() => import('./components/templates/Channel'))

const Routes = () => (
    <Suspense fallback={<Spinner message="Loading..." />}>
    <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Styleguide} path="/styleguide" />
        <Route component={About} path="/about" />
        <Route component={Publish} path="/publish" />
        <Route component={Search} path="/search" />
        <Route component={Asset} path="/asset/:did" />
        <Route component={Faucet} path="/faucet" />
        <Route component={History} path="/history" />
        <Route component={Topics} path="/topics" />
        <Route component={Channels} exact path="/channels" />
        <Route component={Channel} path="/channels/:channel" />
        <Route component={NotFound} />
    </Switch>
    </Suspense>
)

export default Routes
