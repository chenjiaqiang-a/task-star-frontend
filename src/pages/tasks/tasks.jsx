import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Row,
    Col,
    Pagination,
    Input,
} from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons'

import DisplayBlock, {AddBlock} from '../../components/DisplayBlock'
import './index.css'
import TaskDrawer from '../../components/TaskDrawer';

export default class Tasks extends Component {

    state = {
        visible: false,
        create: false,
        showTaskId: "",
        createSearchText: "",
        createPage: 1,
        createPageSize: 3,
        createdTasksList: [
            {id: "1", title: "任务1", desc: "任务描述", private: false, published: true},
            {id: "2", title: "任务2", desc: "任务描述", private: true, published: false},
            {id: "3", title: "任务3", desc: "任务描述", private: false, published: false},
            {id: "4", title: "任务4", desc: "任务描述", private: false, published: true},
            {id: "5", title: "任务5", desc: "任务描述", private: false, published: true}
        ],
        doSearchText: "",
        doPage: 1,
        doPageSize: 4,
        doneTasksList: [
            {id: "1", title: "任务1", desc: "任务描述", private: false},
            {id: "2", title: "任务2", desc: "任务描述", private: false},
            {id: "3", title: "任务3", desc: "任务描述", private: false},
            {id: "4", title: "任务4", desc: "任务描述", private: false},
            {id: "5", title: "任务5", desc: "任务描述", private: false},
            {id: "6", title: "任务6", desc: "任务描述", private: false},
            {id: "7", title: "任务7", desc: "任务描述", private: false},
            {id: "8", title: "任务8", desc: "任务描述", private: false},
            {id: "9", title: "任务9", desc: "任务描述", private: false},
            {id: "10", title: "任务10", desc: "任务描述", private: false}
        ],
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
        const {visible, create, showTaskId} = this.state
        let {createSearchText, createPage, createPageSize, createdTasksList} = this.state
        let {doSearchText, doPage, doPageSize, doneTasksList} = this.state
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
                        <Row gutter={[16, 16]}>
                            <Col xs={12} lg={6}>
                                <Link to="/createtask">
                                    <AddBlock />
                                </Link>
                            </Col>
                            {createdTasksList.map(task => (
                                <Col onClick={this.displayTask(task.id, true)} key={task.id} xs={12} lg={6}>
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
                        <Row gutter={[16, 16]}>
                            {doneTasksList.map(task => (
                                <Col onClick={this.displayTask(task.id)} key={task.id} xs={12} lg={6}>
                                    <DisplayBlock task={task} />
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
                <TaskDrawer visible={visible} create={create} taskId={showTaskId} onClose={this.onClose} />
            </div>
        );
    }
    displayTask = (taskId, create=false) => {
        return () => {
            this.setState({
                visible: true,
                ShowTaskId: taskId,
                create: create
            })
        }
    }
    onClose = () => {
        this.setState({visible: false})
    }
}
