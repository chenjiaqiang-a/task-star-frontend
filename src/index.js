import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import {
    ConfigProvider,
    Empty,
} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';


import App from './App'
import './index.css'
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
import noResult from './assets/images/no-result.png'

memoryUtils.userInfo = storageUtils.getUserInfo()
memoryUtils.isSignedIn = storageUtils.getIsSignedIn()

const emptyRender = () => (
    <Empty 
        image={<img src={noResult} />}
        description="未搜索到任务"
    />
)

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={locale} renderEmpty={emptyRender}>
            <App/>
        </ConfigProvider>
    </BrowserRouter>,
    document.getElementById("root")
)
