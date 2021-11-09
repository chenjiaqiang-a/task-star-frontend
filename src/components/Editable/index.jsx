import { EditTwoTone } from '@ant-design/icons'
import React, { Component } from 'react'


import './index.less'

export default class Editable extends Component {
    state = {
        isEditing: false,
        content: "",
    }
    componentDidMount () {
        this.setState({
            content: this.props.children
        })
    }
    componentDidUpdate () {
        if (this.state.content !== this.props.children) {
            this.setState({
                content: this.props.children
            })
        }
    }
    render() {
        const {isEditing, content} = this.state
        const {textarea} = this.props
        let rows = content.split("\n")
        let item
        if (isEditing) {
            item = !textarea?
                    <input 
                        className="content"
                        type="text"
                        onChange={this.handleTextChange}
                        value={content}
                        autoFocus
                        onBlur={this.handleBlur}
                    /> :
                    <textarea
                        className="content"
                        onChange={this.handleTextChange}
                        value={content}
                        autoFocus
                        rows={rows.length>3?rows.length:3}
                        onBlur={this.handleBlur}
                    />
        } else {
            item = (
                <div className="content">
                    {rows.map((row, index, arr) => {
                        if (index !== arr.length-1) {
                            return <p>{row}</p>
                        } else {
                            return ""
                        }
                    })}
                    {rows[rows.length-1]}
                    &nbsp;
                    <EditTwoTone twoToneColor="#1DA57A" onClick={this.handelEditIconClicked} />
                </div>
            )
        }
        return (
            <div className={this.props.className + " editable"}>
                {item}
            </div>
        )
    }
    handelEditIconClicked = () => {
        this.setState({
            isEditing: true
        })
    }

    handleTextChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    handleBlur = () => {
        this.props.onEdit(this.state.content)
        this.setState({
            isEditing: false
        })
    }
}
