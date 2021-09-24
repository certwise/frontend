import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './store/StoreProvider';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
const Store = () => {
    return (
        <StoreProvider>
            <Router>
                <App />
            </Router>
        </StoreProvider>
    )
}

ReactDOM.render(<Store />, document.getElementById('root'));
