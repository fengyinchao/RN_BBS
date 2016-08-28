/**
 * Created by jason on 16/5/25.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import App from './components/App';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}