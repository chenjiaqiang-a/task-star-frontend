import React, { Component } from 'react'
import {Card,Avatar, Button, Tooltip, Space, Badge} from 'antd';
import {
    PlusOutlined,
    UpCircleOutlined,
    ShareAltOutlined,
    PieChartOutlined,
    DownCircleOutlined,
    ToolOutlined,
    ReloadOutlined
} from '@ant-design/icons'
import blockImg from '../../assets/images/block.jpg'

import './index.css'

const {Meta} = Card

export default class DisplayBlock extends Component {
    render() {
        const { task, create } = this.props
        return create? (
            <Badge.Ribbon text={task.private? "私密" : "公开"} color={task.private? "#ce14c5" : "#77ce14"}>
                <Card
                    hoverable
                    className="display-block"
                    cover={
                        <div className="block-img">
                            <img alt="example" src={blockImg} />
                            <div className="block-btn">
                                <div className="publish">
                                    {task.published?
                                        <div style={{color: "#f5df16"}}>发布中</div>:
                                        <div>未发布</div>
                                    }
                                </div>
                                <div className="btn-group">
                                    <Space direction="vertical">
                                        {task.published?
                                            <Tooltip title="停止发布">
                                                <Button onClick={this.handlePublish} icon={<DownCircleOutlined/>}/>
                                            </Tooltip>:
                                            <Tooltip title="发布">
                                                <Button onClick={this.handlePublish} icon={<UpCircleOutlined/>}/>
                                            </Tooltip>
                                        }
                                        {task.published?
                                            <Tooltip title="分享任务">
                                                <Button onClick={this.handleShare} icon={<ShareAltOutlined />}/>
                                            </Tooltip>:
                                            <Tooltip title="修改任务">
                                                <Button onClick={this.handleShare} icon={<ToolOutlined />}/>
                                            </Tooltip>
                                        }
                                        <Tooltip title="数据分析">
                                            <Button onClick={this.handleDataAnalysis} icon={<PieChartOutlined />}/>
                                        </Tooltip>
                                    </Space>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Meta title={task.title} description={task.desc} />
                </Card>
            </Badge.Ribbon>
        ):(
            <Badge.Ribbon text={task.private? "私密" : "公开"} color={task.private? "#ce14c5" : "#77ce14"}>
                <Card
                    hoverable
                    className="display-block"
                    cover={
                        <div className="block-img">
                            <img alt="example" src={blockImg} />
                            <div className="block-btn">
                                <div className="btn-group">
                                    <Tooltip title="再次填写">
                                        <Button onClick={this.handleDataAnalysis} icon={<ReloadOutlined />}/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Meta title={task.title} description={task.desc} />
                </Card>
            </Badge.Ribbon>
        )
    }
    handlePublish = (e) => {
        e.stopPropagation();
    }
    handleShare = (e) => {
        e.stopPropagation();
    }
    handleDataAnalysis = (e) => {
        e.stopPropagation();
    }
    handlePublic = (e) => {
        e.stopPropagation();
    }
}

export class AddBlock extends Component {
    render() {
        return (
            <Card
                hoverable
                className="display-block add-block"
                cover={<Avatar size={75} icon={<PlusOutlined/>}/>}
            >
                <Meta title="创建一个任务"/>
            </Card>
        )
    }
}
