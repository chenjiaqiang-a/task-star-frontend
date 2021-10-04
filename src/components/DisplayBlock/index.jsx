import React, { Component } from 'react'
import {Card,Avatar, Button, Tooltip, Space} from 'antd';
import {
    PlusOutlined, UpCircleOutlined,ShareAltOutlined,PieChartOutlined
} from '@ant-design/icons'
import blockImg from '../../assets/images/block.jpg'

import './index.css'

const {Meta} = Card

export default class DisplayBlock extends Component {
    render() {
        return (
            <Card
                hoverable
                className="display-block"
                cover={
                    <div className="block-img">
                        <img alt="example" src={blockImg} />
                        <div className="block-btn">
                            <div className="publish">未发布</div>
                            <div className="btn-group">
                                <Space direction="vertical">
                                    <Tooltip title="发布">
                                        <Button icon={<UpCircleOutlined/>}/>
                                    </Tooltip>
                                    <Tooltip title="分享任务">
                                        <Button icon={<ShareAltOutlined />}/>
                                    </Tooltip>
                                    <Tooltip title="数据分析">
                                        <Button icon={<PieChartOutlined />}/>
                                    </Tooltip> 
                                </Space>
                            </div>
                        </div>
                    </div>
                }
            >
                <Meta title="/任务名称/" description="/任务描述/" />
            </Card>
        )
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
