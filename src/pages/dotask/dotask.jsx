import React, { Component } from 'react'
import {
    Button,
    Divider,
} from 'antd'

import "./dotask.less"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Question from '../../components/Question';

const testTask = {
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

export default class DoTask extends Component {
    state = {
        task: testTask,
        questions: testTask.questions
    }
    render() {
        const { task, questions } = this.state
        return (
            <div className="do-task">
                <Header history={this.props.history} />
                <div className="body">
                    <div className="task-paper">
                        <h1 >{task.title}</h1>
                        <div className="desc">
                            {task.description.split("\n").map(row => <p key={row}>{row}</p>)}
                        </div>
                        <Divider />
                        <div className="question-list">
                            {questions.map((question, idx) => (
                                <Question 
                                    key={question.id}
                                    order={idx+1}
                                    question={question}
                                    handleValueChange={this.handleValueChange(idx)}
                                    handleChoiceChange={this.handleChoiceChange(idx)}
                                    handleChooseChange={this.handleChooseChange(idx)}
                                />
                            ))}
                        </div>
                        <div className="submit-btn">
                            <Button type="primary" style={{height: "100%"}} size="large">完成提交</Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    handleValueChange = (idx) => {
        return (value) => {
            let { questions } = this.state
            questions[idx].value = value
            this.setState({questions})
        }
    }
    handleChoiceChange = (idx) => {
        return (choices) => {
            let { questions } = this.state
            questions[idx].choices = choices
            this.setState({questions})
        }
    }
    handleChooseChange = (idx) => {
        return (choose) => {
            let { questions } = this.state
            questions[idx].choose = choose
            this.setState({questions})
        }
    }
}
