import React, { Component } from 'react';
import {  Empty, Space, Collapse, Tooltip, Button } from 'antd'
import {
    RightOutlined
} from '@ant-design/icons'

import api from '../../api'
import './index.css'
import memoryUtils from '../../utils/memoryUtils';

const {Panel} = Collapse

class Drafts extends Component {
    state = {
        createTasks: [],
        doTasks: []
    }

    async componentDidMount () {
        // 我创建的任务
        let userId = memoryUtils.userInfo.userId
        let result = await api.getMyTasks(userId)
        let resultList = []
        result.forEach(item => {
            if (item.status === 5) {
                resultList.push(item)
            }
        })
        this.setState({
            createTasks: resultList
        })

        // 我完成的任务
        // 我完成的任务
        let doTask = await api.getMyAnswers(userId)
        let doTasksList = []
        doTask.forEach(item => {
            if (item.status === 2) {
                doTasksList.push(item)
            }
        })
        this.setState({
            doTasks:doTasksList
        })
    }

    render() {
        const {createTasks, doTasks} = this.state
        return (
            <div className="drafts">
                <div className="drafts-group drafts-group-create">
                    <div className="drafts-group-title">
                        还未完成创建的任务
                    </div>
                    <div className="drafts-group-main">
                    {createTasks.length === 0 ?
                            <Empty 
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{height: 150}}
                                description={
                                    <span>暂无数据</span>
                                }
                            />
                            :
                            <Space className="drafts-item-list" direction="vertical">
                                {createTasks.map((task) => {
                                    return (
                                        <Collapse defaultActiveKey={['1']} key={task.id}>
                                            <Panel
                                                key="1"
                                                header={task.title}
                                                extra={
                                                    <Tooltip title="继续完善任务">
                                                        <Button onClick={this.handleCompleteTask(task.id)} type="link"><RightOutlined /></Button>
                                                    </Tooltip>
                                                }
                                            >
                                                {task.description}
                                            </Panel>
                                        </Collapse>
                                    )
                                })}
                            </Space>
                        }
                    </div>
                    
                </div>
                <div className="drafts-group drafts-group-do">
                    <div className="drafts-group-title">
                        还未完成的任务
                    </div>
                    <div className="drafts-group-main">
                        {doTasks.length === 0 ?
                            <Empty 
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{height: 150}}
                                description={
                                    <span>暂无数据</span>
                                }
                            />
                            :
                            <Space className="drafts-item-list" direction="vertical">
                                {doTasks.map((task) => {
                                    return (
                                        <Collapse defaultActiveKey={['1']} key={task.id}>
                                            <Panel
                                                key="1"
                                                header={task.title}
                                                extra={
                                                    <Tooltip title="继续未完成的任务">
                                                        <Button onClick={this.handleRedoTask(task.id, task.answerId)} type="link"><RightOutlined /></Button>
                                                    </Tooltip>
                                                }
                                            >
                                                {task.description}
                                            </Panel>
                                        </Collapse>
                                    )
                                })}
                            </Space>
                        }
                    </div>
                </div>
            </div>
        );
    }

    handleCompleteTask = (id) => {
        return (e) => {
            e.stopPropagation()
            this.props.history.push("/createtask", {taskId: id})
        }
    }

    handleRedoTask = (taskId, answerId) => {
        return (e) => {
            e.stopPropagation()
            this.props.history.push(`/dotask/${taskId}`, {answerId})
        }
    }
}

export default Drafts;