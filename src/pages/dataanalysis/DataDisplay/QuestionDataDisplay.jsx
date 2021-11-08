import React, { Component } from 'react'
import {
    Col,
    Row,
    List,
    Input,
    Button,
    message,
} from 'antd'
import { 
    SearchOutlined,
} from '@ant-design/icons';

import './index.less'
import QuestionDisplay from '../../../components/QuestionDisplay';
import api from '../../../api';
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils';
import Chart from '../../../components/Chart';

const options = {
    title: {
        text: '表单项提交情况'
    },
    series: [
        {
            type: 'pie',
            data: [
                {
                    value: 0,
                    name: '22：00之前'
                },
                {
                    value: 1,
                    name: '22：00-23：00'
                },
                {
                    value: 2,
                    name: '23：00之后'
                }
            ]
        }
    ]
}

export default class QuestionDataDisplay extends Component {
    state = {
        questions: [],
        nameFilter: "",
        showQuestionIdx: 0,
    }

    async componentDidMount() {
        let {taskId} = this.props
        // 获取任务详情
        const result = await api.getTaskById(taskId)
        if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过期，请重新登录！")
            this.props.history.push("/login")
            return
        } else if (!result) {
            message.info("获取任务失败！")
            this.props.history.goBack()
            return
        }
        
        let {questions} = result
        this.setState({questions})
    }
    render() {
        let { questions, nameFilter, showQuestionIdx } = this.state
        questions = questions.filter(question => (question.question.indexOf(nameFilter) !== -1))
        return (
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
                                        value={nameFilter}
                                    />
                                }
                                dataSource={questions}
                                renderItem={(item, idx) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<Button type="link" onClick={this.handleChangeQuestion(idx)}>{idx+1}、{item.question}</Button>}
                                            description={item.required? "必填项" : "非必填"}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16]} style={{ height: 200, display: "flex", alignItems: "center" }}>
                            <Col span={24}>
                                <div style={{fontSize: 30, fontWeight: "bold"}}>问题描述</div>
                                {questions.length>0?                                
                                <QuestionDisplay question={questions[showQuestionIdx]} order={showQuestionIdx+1} />
                                :""}
                            </Col>
                        </Row>
                        <Row style={{ height: 400,}}>
                            <Col span={24} style={{display: "flex", justifyContent: "center" }}>
                                <div style={{width: "80%"}}>
                                    <Chart chartId="task-pie" options={options} />
                                </div>
                            </Col>
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
    handleChangeQuestion = (idx) => {
        return () => {
            this.setState({showQuestionIdx: idx})
        }
    }
}
