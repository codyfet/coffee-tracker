import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './Header.js';
import { Main } from './Main.js';

import { DB_CONFIG } from './Config/config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

export const App = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}
