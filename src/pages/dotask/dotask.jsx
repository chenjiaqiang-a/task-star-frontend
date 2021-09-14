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
    description: "这是一个测试任务\n这是一个测试任务",
    id: "11111",
    questions: [
        {
            id: 1,
            order: 1,
            task_id: "11111",
            question: "这是一个单行输入框",
            type: "text-input",
            choices: [],
            required: true,
        },
        {
            id: 2,
            order: 2,
            task_id: "11111",
            question: "这是一个多行输入框",
            type: "text-area",
            choices: [],
            required: false,
        }
    ]
}

export default class DoTask extends Component {
    state = {
        task: testTask,
    }
    render() {
        const { task } = this.state
        const { questions } = task
        return (
            <div className="do-task">
                <Header />
                <div className="body">
                    <div className="task-paper">
                        <h1 >{task.title}</h1>
                        <div className="desc">
                            {task.description.split("\n").map(row => <p>{row}</p>)}
                        </div>
                        <Divider />
                        <div className="question-list">
                            {questions.map(
                                (question, idx) => <Question key={question.id} order={idx+1} question={question}/>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
