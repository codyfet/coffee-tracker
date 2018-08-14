import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route} from 'react-router-dom';
import {Search} from './Search.js';
import {Profile} from './Profile.js';
import {Tracker} from './Tracker.js';
import {Rating} from './Rating.js';

export const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Tracker} />
                <Route path='/rating' component={Rating} />
                <Route path='/search' component={Search} />
                <Route path='/profile' component={Profile} />
            </Switch>
        </div>
    )
}