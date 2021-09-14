import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons'
import { message, Modal } from 'antd';

import Header from '../../components/Header'
import './login.less'
import flowerLogin from '../../assets/images/login.jpg';
import flowerRegister from '../../assets/images/register.jpg'
import Footer from '../../components/Footer';
import storageUtils from '../../utils/storageUtils'
import api from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import { isEmail } from '../../utils/tools';

export default class Login extends Component {
    state = {
        isSubmitting: false,
        signInMode: true,
        rememberInfo: true,
        signInUsername: "",
        signInPassword: "",
        signUpUsername: "",
        signUpPassword: "",
        repeatPassword: "",
        email: "",
        visible: false,
        confirmLoading: false,
    }
    componentDidMount() {
        if (memoryUtils.userInfo.rememberInfo) {
            this.setState({signInUsername: memoryUtils.userInfo.username})
        }
    }

    render() {
        if (memoryUtils.isSignedIn) {
            return <Redirect to="home" />
        }
        const {
            isSubmitting,
            rememberInfo,
            signInMode, 
            signInPassword, 
            signInUsername, 
            signUpUsername, 
            signUpPassword, 
            email, 
            repeatPassword,
            visible,
            confirmLoading,
        } = this.state
        const modal = (
            <Modal
            title="找回密码"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={this.handelCancel}
            onOk={this.handelOk}
            >
                <p>该功能尚未完成，敬请期待。</p>
            </Modal>
        )

        return (
            <div className="login">
                <Header />
                <div className="content body">
                    <div className="container">
                        <div className="welcome">
                            <div className="login-box" style={{transform: signInMode?"translateX(0%)":"translateX(68%)"}}>
                                <div className={!signInMode ? "" : "no-display"}>
                                    <h1>注册</h1>
                                    <form autoComplete="off" onSubmit={this.handelSignUp}>
                                        <input type="text" placeholder="用户名必须6-30个字符" onChange={this.handleFormChange("signUpUsername")} value={signUpUsername} />
                                        <input type="email" placeholder="电子邮箱" onChange={this.handleFormChange("email")} value={email} />
                                        <input type="password" placeholder="密码必须6-30个字符" onChange={this.handleFormChange("signUpPassword")} value={signUpPassword} />
                                        <input type="password" placeholder="确认密码" onChange={this.handleFormChange("repeatPassword")} value={repeatPassword} />
                                        <button disabled={isSubmitting} type="submit" className="button submit">创建用户</button>
                                    </form>
                                </div>
                                <div className={signInMode ? "" : "no-display"}>
                                    <h1>登录</h1>
                                    <form autoComplete="off" className="more-padding" onSubmit={this.handelSignIn}>
                                        <input type="text" placeholder="用户名/电子邮箱" onChange={this.handleFormChange("signInUsername")} value={signInUsername} />
                                        <input type="password" placeholder="密码" onChange={this.handleFormChange("signInPassword")} value={signInPassword} />
                                        <div className="checkbox">
                                            <input type="checkbox" id="remember" onChange={this.handelRememberInfoChecked} checked={rememberInfo} />
                                            <label htmlFor="remember">记住用户信息</label>
                                        </div>
                                        <button disabled={isSubmitting} type="button" onClick={this.handelFindPwd} className="forget">忘记密码？</button>
                                        {modal}
                                        <button disabled={isSubmitting} type="submit" className="button submit">登录</button>
                                    </form>
                                    
                                </div>
                            </div>
                            <div className="left-box">
                                <h2 className="title"><span>TAST</span><br />STAR</h2>
                                <p className="desc">任务星球<span><StarFilled /></span></p>
                                <img className="flower smaller" src={flowerLogin} alt="任务星球" />
                                <p className="account">已经有账户？</p>
                                <button disabled={isSubmitting} className="button" onClick={this.changeIsSignIn(true)}>登录</button>
                            </div>

                            <div className="right-box">
                                <h2 className="title"><span>TAST</span><br />STAR</h2>
                                <p className="desc">任务星球<span><StarFilled /></span></p>
                                <img className="flower" src={flowerRegister} alt="任务星球" />
                                <p className="account">还没有账户？</p>
                                <button disabled={isSubmitting} className="button" onClick={this.changeIsSignIn(false)}>注册</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    // 切换登录/注册模式
    changeIsSignIn = (signInMode) => {
        return () => {
            this.setState({
                signInMode, 
                signUpUsername: "",
                signUpPassword: "",
                repeatPassword: "",
                email: "",
            })
        }
    }
    // 受控表单
    handleFormChange = (item) => {
        if (item === "signInUsername") {
            return (event) => {
                this.setState({signInUsername: event.target.value})
            }
        } else if (item === "signInPassword") {
            return (event) => {
                this.setState({ signInPassword: event.target.value})
            }
        } else if (item === "signUpUsername") {
            return (event) => {
                this.setState({ signUpUsername: event.target.value})
            }
        } else if (item === "signUpPassword") {
            return (event) => {
                this.setState({ signUpPassword: event.target.value})
            }
        } else if (item === "email") {
            return (event) => {
                this.setState({ email: event.target.value})
            }
        } else if (item === "repeatPassword") {
            return (event) => {
                this.setState({repeatPassword: event.target.value})
            }
        }
        
    }
    // 处理登录
    handelSignIn = async (event) => {
        event.preventDefault()
        this.setState({isSubmitting:true})
        const {signInUsername, signInPassword, rememberInfo} = this.state
        if (!signInUsername) {
            message.error("请输入用户名/电子邮箱！")
            this.setState({isSubmitting:false})
            return
        } else if (!signInPassword) {
            message.error("请输入密码！")
            this.setState({isSubmitting:false})
            return
        }
        try {
            const result = await api.reqLogin(signInUsername, signInPassword)
            if (result.data.status === 0) {
                const {username, email, nickname} = result.data.userInfo
                const userInfo = {username, email, nickname, rememberInfo}
                storageUtils.saveIsSignedIn(true)
                storageUtils.saveUserInfo(userInfo)
                memoryUtils.userInfo = userInfo
                memoryUtils.isSignedIn = true
                this.props.history.replace("/home")
                return
            } else {
                message.error(result.data.msg)
                this.setState({signInPassword: ""})
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({isSubmitting:false})
    }
    // 是否记住信息
    handelRememberInfoChecked = (event) => {
        this.setState({rememberInfo: event.target.checked})
    }
    // 处理注册
    handelSignUp = async (event) => {
        event.preventDefault()
        this.setState({isSubmitting:true})
        const {signUpUsername, signUpPassword, email, repeatPassword} = this.state
        if (!signUpUsername) {
            message.error("请输入用户名！")
            this.setState({isSubmitting:false})
            return
        } else if (!email) {
            message.error("请输入电子邮箱！")
            this.setState({isSubmitting:false})
            return
        } else if (!signUpPassword) {
            message.error("请输入密码！")
            this.setState({isSubmitting:false})
            return
        } else if (!repeatPassword) {
            message.error("请重复密码！")
            this.setState({isSubmitting:false})
            return
        } else if (signUpUsername.length < 6) {
            message.error("用户名必须大于等于六位字符！")
            this.setState({isSubmitting:false})
            return
        } else if (!isEmail(email)) {
            message.error("电子邮箱格式错误！")
            this.setState({isSubmitting:false})
            return
        } else if (signUpPassword.length < 6) {
            message.error("密码必须大于等于六位字符！")
            this.setState({isSubmitting:false})
            return
        } else if (signUpPassword !== repeatPassword) {
            message.error("两次输入密码不相同！")
            this.setState({isSubmitting:false})
            return
        }
        const userInfo = {
            username: signUpUsername,
            password: signUpPassword,
            email: email,
            nickname: signUpUsername,
        }
        try {
            const result = await api.reqRegister(userInfo)
            if (result.data.id) {
                message.success("注册成功！")
                this.setState({
                    signInMode: true,
                    signInPassword: signUpPassword,
                    signInUsername: signUpUsername
                })
            } else {
                message.error(result.data.msg)
            }
        } catch (err) {
            console.log(err);
        }
        this.setState({isSubmitting:false})
    }

    handelFindPwd = () => {
        this.setState({visible:true})
    }
    handelCancel = () => {
        this.setState({visible:false})
    }
    handelOk = () => {
        this.setState({visible:false})
    }
}
