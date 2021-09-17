import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreProvider from './store/StoreProvider';
import './index.css';
const Store = () => {
    return (
        <StoreProvider>
            <App />
        </StoreProvider>
    )
}

ReactDOM.render(<Store />, document.getElementById('root'));
