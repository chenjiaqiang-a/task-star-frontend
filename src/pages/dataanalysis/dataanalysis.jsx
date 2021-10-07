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

class DataAnalysis extends Component {
    state = {
        tabKey: "1",
    }
    render() {
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
                        <TaskDataDisplay />
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
                        <QuestionDataDisplay />
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
                        <FileDataDisplay />
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