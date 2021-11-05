import React, { Component } from 'react'
import {
    Button, Col, Row,
} from 'antd'

import './home.less'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const tasks = [
    {
        id: 1,
        title: "大学生心理调查问卷1",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
    {
        id: 2,
        title: "大学生心理调查问卷2",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
    {
        id: 3,
        title: "大学生心理调查问卷3",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
    {
        id: 4,
        title: "大学生心理调查问卷4",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
    {
        id: 5,
        title: "大学生心理调查问卷5",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
    {
        id: 6,
        title: "大学生心理调查问卷6",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In molestiae doloremque dolorem culpa dignissimos quas, eveniet quae, deleniti et suscipit blanditiis, eos itaque molestias inventore vitae omnis doloribus illum. Incidunt."
    },
]

export default class Home extends Component {
    state = {
        hotTasks: [],
        startIdx: 0
    }

    async componentDidMount() {
        // 获取热门任务
        this.setState({hotTasks: tasks})
    }
    render() {
        let {hotTasks, startIdx} = this.state
        let count = 0
        let tasks = []
        while (hotTasks.length > 0 && count < 3) {
            tasks.push(hotTasks[startIdx])
            startIdx++
            if (startIdx>=hotTasks.length) {
                startIdx = 0
            }
            count++
        }
        return (
            <div className="home">
                <Header history={this.props.history} />
                <div className="body">
                    <div className="home-jumbotron">
                        <h1>任务星球</h1>
                        <h2>一个支持<strong>高并发</strong>的任务发布与管理系统</h2>
                        <p>可应用于校园、企业等场景，具有<strong>社会调查、信息填报、数据搜集与可视化</strong>等功能，更多功能期待你的开发</p>
                    </div>
                    <div className="hot-task">
                        <div className="title">
                            <h1>热门任务</h1>
                            <Button type="link" onClick={this.handleNextGroup}>换一批</Button>
                        </div>
                        <div className="cards">
                            <div className="cards-container">
                                {tasks.map(task => (
                                    <Card key={task.id} history={this.props.history} task={task} />
                                ))}
                            </div>
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
    handleNextGroup = () => {
        let {startIdx, hotTasks} = this.state
        startIdx += 3
        if(startIdx>=hotTasks.length){
            startIdx = startIdx-hotTasks.length
        }
        this.setState({startIdx})
    }
}
