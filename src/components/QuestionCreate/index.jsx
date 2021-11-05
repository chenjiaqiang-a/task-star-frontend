import React, { Component } from 'react'
import Editable from '../Editable'
import {
    TextInput,
    TextArea,
    DateInput,
    RadioSelect,
    CheckboxSelect,
    ImageUploader,
    FileUploader,
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
        } else if (type === "date-input") {
            formItem = <DateInput create {...question} />
        } else if (type === "radio") {
            formItem = <RadioSelect create {...question} updateChoice={this.handleChoiceChange} />
        } else if (type === "checkbox") {
            formItem = <CheckboxSelect create {...question} updateChoice={this.handleChoiceChange} />
        } else if (type === "image-uploader") {
            formItem = <ImageUploader create {...question} updateChoice={this.handleChoiceChange}/>
        } else if (type === "file-uploader") {
            formItem = <FileUploader create {...question}/>
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
    handleChoiceChange = (choices) => {
        let {question, order} = this.props
        question.choices = choices
        this.props.updateQuestion(order-1, question)
    }
}
