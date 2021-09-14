import React, { Component } from 'react'
import {Card,Avatar} from 'antd';
import {
    PlusOutlined
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
                cover={<img alt="example" src={blockImg} />}
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
