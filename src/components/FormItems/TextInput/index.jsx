import React, { Component } from 'react';
import {Input} from 'antd'

export class TextInputDo extends Component {
    render() {
        return (
            <Input />
        );
    }
}
export class TextInputCreate extends Component {
    render() {
        return (
            <Input disabled />
        );
    }
}
