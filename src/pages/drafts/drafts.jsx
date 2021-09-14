import React, { Component } from 'react';
import {  Empty, Space, Collapse } from 'antd'
import {
    DeleteOutlined
} from '@ant-design/icons'

import './index.css'

const {Panel} = Collapse

const tasks = [{
    id: "1",
    title: "任务名称",
    description: "任务描述 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."
}, {
    id: "2",
    title: "任务名称",
    description: "任务描述 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."
}, {
    id: "3",
    title: "任务名称",
    description: "任务描述 A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world."
}]



class Drafts extends Component {
    state = {
        createTasks: [],
        doTasks: tasks
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
                                            <Panel key="1" header={task.title} extra={<DeleteOutlined />}>
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
                                            <Panel key="1" header={task.title} extra={<DeleteOutlined />}>
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
}

export default Drafts;