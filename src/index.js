import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

import App from './App'
import './index.css'
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

memoryUtils.userInfo = storageUtils.getUserInfo()
memoryUtils.isSignedIn = storageUtils.getIsSignedIn()

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById("root")
)
