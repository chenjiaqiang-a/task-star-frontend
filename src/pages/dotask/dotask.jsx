import React, { Component } from 'react'
import {
    Button,
    Divider,
    message,
} from 'antd'

import "./dotask.less"
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Question from '../../components/Question';
import memoryUtils from '../../utils/memoryUtils';
import api from '../../api';
import storageUtils from '../../utils/storageUtils';

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

function getAnswerContent(answer) {
    let value
    if (answer.type === "radio") {
        if (!answer.choose.length) {
            return ""
        }
        let choose = answer.choices[answer.choose[0]]
        if (choose.other) {
            value = "[other]"+answer.choose[0] + ":" + choose.value
        } else {
            value = answer.choose[0] + ""
        }
    } else if (answer.type === "checkbox") {
        if (!answer.choose.length) {
            return ""
        }
        let choose = answer.choose.map(idx => {
            if(answer.choices[idx].other) {
                return "[other]"+ idx + ":" + answer.choices[idx].value
            } else {
                return idx + ""
            }
        })
        value = choose.join(";")
    } else {
        value = answer.value
    }
    return value
}

export default class DoTask extends Component {
    state = {
        task: testTask,
        questions: testTask.questions
    }

    async componentDidMount() {
        const { id } = this.props.match.params
        // 获取任务详情
        const result = await api.getTaskById(id*1)
        if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过期，请重新登录！")
            this.props.history.push("/login")
        } else if (!result) {
            message.info("获取任务失败！")
            this.props.history.goBack()
        }
        this.setState({
            task: result.task,
            questions: result.questions
        })

        // 获取用户答案
    }

    render() {
        if (!memoryUtils.isSignedIn) {
            message.info("请先登录！")
            this.props.history.push("/login")
        }
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
                            <Button onClick={this.handleSaveToDraft} style={{height: "100%", marginRight: 15}} size="large">存入草稿</Button>
                            <Button onClick={this.handleSubmitTask} type="primary" style={{height: "100%"}} size="large">完成提交</Button>
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
    handleSaveToDraft = async () => {
        let {task, questions} = this.state
        let answers = questions.map(item => {
            let answer = {}
            answer.question_id = item.id
            answer.task_id = item.task_id
            answer.content = getAnswerContent(item)
            return answer
        })
        let note = {
            user_id: memoryUtils.userInfo.userId,
            task_id: task.id,
            create_time: new Date(),
            update_time: new Date(),
            status: 2
        }

        let result = await api.submitAnswer(note, answers)
        if (result === "token") {
            message.error("提交失败！")
            return
        } else if (!result) {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过期，请重新登录！")
            this.props.history.push("/login")
            return
        }
        message.success("提交成功！")
        this.props.history.replace("/main/drafts")
    }
    handleSubmitTask = async () => {
        let {task, questions} = this.state
        let complete = true
        let answers = questions.map(item => {
            let answer = {}
            answer.question_id = item.id
            answer.task_id = item.task_id
            answer.content = getAnswerContent(item)
            if (item.required && !answer.content) {
                complete = false
            }
            return answer
        })

        if (!complete) {
            message.error("还有必填项没有填写！")
            return
        }

        let note = {
            user_id: memoryUtils.userInfo.userId,
            task_id: task.id,
            create_time: new Date(),
            update_time: new Date(),
            status: 1
        }
        
        let result = await api.submitAnswer(note, answers)
        if (result === "token") {
            message.error("提交失败！")
            return
        } else if (!result) {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过期，请重新登录！")
            this.props.history.push("/login")
            return
        }
        message.success("提交成功！")
        this.props.history.replace("/main/tasks")
    }
}
