import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';

// отрисовка дерева компонент
    ReactDOM.render(
        // Provider из react-redux - передаем store созданный с помощью createStore.
        // Provider использует context API для того, чтобы засунуть в context store, чтобы дочерние компоненты могли до него достучаться
        <BrowserRouter>
            <Provider store = {store}>  
                <App />
            </Provider>
        </BrowserRouter >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
