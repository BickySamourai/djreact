import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // il supprime ça
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from './store/reducers/auth';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhances =  compose; //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || extension chrome

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = (
    <Provider store = {store}>
        <App/>
    </Provider>

);


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();