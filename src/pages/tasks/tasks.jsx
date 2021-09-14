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

export default class Tasks extends Component {

    state = {
        createSearchText: "",
        createNum: 9,
        createPage: 1,
        createPageSize: 3,
        createdTasksList: [{id: "1"},{id: "2"},{id: "3"},],
        doSearchText: "",
        doNum: 9,
        doPage: 1,
        doPageSize: 4,
        doneTasksList: [{id: "1"},{id: "2"},{id: "3"},{id: "4"},],
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
        const {createSearchText, createNum, createPage, createPageSize, createdTasksList} = this.state
        const {doSearchText, doNum, doPage, doPageSize, doneTasksList} = this.state
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
                                <Link to="/create">
                                    <AddBlock />
                                </Link>
                            </Col>
                            {createdTasksList.map(task => (
                                <Col key={task.id} xs={12} lg={6}>
                                    <Link to="/create">
                                        <DisplayBlock />
                                    </Link>
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
                                <Col key={task.id} xs={12} lg={6}>
                                    <Link to="/do">
                                        <DisplayBlock />
                                    </Link>
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
            </div>
        );
    }
}
