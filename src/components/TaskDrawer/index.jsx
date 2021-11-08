import { Drawer, message } from 'antd'
import React, { Component } from 'react'
import api from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { combineQuestionAndAnswer } from '../../utils/tools'

import QuestionDisplay from '../QuestionDisplay'

export default class TaskDrawer extends Component {
    state = {
        task: {
            title: "",
            description: ""
        },
        questions: []
    }

    async componentDidMount() {
        let {taskId, create, answerId} = this.props
        const result = await api.getTaskById(taskId*1)
        if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权已过期，请重新登录！")
            this.props.history.push("/login")
            return
        } else if (!result) {
            message.info("获取任务失败！")
            return            
        }

        let {task, questions} = result

        if (!create) {
            const answer = await api.getAnswerById(answerId)
            if (!answer) {
                message.error("获取答案失败！")
            } else {
                questions = combineQuestionAndAnswer(questions, answer)
            }
        }
        
        this.setState({
            task,
            questions
        })
    }
    render() {
        const { visible } = this.props
        const { task, questions } = this.state
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
