import React, { Component } from 'react';
import {
    Col,
    Row,
    Tabs,
    List,
    Input,
    Button,
    Avatar,
    Statistic,
} from 'antd'
import { 
    FileOutlined,
    PieChartOutlined,
    BarChartOutlined,
    SearchOutlined,
    UserOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

import './dataanalysis.less'

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
const questions = [
    {
        id: "1",
        task_id: "11111",
        question: "这是一个单行输入框",
        type: "text-input",
        choices: "",
        required: true,
    },
    {
        id: "2",
        task_id: "11111",
        question: "这是一个多行输入框",
        type: "text-area",
        choices: "",
        required: false,
    },
    {
        id: "3",
        task_id: "11111",
        question: "这是一个单项选择",
        type: "radio",
        choices: "选项一;选项二;[other]其它",
        required: true,
    },
    {
        id: "4",
        task_id: "11111",
        question: "这是一个日期输入框",
        type: "date-input",
        choices: "",
        required: false,
    },
    {
        id: "5",
        task_id: "11111",
        question: "这是一个多项选择",
        type: "checkbox",
        choices: "选项一;选项二",
        required: true,
    },
]
class DataAnalysis extends Component {
    state = {
        tabKey: "1",
        authorFilter: "",
        answers: answers,
        questions: questions
    }
    render() {
        let { tabKey, authorFilter, answers, questions } = this.state
        let ansNum = answers.length
        answers = answers.filter(item => (item.author.name.indexOf(authorFilter) !== -1))
        questions = questions.filter(item => (item.question.indexOf(authorFilter) !== -1))
        const tabPane1 = (
            <div className="data-display">
                <Row gutter={[16]}>
                    <Col style={{display: "flex", justifyContent: "center"}} span={8}>
                        <div style={{width: 230}}>
                            <div style={{fontSize: 30, fontWeight: "bold"}}>提交记录</div>
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
                                            avatar={item.author.avatar?<Avatar src={item.author.avatar}/> : <Avatar icon={<UserOutlined />}/>}
                                            title={<Button type="link">{item.author.name}</Button>}
                                            description={item.submitTime}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16]} style={{height: 300, display: "flex", alignItems: "center"}}>
                            <Col span={12} style={{width: "100%", display: "flex", justifyContent: "center"}}>
                                <Statistic title="共收到提交" value={ansNum}  suffix="份"/>
                            </Col>
                            <Col span={12} style={{width: "100%", display: "flex", justifyContent: "center"}}>
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
        const tabPane2 = (
            <div className="data-display">
                <Row gutter={[16]}>
                    <Col style={{display: "flex", justifyContent:"center"}} span={8}>
                        <div style={{width: 230}}>
                            <div style={{fontSize: 30, fontWeight: "bold"}}>问题表单项</div>
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
                                dataSource={questions}
                                renderItem={(item, idx) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<Button type="link">{idx+1}、{item.question}</Button>}
                                            description={item.required? "必填项" : "非必填"}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={16}>

                    </Col>
                </Row>
            </div>
        )
        const tabPane3 = (
            <div className="data-display">
                
            </div>
        )
        return (
            <div className="data-analysis">
                <Tabs type="card" onChange={this.handleTabsChange} activeKey={tabKey}>
                    <Tabs.TabPane
                        key="1"
                        tab={
                            <span>
                                <BarChartOutlined />
                                任务统计
                            </span>
                        }
                    >
                        {tabPane1}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="2"
                        tab={
                            <span>
                                <PieChartOutlined/>
                                表单项统计
                            </span>
                        }
                    >
                        {tabPane2}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="3"
                        tab={
                            <span>
                                <FileOutlined/>
                                文件数据
                            </span>
                        }
                    >
                        {tabPane3}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
    handleTabsChange = (key) => {
        this.setState({tabKey: key})
    }
    handleFilterChange = (e) => {
        this.setState({
            authorFilter: e.target.value
        })
    }
}

export default DataAnalysis;