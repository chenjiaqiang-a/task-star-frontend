import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FileTextOutlined, HomeOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import {
    Avatar, Button, Dropdown, Menu, Modal, Tooltip,
} from 'antd'

import logo from '../../assets/images/logo.png'
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Divider } from 'rc-menu'

export default class Header extends Component {
    state = {
        // isSignIn: false
        visible: false,
        confirmLoading: false,
        searchText: "",
    }
    render() {
        const {visible, confirmLoading, searchText} = this.state
        const isSignedIn = memoryUtils.isSignedIn
        const userInfo = memoryUtils.userInfo
        const model = (
            <Modal
            title="登出确认"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={this.handelCancel}
            onOk={this.handelOk}
            >
                <p>您确认要退出登录吗？</p>
            </Modal>
        )
        const menu = (
            <Menu
            style={{width: 200, padding: "5px 20px"}}
            mode="vertical"
            theme="dark"
            >
                <Menu.Item>
                    <div style={{width: "100%", textAlign: "center"}}>{userInfo.nickname || "用户名"}</div>
                </Menu.Item>
                <Divider/>
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/main/tasks">我的任务</Link>
                </Menu.Item>
                <Menu.Item icon={<FileTextOutlined/>}>
                    <Link to="/main/drafts">草稿箱</Link>
                </Menu.Item>
                <Menu.Item icon={<SettingOutlined/>}>
                    <Link to="/main/sets">用户信息</Link>
                </Menu.Item>
                <Divider />
                <Menu.Item>
                    <Button onClick={this.handelLogout} style={{width: "100%"}} type="link" >登出</Button>
                </Menu.Item>
                {model}
            </Menu>
        )
        return (
            <header className="header">
                <Link to="/home">
                    <img src={logo} alt="logo" />
                </Link>
                <Link to="/home">
                    <h1>任务星球</h1>
                </Link>
                <div className="search-bar">
                    <form onSubmit={this.handleSearch}>
                        <input type="text" value={searchText} onChange={this.handleSearchTextChange} placeholder="请输入您要搜索的任务..." />
                        <button type="submit"><SearchOutlined /></button>
                    </form>
                </div>
                <div className="avatar">
                    {isSignedIn? (
                        <Dropdown 
                        overlay={menu}
                        placement="bottomRight"
                        >
                            <Link to="/main">
                                <Avatar className="image" style={{backgroundColor: "rgb(29, 142, 177)"}} size="large" icon={<UserOutlined />}></Avatar>
                            </Link>
                        </Dropdown>
                    ) : (
                        <Tooltip title="登录/注册">
                            <Link to="/login">
                                <Avatar className="image" size="large" icon={<UserOutlined />}></Avatar>
                            </Link>
                        </Tooltip>
                    )}
                    
                </div>
            </header>
        )
    }
    handelLogout = () => {
        this.setState({visible: true})
    }
    handelCancel = () => {
        this.setState({visible: false})
    }
    handelOk = () => {
        this.setState({confirmLoading:true})
        memoryUtils.isSignedIn = false
        if (!memoryUtils.userInfo.rememberInfo) {
            storageUtils.removeUserInfo()
        }
        storageUtils.removeIsSignedIn()
        this.setState({confirmLoading:false, visible: false})
        this.props.history.replace("/home")
    }
    handleSearchTextChange = (event) => {
        this.setState({
            searchText: event.target.value,
        })
    }
    handleSearch = (event) => {
        event.preventDefault()
        const {searchText} = this.state
        if (searchText.trim()){
            this.props.history.push(`/search/?kw=${searchText.trim()}`)
        } else {
            return;
        }
    }
}
