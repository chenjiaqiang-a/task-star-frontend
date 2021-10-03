import React, { Component } from 'react'

import {
    TextInputDo,
    TextInputCreate,
    TextAreaDo,
    TextAreaCreate,
    DateInputDo,
    DateInputCreate
} from './Input';

import './index.css'
import { CheckboxCreate, CheckboxDo, RadioCreate, RadioDo } from './Choice';

export class TextInput extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <TextInputDo {...this.props} />:
            <TextInputCreate {...this.props} />
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

export class DateInput extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <DateInputDo {...this.props}/>:
            <DateInputCreate {...this.props} />
        )
    }
}

export class RadioSelect extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <RadioDo {...this.props} />:
            <RadioCreate {...this.props} />
        )
    }
}

export class CheckboxSelect extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <CheckboxDo {...this.props} />:
            <CheckboxCreate {...this.props} />
        )
    }
}