import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Publish from './pages/Publish';
import Details from './pages/Details';
import List from './pages/List';
import NotFound from './pages/NotFound';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={About} path="/about" />
            <Route exact component={Publish} path="/publish" />
            <Route exact component={List} path="/list" />
            <Route exact component={Details} path="/asset/:did" />
            <Route component={NotFound} />
        </Switch>
    </Router>
)

export default Routes
