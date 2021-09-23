import React, { Component } from 'react'
import Editable from '../Editable'
import {
    TextInput,
    TextArea,
} from '../FormItems'

import "./index.less"

export default class QuestionCreate extends Component {
    render() {
        const {question, order} = this.props
        const { type, required } = question
        let formItem
        if (type === "text-input") {
            formItem = <TextInput create {...question} />
        } else if (type === "text-area") {
            formItem = <TextArea create {...question} />
        } else {
            formItem = <div>...</div>
        }
        return (
            <div className="question-create">
                <div className="question-create-title">
                    {required ? <span className="required">*</span> : " "}
                    {order}、<Editable onEdit={this.handleTitleEdit}>{question.question}</Editable>
                </div>
                <div className="question-create-form">{formItem}</div>
            </div>
        )
    }
    handleTitleEdit = (content) => {
        let {question, order} = this.props
        question.question = content
        this.props.updateQuestion(order-1, question)
    }
}
