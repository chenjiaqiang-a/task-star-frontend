import React, { Component } from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import {
    Layout,
    Menu,
    message,
} from 'antd';
import {
    SnippetsOutlined,
    SettingOutlined,
    BarChartOutlined,
    UserOutlined,
} from '@ant-design/icons';

import './main.less'
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Tasks from '../tasks/tasks';
import Drafts from '../drafts/drafts'
import DataAnalysis from '../dataanalysis/dataanalysis'
import Sets from '../sets/sets'
import memoryUtils from '../../utils/memoryUtils';

const { Sider, Content } = Layout
class Main extends Component {
    render() {
        if (!memoryUtils.isSignedIn) {
            message.info("请先登录！")
            return <Redirect to="/login" />
        }
        const selectedKeys = [this.props.location.pathname.split("/").pop()]
        return (
            <div className="main">
                <Header history={this.props.history} />
                <div className="main-body body">
                    <Layout style={{minHeight: "calc(100vh - 140px)"}}>
                        <Sider
                            width={200}
                            theme="light"
                        >
                            <Menu mode="inline" selectedKeys={selectedKeys}>
                                <Menu.Item key="tasks" icon={<UserOutlined />}>
                                    <Link to="/main/tasks">我的任务</Link>
                                </Menu.Item>
                                <Menu.Item key="drafts" icon={<SnippetsOutlined />}>
                                    <Link to="/main/drafts">草稿箱</Link>
                                </Menu.Item>
                                <Menu.Item key="data-analysis" disabled={selectedKeys[0]!=="data-analysis"} icon={<BarChartOutlined />}>
                                    数据分析
                                </Menu.Item>
                                <Menu.Item key="sets" icon={<SettingOutlined />}>
                                    <Link to="/main/sets">设置</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{padding: 20}}>
                            <Switch>
                                <Route path="/main/tasks" component={Tasks} exact />
                                <Route path="/main/drafts" component={Drafts} exact />
                                <Route path="/main/data-analysis" component={DataAnalysis} />
                                <Route path="/main/sets" component={Sets} exact />
                                <Redirect to="/main/tasks" />
                            </Switch>
                        </Content>
                    </Layout>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;