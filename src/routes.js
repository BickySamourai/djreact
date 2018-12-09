import React from 'react'

import { Route } from 'react-router-dom';
import ArticleListView from './containers/ArticleListView';
import ArticleDetailView from './containers/ArticleDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleListView}></Route>
        <Route exact path='/articles/:articleID/' component={ArticleDetailView}></Route>
        <Route exact path='/login/' component={Login}></Route>
        <Route exact path='/signup/' component={Signup}></Route>


    </div>
);

export default BaseRouter;