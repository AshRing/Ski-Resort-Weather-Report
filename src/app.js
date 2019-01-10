import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import 'normalize.css/normalize.css'; //use normalize to do a css-reset. Makes base styles the same across all browsers
import './styles/styles.scss'; //inject css styles into the dom using webpack

const jsx = (
    <div>
        <Dashboard />
        <Footer />
    </div>
);

ReactDOM.render(jsx, document.querySelector('.app'));