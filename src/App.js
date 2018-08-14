import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './Header.js';
import {Main} from './Main.js';

import "./Styles/main.less";

export const App = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}
