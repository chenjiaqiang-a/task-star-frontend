import React, { Component } from 'react'

import './index.less'
import {
    CheckboxSelect,
    DateInput,
    RadioSelect,
    TextArea,
    TextInput
} from  '../FormItems'

export default class Question extends Component {
    render() {
        const {question, order} = this.props
        const { type, required } = question
        let formItem
        if (type === "text-input") {
            formItem = <TextInput {...question} handleValueChange={this.props.handleValueChange} />
        } else if (type === "text-area") {
            formItem = <TextArea {...question} handleValueChange={this.props.handleValueChange} />
        } else if (type === "date-input") {
            formItem = <DateInput {...question} handleValueChange={this.props.handleValueChange} />
        } else if (type === "radio") {
            formItem = <RadioSelect {...question} handleChooseChange={this.props.handleChooseChange} handleChoiceChange={this.props.handleChoiceChange} />
        } else if (type === "checkbox") {
            formItem = <CheckboxSelect {...question} handleChooseChange={this.props.handleChooseChange} handleChoiceChange={this.props.handleChoiceChange} />
        } else {
            formItem = <div>...</div>
        }
        return (
            <div className="question">
                <div className="question-title">
                    {required ? (<span className="required">*</span>) : " "}
                    {order}、{question.question}
                </div>
                <div className="question-form">{formItem}</div>
            </div>
        )
    }
}
