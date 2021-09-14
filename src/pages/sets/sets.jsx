import React, { Component } from 'react'
import { Avatar, Button, Col, Row } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons'

import './set.less'

export default class Sets extends Component {
    render() {
        return (
            <div className="sets">
                <h1>个人信息</h1>
                <div className="setting-card">
                    <Row style={{alignItems: "center", height: "100%"}}>
                        <Col className="avatar" xs={24} lg={8}>
                            <Avatar className="image" size={160} icon={<UserOutlined />}></Avatar>
                            <Button >更换头像</Button>
                        </Col>
                        <Col className="details" xs={24} lg={16}>
                            <div className="table">
                                <div className="row"><span>用户名：</span>jack_chen</div>
                                <div className="row"><span>昵称：</span>Jack Chen</div>
                                <div className="row"><span>电子邮箱：</span>2504919775@qq.com</div>
                                <div className="row"><span>电话：</span>15311141414</div>
                                <div className="btn-group">
                                    <Button>更改信息</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
