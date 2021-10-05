import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons'
import { Radio, Space, Button, Tooltip, Input, Checkbox } from 'antd'
import React, { Component } from 'react'
import Editable from '../../Editable'

export class RadioDo extends Component {
    render() {
        let { choices, choose } = this.props
        return (
            <Radio.Group onChange={this.handleChange} value={choose[0] ? choose[0] : ""}>
                <Space direction="vertical">
                    {choices.map((choice, idx) => (
                        <Radio key={choice.id} value={choice.id}>
                            {choice.text}
                            {choice.other && choose[0] === choice.id ?
                                <Input onChange={this.handleTextChange(idx)} style={{marginLeft: 15}} value={choice.value} />
                            :""}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        )
    }
    handleChange = (e) => {
        this.props.handleChooseChange([e.target.value])
    }
    handleTextChange = (idx) => {
        return (e) => {
            let text = e.target.value
            let { choices } = this.props
            choices[idx].value = text
            this.props.handleChoiceChange(choices)
        }
    }
}
export class RadioCreate extends Component {
    
    render() {
        let { choices } = this.props
        choices = choices.split(";")
        return (
            <Radio.Group disabled>
                <Space direction="vertical">
                    {choices.map((choice, idx) =>{ 
                        let other = false
                        if (choice[0] === "[" && choice.slice(1, 6) === "other") {
                            console.log("ok");
                            other = true
                            choice = choice.slice(7)
                        }
                        return (
                            <Radio style={{display:"flex", alignItems:"center"}} key={choice}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Editable onEdit={this.handleTextChange(idx, other)}>{choice}</Editable>
                                    {other? <Input disabled />: ""}
                                    <Tooltip title="删除选项">
                                        <Button type="link" onClick={this.handleDeleteChoice(idx)} style={{marginLeft: 20}} shape="circle" icon={<MinusCircleTwoTone twoToneColor="#ff4d4f"/>} />
                                    </Tooltip>
                                </div>
                            </Radio>
                        )
                    })}
                    <Space direction="horizontal">
                        <Tooltip title="添加一个选项">
                            <Button onClick={this.handleAddChoice} type="link" shape="circle" icon={<PlusCircleTwoTone twoToneColor="#1DA57A" />} />
                        </Tooltip>
                        <Tooltip title="添加其它选项">
                            <Button onClick={this.handleAddOther} type="link" shape="circle" icon={<PlusCircleTwoTone twoToneColor="#40a9ff" />}/>
                        </Tooltip>
                    </Space>
                </Space>
            </Radio.Group>
        )
    }
    handleTextChange = (idx, other) => {
        return (value) => {
            let { choices } = this.props
            choices = choices.split(";")
            if (other) {
                value = "[other]" + value
            }
            choices[idx] = value
            choices = choices.join(";");
            this.props.updateChoice(choices)
        }
    }
    handleDeleteChoice = (idx) => {
        return () => {
            let { choices } = this.props
            choices = choices.split(";")
            choices.splice(idx, 1)
            choices = choices.join(";");
            this.props.updateChoice(choices)
        }
    }
    handleAddChoice = () => {
        let { choices } = this.props
        choices += ";新选项"
        this.props.updateChoice(choices)
    }
    handleAddOther = () => {
        let { choices } = this.props
        choices += ";[other]其它"
        this.props.updateChoice(choices)
    }
}

export class CheckboxDo extends Component {
    render() {
        let { choices, choose } = this.props
        return (
            <Checkbox.Group onChange={this.handleChange} value={choose}>
                <Space direction="vertical">
                    {choices.map((choice, idx) => (
                        <Checkbox key={choice.id} value={choice.id}>
                            {choice.text}
                            {choice.other && choose.includes(choice.id) ?
                                <Input onChange={this.handleTextChange(idx)} style={{marginLeft: 25, marginTop: 10}} value={choice.value} />
                            : ""}
                        </Checkbox>
                    ))}
                </Space>
            </Checkbox.Group>
        )
    }
    handleChange = (checkedValue) => {
        this.props.handleChooseChange(checkedValue)
    }
    handleTextChange = (idx) => {
        return (e) => {
            let text = e.target.value
            let { choices } = this.props
            choices[idx].value = text
            this.props.handleChoiceChange(choices)
        }
    }
}
export class CheckboxCreate extends Component {
    render() {
        let { choices } = this.props
        choices = choices.split(";")
        return (
            <Checkbox.Group disabled>
                <Space direction="vertical">
                    {choices.map((choice, idx) => {
                        let other = false
                        if (choice[0] === "[" && choice.slice(1, 6) === "other") {
                            console.log("ok");
                            other = true
                            choice = choice.slice(7)
                        }
                        return (
                            <Checkbox style={{display:"flex", alignItems:"center"}} key={choice}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Editable onEdit={this.handleTextChange(idx, other)}>{choice}</Editable>
                                    {other? <Input disabled />: ""}
                                    <Tooltip title="删除选项">
                                        <Button type="link" onClick={this.handleDeleteChoice(idx)} style={{marginLeft: 20}} shape="circle" icon={<MinusCircleTwoTone twoToneColor="#ff4d4f"/>} />
                                    </Tooltip>
                                </div>
                            </Checkbox>
                        )
                    })}
                    <Space direction="horizontal">
                        <Tooltip title="添加一个选项">
                            <Button onClick={this.handleAddChoice} type="link" shape="circle" icon={<PlusCircleTwoTone twoToneColor="#1DA57A" />} />
                        </Tooltip>
                        <Tooltip title="添加其它选项">
                            <Button onClick={this.handleAddOther} type="link" shape="circle" icon={<PlusCircleTwoTone twoToneColor="#40a9ff" />}/>
                        </Tooltip>
                    </Space>
                </Space>
            </Checkbox.Group>
        )
    }
    handleTextChange = (idx, other) => {
        return (value) => {
            let { choices } = this.props
            choices = choices.split(";")
            if (other) {
                value = "[other]" + value
            }
            choices[idx] = value
            choices = choices.join(";");
            this.props.updateChoice(choices)
        }
    }
    handleDeleteChoice = (idx) => {
        return () => {
            let { choices } = this.props
            choices = choices.split(";")
            choices.splice(idx, 1)
            choices = choices.join(";");
            this.props.updateChoice(choices)
        }
    }
    handleAddChoice = () => {
        let { choices } = this.props
        choices += ";新选项"
        this.props.updateChoice(choices)
    }
    handleAddOther = () => {
        let { choices } = this.props
        choices += ";[other]其它"
        this.props.updateChoice(choices)
    }
}