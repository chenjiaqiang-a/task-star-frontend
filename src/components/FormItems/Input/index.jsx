import React, { Component } from 'react';
import {Input} from 'antd'

export class TextInputDo extends Component {
    render() {
        return (
            <Input value={this.props.value} onChange={this.handleChange} />
        );
    }
    handleChange = (event) => {
        this.props.handleValueChange(event.target.value);
    }
}
export class TextInputCreate extends Component {
    render() {
        return (
            <Input disabled />
        );
    }
}

const {TextArea} = Input
export class TextAreaDo extends Component {
    render() {
        return (
            <TextArea rows={6} value={this.props.value} onChange={this.handleChange}/>
        );
    }
    handleChange = (event) => {
        this.props.handleValueChange(event.target.value);
    }
}
export class TextAreaCreate extends Component {
    render() {
        return (
            <TextArea rows={6} disabled/>
        )
    }
}
