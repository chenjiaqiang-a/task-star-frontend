import React, { Component } from 'react';
import {DatePicker, Input} from 'antd'
import moment from 'moment'

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

export class DateInputDo extends Component {
    render() {
        let date = moment()
        if (this.props.value) {
            date = moment(this.props.value, "YYYY-MM-DD")
        }
        return (
            <DatePicker value={date} allowClear={false} onChange={this.handleChange} />
        )
    }
    handleChange = (date, dateString) => {
        this.props.handleValueChange(dateString)
    }
}
export class DateInputCreate extends Component {
    render() {
        return (
            <DatePicker disabled/>
        )
    }
}
