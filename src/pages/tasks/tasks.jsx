import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Pagination,
    Input,
    Empty
} from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons'

import DisplayBlock, {AddBlock} from '../../components/DisplayBlock'
import './index.css'
import TaskDrawer from '../../components/TaskDrawer';
import memoryUtils from '../../utils/memoryUtils';
import api from '../../api';

export default class Tasks extends Component {

    state = {
        visible: false,
        create: false,
        showTaskId: "",
        showAnswerId: "",
        createSearchText: "",
        createPage: 1,
        createPageSize: 3,
        createdTasksList: [],
        doSearchText: "",
        doPage: 1,
        doPageSize: 4,
        doneTasksList: [],
    }

    async componentDidMount () {
        // 我创建的任务
        let userId = memoryUtils.userInfo.userId
        let result = await api.getMyTasks(userId)
        let resultList = []
        result.forEach(item => {
            if (item.status !== 5) {
                resultList.push(item)
            }
        })
        this.setState({
            createdTasksList: resultList
        })

        // 我完成的任务
        let doneTask = await api.getMyAnswers(userId)
        let doneTasksList = []
        doneTask.forEach(item => {
            if (item.status !== 2) {
                doneTasksList.push(item)
            }
        })
        this.setState({
            doneTasksList
        })
    }

    onCreateSearchChange = (e) => {
        this.setState({
            createSearchText: e.target.value,
        })
    }

    onDoSearchChange = (e) => {
        this.setState({
            doSearchText: e.target.value
        })
    }

    onCreatePageChange = (page) => {
        this.setState({
            createPage: page,
        })
    }

    onDoPageChange = (page) => {
        this.setState({
            doPage: page,
        })
    }


    render() {
        const {visible, create, showTaskId, showAnswerId} = this.state
        let {createSearchText, createPage, createPageSize, createdTasksList} = this.state
        let {doSearchText, doPage, doPageSize, doneTasksList} = this.state
        if (createSearchText.trim()) {
            createdTasksList = createdTasksList.filter(task => task.title.indexOf(createSearchText)!==-1)
        }
        if (doSearchText.trim()) {
            doneTasksList = doneTasksList.filter(task => task.title.indexOf(doSearchText))
        }

        const createNum = createdTasksList.length
        const doNum =  doneTasksList.length
        createdTasksList = createdTasksList.slice(
            (createPage-1)*createPageSize,
            (createPage*createPageSize > createNum? createNum:createPage*createPageSize)
        )
        doneTasksList = doneTasksList.slice(
            (doPage-1)*doPageSize,
            (doPage*doPageSize > doNum? doNum:doPage*doPageSize)
        )
        return (
            <div className="tasks">
                <div className="tasks-group tasks-group-create">
                    <div className="tasks-group-title">
                        我创建的任务
                        <Input
                            className="search"
                            placeholder="输入关键字筛选..."
                            onChange={this.onCreateSearchChange}
                            bordered={false}
                            prefix={<SearchOutlined />}
                            value={createSearchText}
                        />
                    </div>
                    <div className="tasks-group-main">
                        <Row gutter={[16, 16]} style={{minHeight:300}}>
                            <Col xs={12} lg={6} style={{minHeight:300}}>
                                <Link to="/createtask">
                                    <AddBlock />
                                </Link>
                            </Col>
                            {createdTasksList.map(task => (
                                <Col style={{minHeight:300}} onClick={this.displayTask(task.id, true)} key={task.id} xs={12} lg={6}>
                                    <DisplayBlock history={this.props.history} create task={task} />
                                </Col>
                            ))}
                        </Row>
                        <Pagination
                            className="tasks-group-pagination"
                            total={createNum}
                            current={createPage}
                            pageSize={createPageSize}
                            onChange={this.onCreatePageChange}
                        />
                    </div>
                </div>
                <div className="tasks-group tasks-group-do">
                    <div className="tasks-group-title">
                        我完成的任务
                        <Input
                            className="search"
                            placeholder="输入关键字筛选..."
                            onChange={this.onDoSearchChange}
                            bordered={false}
                            prefix={<SearchOutlined />}
                            value={doSearchText}
                        />
                    </div>
                    <div className="tasks-group-main">
                        <Row gutter={[16, 16]} style={{minHeight:300}}>
                            {doneTasksList.length === 0?
                            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <Empty 
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{height: 150}}
                                    description={
                                        <span>暂无数据</span>
                                    }
                                />
                            </div>:
                            doneTasksList.map(task => (
                                <Col style={{minHeight:300}} onClick={this.displayTask(task.id, false, task.answerId)} key={task.answerId} xs={12} lg={6}>
                                    <DisplayBlock history={this.props.history} task={task} />
                                </Col>
                            ))}
                        </Row>
                        <Pagination
                            className="tasks-group-pagination"
                            total={doNum}
                            current={doPage}
                            pageSize={doPageSize}
                            onChange={this.onDoPageChange}
                        />
                    </div>
                </div>
                {visible?
                <TaskDrawer visible={visible} create={create} taskId={showTaskId} answerId={showAnswerId} onClose={this.onClose} />
                :""
                }
            </div>
        );
    }
    displayTask = (taskId, create=false, anserId="") => {
        return () => {
            this.setState({
                visible: true,
                showTaskId: taskId,
                create: create,
                showAnswerId: anserId
            })
        }
    }
    onClose = () => {
        this.setState({visible: false})
    }

}
