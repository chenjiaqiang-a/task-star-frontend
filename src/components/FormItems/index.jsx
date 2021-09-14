import React, { Component } from 'react'

import {TextInputDo, TextInputCreate} from './TextInput';

import './index.css'

export class TextInput extends Component {
    render() {
        const { create } = this.props
        return (!create?
            <TextInputDo />:
            <TextInputCreate />
        )
    }
}
