import React, { Component } from 'react'
import {
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
                            {questions.map(
                                (question, idx) => <Question key={question.id} order={idx+1} question={question} handleValueChange={this.handleValueChange(idx)}/>
                            )}
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
}
