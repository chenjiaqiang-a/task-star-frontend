import React, { Component } from 'react'
import { Avatar, Button, Col, Row, Tooltip } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons'

import './sets.less'
import Editable from '../../components/Editable'
import memoryUtils from '../../utils/memoryUtils';

export default class Sets extends Component {
    state = {
        username: "",
        nickname: "",
        email: "",
        phone: "",
        userId: "",
        onEditDetail: false,
    }
    componentDidMount() {
        let {username, email, nickname, phone, userId} = memoryUtils.userInfo
        this.setState({username, email, nickname, phone, userId})
    }
    render() {
        let  {username, email, nickname, phone, onEditDetail} = this.state
        return (
            <div className="sets">
                <h1>个人信息</h1>
                <div className="setting-card">
                    <Row style={{alignItems: "center", height: "100%"}}>
                        <Col className="avatar" xs={24} lg={8}>
                            <Avatar className="image" size={160} icon={<UserOutlined />}></Avatar>
                            <Tooltip title="该功能还未完成">
                                <Button disabled>更换头像</Button>
                            </Tooltip>
                        </Col>
                        <Col className="details" xs={24} lg={16}>
                            {!onEditDetail?(
                                <div className="table">
                                    <div className="row"><span>用户名：</span>{username}</div>
                                    <div className="row"><span>昵称：</span>{nickname}</div>
                                    <div className="row"><span>电子邮箱：</span>{email}</div>
                                    <div className="row"><span>电话：</span>{phone}</div>
                                    <div className="btn-group">
                                        <Button>更改信息</Button>
                                    </div>
                                </div>
                            ):(
                                <div className="table">
                                    <div className="row">
                                        <span>用户名：</span>
                                        {username}
                                    </div>
                                    <div className="row">
                                        <span>昵称：</span>
                                        <Editable>{nickname}</Editable>
                                    </div>
                                    <div className="row">
                                        <span>电子邮箱：</span>
                                        <Editable>{email}</Editable>
                                    </div>
                                    <div className="row">
                                        <span>电话：</span>
                                        <Editable>{phone}</Editable>
                                    </div>
                                    <div className="btn-group">
                                        <Button >更改信息</Button>
                                        <Button>更改密码</Button>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }

    handleEditDetail = target => {
        if (target === "nickname") {
            return value => {
                this.setState({nickname:value})
            }
        } else if (target === "email") {
            return value => {
                this.setState({email:value})
            }
        } else if (target === "phone") {
            return value => {
                this.setState({phone:value})
            }
        }
    }
    handleUpdateDetail = async () => {
        let {userId, nickname, username, email, phone} = this.state
        
    }
}
