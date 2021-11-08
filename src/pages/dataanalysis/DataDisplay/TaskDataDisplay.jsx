import React, { Component } from 'react'
import {
    Col,
    Row,
    List,
    Input,
    Button,
    Avatar,
    Statistic,
    message,
} from 'antd'
import {
    SearchOutlined,
    UserOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

import TaskDrawer from '../../../components/TaskDrawer'
import Chart from '../../../components/Chart'
import './index.less'
import api from '../../../api';
import memoryUtils from '../../../utils/memoryUtils';
import storageUtils from '../../../utils/storageUtils';


const options = {
    title: {
        text: '近日表单提交情况'
    },
    tooltip: {},
    xAxis: {
        data: ['11/3', '11/4', '11/5', '11/6', '11/7', '11/8']
    },
    yAxis: {},
    series: [
        {
            name: '提交数',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 3]
        }
    ]
}
export default class TaskDataDisplay extends Component {
    state = {
        authorFilter: "",
        answers: [],
        showTaskId: "",
        visible: false,
        showAnswerId: ""
    }

    async componentDidMount () {
        let {taskId} = this.props
        let answers = await api.getTaskAnswers(taskId)
        if (!answers) {
            message.error("任务提交获取失败！")
            this.props.history.goBack()
            return
        } else if (answers==="token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info()
            this.props.history.push("/login")
            return
        }

        this.setState({answers, showTaskId:taskId})
    }
    render() {
        let { showTaskId, visible, answers, authorFilter, showAnswerId } = this.state
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
                                            title={<Button type="link" onClick={this.handleShowAnswer(showTaskId, item.id)}>{item.author.name}</Button>}
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
                        <Row style={{ height: 400,}}>
                            <Col span={24} style={{display: "flex", justifyContent: "center" }}>
                                <div style={{width: "80%"}}>
                                    <Chart chartId="task-line" options={options} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {visible?
                <TaskDrawer visible={visible} taskId={showTaskId} answerId={showAnswerId} onClose={this.handleClose} />
                :""
                }
            </div>
        )
    }

    handleFilterChange = (e) => {
        this.setState({
            authorFilter: e.target.value
        })
    }
    handleShowAnswer = (taskId, answerId) => {
        return () => {
            this.setState({
                visible: true,
                showTaskId: taskId,
                showAnswerId: answerId
            })
        }
    }
    handleClose = () => {
        this.setState({ visible: false })
    }
}
