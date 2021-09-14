import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import {
    Divider,
    Button,
    Space,
    Row,
    Col,
    Checkbox,
    Popconfirm,
    Tooltip,
    Modal,
    message,
} from 'antd'
import {
    DeleteOutlined,
    DownloadOutlined,
} from '@ant-design/icons'
import { 
    DragDropContext, 
    Draggable, 
    Droppable 
} from 'react-beautiful-dnd'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './createtask.less'
import Editable from '../../components/Editable'
import { reorder } from '../../utils/tools'
import QuestionCreate from '../../components/QuestionCreate'

const task = {
    title: "任务名称",
    description: "任务描述",
}
const questions = [
    {
        id: "1",
        task_id: "11111",
        question: "这是一个单行输入框",
        type: "text-input",
        choices: [],
        required: true,
        selected: false
    },
    {
        id: "2",
        task_id: "11111",
        question: "这是一个多行输入框",
        type: "text-area",
        choices: [],
        required: false,
        selected: false
    },
    {
        id: "3",
        task_id: "11111",
        question: "这是一个单行输入框",
        type: "text-input",
        choices: [],
        selected: false,
        required: true,
    },
    {
        id: "4",
        task_id: "11111",
        question: "这是一个多行输入框",
        type: "text-area",
        choices: [],
        required: false,
        selected: false
    }
]

export default class CreateTask extends Component {
    state = {
        task: task,
        questions: questions,
        visible: false
    }

    render() {
        const {task, questions, visible} = this.state
        const modal = (
            <Modal
                title="确认删除"
                visible={visible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
            >
                确定删除所选的问题吗？
            </Modal>
        )
        return (
            <div className="create-task">
                <Header/>
                <div className="create-task-body body">
                    <div className="left-operating-area">
                        <Divider orientation="left">批量操作</Divider>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <Button onClick={this.handleUncheckAll}>取消选择</Button>
                            <Button onClick={this.handleDeleteSelect}>批量删除</Button>
                            {modal}
                        </Space>
                        <Divider orientation="left">表单项关系</Divider>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <Button>级联关系</Button>
                            <Button>优先级</Button>
                            <Button>取消表单项关系</Button>
                        </Space>
                        <Divider orientation="left">分页操作</Divider>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <Button>添加一页</Button>
                            <Button>合并所有页</Button>
                        </Space>
                        
                    </div>
                    
                    <div className="create-platform">
                        <div className="paper">
                            <Editable className="title" onEdit={this.handleTitleEdit}>
                                {task.title}
                            </Editable>
                            <Editable className="desc" textarea onEdit={this.handleDescEdit}>
                                {task.description}
                            </Editable>
                            <Divider />
                            
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="create-question-area">
                                    {(provided, snapshot) => (
                                        <div 
                                            className="question-list"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={this.getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {questions.map((question, idx) => (
                                                <Draggable key={question.id} draggableId={question.id} index={idx}>
                                                    {(provided, snapshot) => (
                                                        <div 
                                                            className={question.selected? "question-item selected" : "question-item"}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={this.getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <Checkbox className="checkbox" onChange={this.handleChecked(idx)} checked={question.selected} />
                                                            <QuestionCreate order={idx+1} question={question} updateQuestion={this.updateQuestion} />
                                                            <Tooltip title="必填">
                                                                <Checkbox className="required-checkbox" onChange={this.handleRequired(idx)} checked={question.required} />
                                                            </Tooltip>
                                                            <Popconfirm
                                                                title="确定删除此项问题吗？"
                                                                onConfirm={this.handleDelete(idx)}
                                                                okText="确定"
                                                                cancelText="取消"
                                                            >
                                                                <Button className="delete" type="link" size="large" icon={<DeleteOutlined />} />
                                                            </Popconfirm>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            
                        </div>
                    </div>
                    
                    <div className="right-operating-area">
                        <Divider orientation="right">输入组件</Divider>
                        <Row gutter={[8, 8]}>
                            <Col span={8}>
                                <Tooltip title="单行文本输入框">
                                    <Button type="primary" onClick={this.addInput} icon={<span className="iconfont icon-input" />} size='large' />
                                </Tooltip>
                            </Col>
                            <Col span={8}>
                                <Tooltip title="多行文本输入框">
                                    <Button type="primary" icon={<span className="iconfont icon-wenbenkuang" />} size='large' />
                                </Tooltip>
                            </Col>
                        </Row>
                        <Divider orientation="right">选择组件</Divider>
                        <Row gutter={[8, 8]}>
                            <Col span={8}><Button type="primary" icon={<DownloadOutlined />} size={'large'} /></Col>
                            <Col span={8}><Button type="primary" icon={<DownloadOutlined />} size={'large'} /></Col>
                            <Col span={8}><Button type="primary" icon={<DownloadOutlined />} size={'large'} /></Col>
                        </Row>
                        <Divider orientation="right">文件组件</Divider>
                        <Row gutter={[8, 8]}>
                            <Col span={8}><Button type="primary" icon={<DownloadOutlined />} size={'large'} /></Col>
                            <Col span={8}><Button type="primary" icon={<DownloadOutlined />} size={'large'} /></Col>
                        </Row>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
    handleTitleEdit = (content) => {
        this.setState({
            title: content
        })
    }
    handleDescEdit = (content) => {
        this.setState({
            description: content
        })
    }
    onDragEnd = (result) => {
        if (!result.destination) {
            return
        }
        const questions = reorder(
            this.state.questions,
            result.source.index,
            result.destination.index
        )

        this.setState({questions})
    }
    getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightgrey" : "#f6f6f6"
    })
    getItemStyle = (isDragging, draggableStyle) => ({
        background: isDragging ? "rgba(255, 255, 255, 0.7)" : "#fff",
        ...draggableStyle
    })
    updateQuestion = (idx, question) => {
        let questions = this.state.questions
        questions[idx] = question
        this.setState({questions})
    }
    handleChecked = (index) => {
        return (event) => {
            let {questions} = this.state
            questions[index].selected = event.target.checked
            this.setState({questions})
        }
    }
    handleRequired = (index) => {
        return (event) => {
            let {questions} = this.state
            questions[index].required = event.target.checked
            this.setState({questions})
        }
    }
    handleDelete = (index) => {
        return () => {
            let {questions} = this.state
            questions.splice(index, 1)
            this.setState({questions, visible: false})
        }
    }
    handleUncheckAll = () => {
        let questions = this.state.questions.map((question) => {
            question.selected = false
            return question
        })
        this.setState({questions})
    }
    handleDeleteSelect = () => {
        let {questions} = this.state
        if (!questions.find((question) => question.selected)) {
            message.warn("未选择任何问题！")
            return
        }
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        let questions = this.state.questions.filter((question) => !question.selected)
        this.setState({questions, visible: false})
    }
    handleCancel = () => {
        this.setState({visible: false})
    }

    // 表单插入函数
    addInput = () => { 
        let {questions} = this.state
        let newQuestion = {
            id: nanoid(),
            task_id: "11111",
            question: "这是一个单行输入框",
            type: "text-input",
            choices: [],
            required: true,
            selected: false
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
}
