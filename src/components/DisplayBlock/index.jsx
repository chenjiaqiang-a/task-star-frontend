import React, { Component } from 'react'
import {Card,Avatar, Button, Tooltip, Space, Badge, message, Modal} from 'antd';
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
import api from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import requestConfig from '../../config/requestConfig';

const {Meta} = Card

export default class DisplayBlock extends Component {
    state = {
        visible:false,
        url: ""
    }

    render() {
        let { task, create } = this.props
        let { visible, url } = this.state
        const shareModal = (
            <Modal
                title="复制下面链接，邀请其他人一起来完成任务吧！"
                visible={visible}
                footer={null}
                onCancel={this.handleCancel}
            >
                {url}
            </Modal>
        )
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
                                                <Button onClick={this.handlePublish(false)} icon={<DownCircleOutlined/>}/>
                                            </Tooltip>:
                                            <Tooltip title="发布">
                                                <Button onClick={this.handlePublish(true)} icon={<UpCircleOutlined/>}/>
                                            </Tooltip>
                                        }
                                        {task.published?
                                            <Tooltip title="分享任务">
                                                <Button onClick={this.handleShare} icon={<ShareAltOutlined />}/>
                                                {shareModal}
                                            </Tooltip>:
                                            <Tooltip title="修改任务">
                                                <Button onClick={this.handleModify} icon={<ToolOutlined />}/>
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
                    <Meta title={task.title} description={task.description.length<20?task.description:task.description.substring(0,20)+"..."} />
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
                                        <Button onClick={this.handleDoAgain} icon={<ReloadOutlined />}/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Meta title={task.title} description={task.description.length<20?task.description:task.description.substring(0,20)+"..."} />
                </Card>
            </Badge.Ribbon>
        )
    }
    handlePublish = (publish) => {
        return async (e) => {
            e.stopPropagation();
            let {task} = this.props
            task.published = publish
            if (publish) {
                task.status = 1
            } else {
                task.status = 2
            }
            const result = api.updateTask(task)
            if (!result) {
                message.error("任务状态改变失败！")
                return
            } else if (result === "token") {
                memoryUtils.isSignedIn = false
                storageUtils.removeIsSignedIn()
                message.info("登录授权过期，请重新登录！")
                this.props.history.push("/login")
                return
            }
            this.props.history.push("/main")
            this.props.history.replace("/main/tasks")
        }
    }
    handleShare = (e) => {
        e.stopPropagation();
        let url = requestConfig.shareUrl + this.props.task.id
        this.setState({visible: true, url})
    }
    handleCancel = (e) => {
        e.stopPropagation();
        this.setState({visible:false})
    }
    handleDataAnalysis = (e) => {
        e.stopPropagation();
        let {task} = this.props
        this.props.history.push("/main/data-analysis", {taskId: task.id})
    }
    handleModify = (e) => {
        e.stopPropagation();
        let {task} = this.props
        this.props.history.push("/createtask", {taskId: task.id})
    }
    handleDoAgain = (e) => {
        e.stopPropagation();
        let {task} = this.props
        this.props.history.push(`/dotask/${task.id}`)
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
