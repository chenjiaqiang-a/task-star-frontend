import React, { Component } from 'react'

import {
    TextInputDo,
    TextInputCreate,
    TextAreaDo,
    TextAreaCreate,
    DateInputDo,
    DateInputCreate,
    TextInputDisplay,
    TextAreaDisplay,
    DateInputDisplay,
} from './Input';

import './index.css'
import { 
    CheckboxCreate, 
    CheckboxDisplay, 
    CheckboxDo,
    RadioCreate, 
    RadioDisplay, 
    RadioDo 
} from './Choice';

export class TextInput extends Component {
    render() {
        const { create, display } = this.props
        return (display?
            <TextInputDisplay {...this.props} />:
            !create?
            <TextInputDo {...this.props} />:
            <TextInputCreate {...this.props} />
        )
    }
}

export class TextArea extends Component {
    render() {
        const { create, display } = this.props
        return (display?
            <TextAreaDisplay {...this.props} />:
            !create?
            <TextAreaDo {...this.props} />:
            <TextAreaCreate {...this.props} />
        )
    }
}

export class DateInput extends Component {
    render() {
        const { create, display } = this.props
        return (display?
            <DateInputDisplay {...this.props} />:
            !create?
            <DateInputDo {...this.props}/>:
            <DateInputCreate {...this.props} />
        )
    }
}

export class RadioSelect extends Component {
    render() {
        const { create, display } = this.props
        return (display?
            <RadioDisplay {...this.props} />:
            !create?
            <RadioDo {...this.props} />:
            <RadioCreate {...this.props} />
        )
    }
}

export class CheckboxSelect extends Component {
    render() {
        const { create, display } = this.props
        return (display?
            <CheckboxDisplay {...this.props} />:
            !create?
            <CheckboxDo {...this.props} />:
            <CheckboxCreate {...this.props} />
        )
    }
}