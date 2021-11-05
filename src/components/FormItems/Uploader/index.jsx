import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Space, InputNumber } from 'antd';
import React, { Component } from 'react';

export class ImageUploaderCreate extends Component {
    state = {

    }
    render() {
        let {choices} = this.props
        let num = choices*1
        const upLoadButton = (
            <div>
                <PlusOutlined />
                <div style={{marginTop:8}}>点击上传图片</div>
            </div>
        )
        return (
            <Space direction="horizontal">
                <Upload
                    disabled
                    listType="picture-card"
                >
                    {upLoadButton}
                </Upload>
                <div>
                    <div style={{marginBottom:10}}>最大上传图片数:</div>
                    <InputNumber
                        value={num}
                        onChange={this.handleNumChange}
                        max={10}
                        min={1}
                    />
                </div>
            </Space>
        );
    }
    handleNumChange = (num) => {
        this.props.updateChoice(num.toString())
    }
}

export class ImageUploaderDo extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export class ImageUploaderDisplay extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const {Dragger} = Upload

export class FileUploaderCreate extends Component {
    render() {
        return (
            <Dragger
                disabled
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽文件至此区域上传</p>
            </Dragger>
        )
    }
}

export class FileUploaderDo extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export class FileUploaderDisplay extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
