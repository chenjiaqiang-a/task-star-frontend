import { Drawer } from 'antd'
import React, { Component } from 'react'

import QuestionDisplay from '../QuestionDisplay'

const task = {
    title: "测试任务",
    description: "这是一个测试任务\n这是一个测试任务第二行",
    id: "11111",
    questions: [
        {
            id: 1,
            order: 1,
            task_id: "11111",
            question: "这是一个单行输入框",
            type: "text-input",
            value: "abc",
            choices: [],
            choose: [],
            required: true,
        },
        {
            id: 2,
            order: 2,
            task_id: "11111",
            question: "这是一个多行输入框",
            type: "text-area",
            value: "",
            choices: [],
            choose: [],
            required: false,
        },
        {
            id: 3,
            order: 3,
            task_id: "11111",
            question: "这是一个日期输入框",
            type: "date-input",
            value: "",
            choices: [],
            choose: [],
            required: false,
        },
        {
            id: 4,
            order: 4,
            task_id: "11111",
            question: "这是一个单项选择",
            type: "radio",
            value: "",
            choices: [
                {id: 1, question_id: 4, text: "选项一", other: false}, 
                {id: 2, question_id: 4, text: "选项二", other: false}, 
                {id: 3, question_id: 4, text: "其它", other: true, value: ""}
            ],
            choose: [],
            required: true,
        },
        {
            id: 5,
            order: 5,
            task_id: "11111",
            question: "这是一个单项选择",
            type: "checkbox",
            value: "",
            choices: [
                {id: '1', question_id: 4, text: "选项一", other: false}, 
                {id: '2', question_id: 4, text: "选项二", other: false}, 
                {id: '3', question_id: 4, text: "其它", other: true, value: ""}
            ],
            choose: [],
            required: true,
        }
    ]
}

export default class TaskDrawer extends Component {
    state = {
        task: task
    }
    render() {
        const { visible } = this.props
        const { task } = this.state
        const { questions } = task
        const header = (
            <div style={{ width:"100%", marginTop: 10}}>
                <h1 style={{fontSize: 40,textAlign: "center",fontWeight: 400,fontFamily: "MyFont1"}}>{task.title}</h1>
                <div style={{ fontSize: 20,borderLeft: "6px solid #999",paddingLeft: 10}}>
                    {task.description.split("\n").map(row => <p style={{margin:0}} key={row}>{row}</p>)}
                </div>
            </div>
        )
        return (
            <Drawer
                visible={visible}
                width={736}
                onClose={this.onClose}
                title={header}
                destroyOnClose
            >
                <div>
                    {questions.map((question, idx) => (
                        <QuestionDisplay key={question.id} order={idx+1} question={question} />
                    ))}
                </div>
            </Drawer>
        )
    }
    onClose = () => {
        this.props.onClose()
    }
}
