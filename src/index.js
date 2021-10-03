import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import {
    ConfigProvider,
} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';


import App from './App'
import './index.css'
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

memoryUtils.userInfo = storageUtils.getUserInfo()
memoryUtils.isSignedIn = storageUtils.getIsSignedIn()

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={locale}>
            <App/>
        </ConfigProvider>
    </BrowserRouter>,
    document.getElementById("root")
)
