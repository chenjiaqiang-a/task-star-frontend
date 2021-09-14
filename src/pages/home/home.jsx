import React, { Component } from 'react'
import {
    Button, Col, Row,
} from 'antd'

import './home.less'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header />
                <div className="body">
                    <div className="home-jumbotron">
                        <h1>任务星球</h1>
                        <h2>一个支持<strong>高并发</strong>的任务发布与管理系统</h2>
                        <p>可应用于校园、企业等场景，具有<strong>社会调查、信息填报、数据搜集与可视化</strong>等功能，更多功能期待你的开发</p>
                    </div>
                    <div className="hot-task">
                        <div className="title">
                            <h1>热门任务</h1>
                            <Button type="link">换一批</Button>
                        </div>
                        <div className="cards">
                            <Row gutter={[16, 16]}>
                                <Col span={8}><Card history={this.props.history} /></Col>
                                <Col span={8}><Card history={this.props.history} /></Col>
                                <Col span={8}><Card history={this.props.history} /></Col>
                            </Row>
                        </div>

                    </div>
                    <div className="demonstration">
                        <div className="title">
                            <h1>操作演示</h1>
                        </div>
                        <div className="content">

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
