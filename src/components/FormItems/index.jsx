import React, { Component } from 'react'

import {
    TextInputDo,
    TextInputCreate,
    TextAreaDo,
    TextAreaCreate
} from './Input';

import './index.css'

export class TextInput extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <TextInputDo {...(this.props)} />:
            <TextInputCreate {...(this.props)} />
        )
    }
}

export class TextArea extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <TextAreaDo {...this.props} />:
            <TextAreaCreate {...this.props} />
        )
    }
}
