import React, { Component } from 'react'

import './index.less'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="info">四川大学 计算机学院 大创项目</div>
                <div className="contact">欢迎为我们提意见：123123@scu.edu.cn</div>
            </div>
        )
    }
}
