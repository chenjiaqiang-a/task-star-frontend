import React, { Component } from 'react'
import { Avatar, Button, Col, message, Row, Tooltip } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons'

import './sets.less'
import Editable from '../../components/Editable'
import memoryUtils from '../../utils/memoryUtils';
import api from '../../api';
import storageUtils from '../../utils/storageUtils';
import { isEmail } from '../../utils/tools';

export default class Sets extends Component {
    state = {
        username: "",
        nickname: "",
        email: "",
        phone: "",
        userId: "",
        rememberInfo: false,
        onEditDetail: false,
    }
    componentDidMount() {
        this.setState(memoryUtils.userInfo)
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
                                    <div className="row">
                                        <span className="column-head">用户名：</span>
                                        {username}
                                    </div>
                                    <div className="row">
                                        <span className="column-head">昵称：</span>
                                        {nickname}
                                    </div>
                                    <div className="row">
                                        <span className="column-head">电子邮箱：</span>
                                        {email}
                                    </div>
                                    <div className="row">
                                        <span className="column-head">电话：</span>
                                        {phone}
                                    </div>
                                    <div className="btn-group">
                                        <Button onClick={this.handleClickEditDetail}>更改信息</Button>
                                        <Button>更改密码</Button>
                                    </div>
                                </div>
                            ):(
                                <div className="table">
                                    <div className="row">
                                        <span className="column-head">用户名：</span>
                                        {username}
                                    </div>
                                    <div className="row">
                                        <span className="column-head">昵称：</span>
                                        <Editable onEdit={this.handleEditDetail("nickname")}>{nickname}</Editable>
                                    </div>
                                    <div className="row">
                                        <span className="column-head">电子邮箱：</span>
                                        <Editable onEdit={this.handleEditDetail("email")}>{email}</Editable>
                                    </div>
                                    <div className="row">
                                        <span className="column-head">电话：</span>
                                        <Editable onEdit={this.handleEditDetail("phone")}>{phone}</Editable>
                                    </div>
                                    <div className="btn-group">
                                        <Button onClick={this.handleCancelUpdate}>取消</Button>
                                        <Button type="primary" onClick={this.handleUpdateDetail}>提交</Button>
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
    handleClickEditDetail = () => {
        this.setState({onEditDetail:true})
    }
    handleCancelUpdate = () => {
        this.setState({onEditDetail: false, ...memoryUtils.userInfo})
    }
    handleUpdateDetail = async () => {
        let {userId, nickname, username, email, phone, rememberInfo} = this.state
        let userInfo = {userId, nickname, username, email, phone, rememberInfo}
        if (!email) {
            message.error("电子邮箱不能为空！")
            return
        } else if (!nickname) {
            message.error("昵称不能为空！")
            return
        } else if (!isEmail(email)) {
            message.error("电子邮箱格式错误！")
            return
        } else if (phone.length !== 11) {
            message.error("请填入11位的电话号码！")
            return
        }

        // 请求更改用户信息
        const result = await api.updateUserDetail(userInfo)
        if (result === "ok") {
            memoryUtils.userInfo = userInfo
            storageUtils.saveUserInfo(userInfo)
            message.success("更新成功！")
        } else if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过时，请重新登录！")
            this.props.history.push("/login")
            return
        } else {
            this.setState(memoryUtils.userInfo)
            message.error("更新失败！")
        }
        this.setState({onEditDetail: false})
    }
}
