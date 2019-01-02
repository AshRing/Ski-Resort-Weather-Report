import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import 'normalize.css/normalize.css'; //use normalize to do a css-reset. Makes base styles the same across all browsers
import '../public/styles.css'; //inject css styles into the dom using webpack

const jsx = (
    <Dashboard />
);

ReactDOM.render(jsx, document.querySelector('.app'));