import React, { Component } from 'react'

import {
    TextInput,
    TextArea,
    DateInput,
    RadioSelect,
    CheckboxSelect
} from '../FormItems'
import './index.less'

export default class QuestionDisplay extends Component {
    render() {
        const {question, order} = this.props
        const { type, required } = question
        let formItem
        if (type === "text-input") {
            formItem = <TextInput display {...question}/>
        } else if (type === "text-area") {
            formItem = <TextArea display {...question}/>
        } else if (type === "date-input") {
            formItem = <DateInput display {...question}/>
        } else if (type === "radio") {
            formItem = <RadioSelect display {...question}/>
        } else if (type === "checkbox") {
            formItem = <CheckboxSelect display {...question}/>
        } else {
            formItem = <div>...</div>
        }
        return (
            <div className="question-display">
                <div className="question-title">
                    {required ? (<span className="required">*</span>) : " "}
                    {order}、{question.question}
                </div>
                <div className="question-form">{formItem}</div>
            </div>
        )
    }
}
