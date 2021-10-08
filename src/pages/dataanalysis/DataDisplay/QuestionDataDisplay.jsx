import React, { Component } from 'react'
import {
    Col,
    Row,
    List,
    Input,
    Button,
} from 'antd'
import { 
    SearchOutlined,
} from '@ant-design/icons';

import './index.less'
import QuestionDisplay from '../../../components/QuestionDisplay';

const questions = [
    {
        id: 1,
        order: 1,
        task_id: "11111",
        question: "这是一个单行输入框",
        type: "text-input",
        value: "",
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

export default class QuestionDataDisplay extends Component {
    state = {
        questions: questions,
        nameFilter: "",
        showQuestionIdx: 0,
    }
    render() {
        let { questions, nameFilter, showQuestionIdx } = this.state
        questions = questions.filter(question => (question.question.indexOf(nameFilter) !== -1))
        return (
            <div className="data-display">
                <Row gutter={[16]}>
                    <Col style={{display: "flex", justifyContent:"center"}} span={8}>
                        <div style={{width: 230}}>
                            <div style={{fontSize: 30, fontWeight: "bold"}}>问题表单项</div>
                            <List
                                header={
                                    <Input
                                        placeholder="输入关键字筛选..."
                                        onChange={this.handleFilterChange}
                                        bordered={false}
                                        prefix={<SearchOutlined />}
                                        value={nameFilter}
                                    />
                                }
                                dataSource={questions}
                                renderItem={(item, idx) => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<Button type="link" onClick={this.handleChangeQuestion(idx)}>{idx+1}、{item.question}</Button>}
                                            description={item.required? "必填项" : "非必填"}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[16]} style={{ height: 200, display: "flex", alignItems: "center" }}>
                            <Col span={24}>
                                <div style={{fontSize: 30, fontWeight: "bold"}}>问题描述</div>
                                <QuestionDisplay question={questions[showQuestionIdx]} order={showQuestionIdx+1} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
    handleFilterChange = (e) => {
        this.setState({
            authorFilter: e.target.value
        })
    }
    handleChangeQuestion = (idx) => {
        return () => {
            this.setState({showQuestionIdx: idx})
        }
    }
}
