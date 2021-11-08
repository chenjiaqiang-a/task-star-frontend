import React, { Component } from 'react';
import {
    Tabs,
} from 'antd'
import { 
    FileOutlined,
    PieChartOutlined,
    BarChartOutlined,
} from '@ant-design/icons';

import './dataanalysis.less'
import TaskDataDisplay from './DataDisplay/TaskDataDisplay';
import QuestionDataDisplay from './DataDisplay/QuestionDataDisplay';
import FileDataDisplay from './DataDisplay/FileDataDisplay';
import { Redirect } from 'react-router-dom';

class DataAnalysis extends Component {
    state = {
        tabKey: "1",
    }
    render() {
        if (!this.props.location.state) {
            return <Redirect to="/main/tasks" />
        }
        let {taskId} = this.props.location.state
        let { tabKey } = this.state
                
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
                        <TaskDataDisplay history={this.props.history} taskId={taskId} />
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
                        <QuestionDataDisplay history={this.props.history} taskId={taskId} />
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
                        <FileDataDisplay history={this.props.history} taskId={taskId} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
    handleTabsChange = (key) => {
        this.setState({tabKey: key})
    }
    
}

export default DataAnalysis;