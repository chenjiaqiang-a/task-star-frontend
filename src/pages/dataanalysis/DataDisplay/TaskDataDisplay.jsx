import React, { Component } from 'react'
import {
    Col,
    Row,
    List,
    Input,
    Button,
    Avatar,
    Statistic,
} from 'antd'
import { 
    SearchOutlined,
    UserOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

import './index.less'

const answers = [
    {
        id: "1",
        author: {id:1,avatar:"",name:"author1"},
        submitTime: "2021-03-21",
    },
    {
        id: "2",
        author: {id:2,avatar:"",name:"author2"},
        submitTime: "2021-03-21",
    },
    {
        id: "3",
        author: {id:3,avatar:"",name:"author3"},
        submitTime: "2021-03-21",
    },
    {
        id: "4",
        author: {id:4,avatar:"",name:"author4"},
        submitTime: "2021-03-21",
    },
    {
        id: "5",
        author: {id:5,avatar:"",name:"author5"},
        submitTime: "2021-03-21",
    },
    {
        id: "6",
        author: {id:6,avatar:"",name:"author6"},
        submitTime: "2021-03-21",
    },
    {
        id: "7",
        author: {id:7,avatar:"",name:"author7"},
        submitTime: "2021-03-21",
    },
    {
        id: "8",
        author: {id:8,avatar:"",name:"author8"},
        submitTime: "2021-03-21",
    },
]

export default class TaskDataDisplay extends Component {
    state = {
        authorFilter: "",
        answers: answers,
    }
    render() {
        let { answers, authorFilter } = this.state
        let ansNum = answers.length
        answers = answers.filter(item => (item.author.name.indexOf(authorFilter) !== -1))

        return (
            <div className="data-display">
                <Row gutter={[16]}>
                    <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
                        <div style={{ width: 230 }}>
                            <div style={{ fontSize: 30, fontWeight: "bold" }}>提交记录</div>
                            <List
                                header={
                                    <Input
                                        placeholder="输入关键字筛选..."
                                        onChange={this.handleFilterChange}
                                        bordered={false}
                                        prefix={<SearchOutlined />}
                                        value={authorFilter}
                                    />
                                }
                                dataSource={answers}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={item.author.avatar ? <Avatar src={item.author.avatar} /> : <Avatar icon={<UserOutlined />} />}
                                            title={<Button type="link">{item.author.name}</Button>}
                                            description={item.submitTime}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16]} style={{ height: 300, display: "flex", alignItems: "center" }}>
                            <Col span={12} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Statistic title="共收到提交" value={ansNum} suffix="份" />
                            </Col>
                            <Col span={12} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <Statistic
                                    title="今日收到提交"
                                    value={ansNum}
                                    suffix="份"
                                    prefix={<ArrowUpOutlined />}
                                    valueStyle={{ color: '#3f8600' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    handleFilterChange = (e) => {
        this.setState({
            authorFilter: e.target.value
        })
    }
}
