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
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'
import api from '../../api'
import storageUtils from '../../utils/storageUtils'

export default class CreateTask extends Component {
    state = {
        task:  {
            title: "任务名称",
            description: "任务描述",
            private: false,
            manySubmit: false,
            creator: "",
            status: 2,
            id: nanoid(),
        },
        questions: [],
        deletedQuestion: [],
        visible: false,
        modify: false
    }
    async componentDidMount() {
        let result = await api.refreshToken()
        if (result) {
            memoryUtils.token = result
            storageUtils.saveToken(result)
        } else {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权过时，请重新登录！")
            this.props.history.push("/login")
        }

        if (this.props.location.state) {
            let {taskId} = this.props.location.state
            let taskResult = await api.getTaskById(taskId, true)
            if (!taskResult) {
                message.error("获取任务失败！")
                this.props.history.goBack()
                return
            } else if (taskResult === "token") {
                memoryUtils.isSignedIn = false
                storageUtils.removeIsSignedIn()
                message.info("登录授权过期，请重新登录！")
                this.props.history.push("/login")
            } else {
                this.setState({
                    task: taskResult.task,
                    questions: taskResult.questions,
                    modify: true
                })
            }
        }
    }

    render() {
        if (!memoryUtils.isSignedIn) {
            message.info("请先登录！")
            return <Redirect to="/login" />
        }
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
                <Header history={this.props.history} />
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
                        <Divider orientation="left">任务属性</Divider>
                        <Space style={{ width: "100%" }} direction="vertical">
                            <Checkbox onChange={this.handleCheckPublic} checked={!task.private}>公开任务</Checkbox>
                            <Checkbox onChange={this.handleManySubmit} checked={task.manySubmit}>允许多次提交</Checkbox>
                        </Space>
                        <Divider/>
                        <Space>
                            <Button onClick={this.handleSaveToDraft} >存入草稿</Button>
                            <Button onClick={this.handleSaveTask} type="primary" >创建任务</Button>

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
                                                <Draggable key={question.id} draggableId={question.id+""} index={idx}>
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
                                    <Button type="primary" onClick={this.addTextArea} icon={<span className="iconfont icon-wenbenkuang" />} size='large' />
                                </Tooltip>
                            </Col>
                            <Col span={8}>
                                <Tooltip title="日期选择框">
                                    <Button type="primary" onClick={this.addDateInput} icon={<span className="iconfont icon-riqi" />} size='large' />
                                </Tooltip>
                            </Col>
                        </Row>
                        <Divider orientation="right">选择组件</Divider>
                        <Row gutter={[8, 8]}>
                            <Col span={8}>
                                <Tooltip title="单项选择">
                                    <Button type="primary" onClick={this.addRadio} icon={<span className="iconfont icon-danxuan" />} size='large' />
                                </Tooltip>
                            </Col>
                            <Col span={8}>
                                <Tooltip title="多项选择">
                                    <Button type="primary" onClick={this.addCheckbox} icon={<span className="iconfont icon-checkBox" />} size='large' />
                                </Tooltip>
                            </Col>
                        </Row>
                        <Divider orientation="right">文件组件</Divider>
                        <Row gutter={[8, 8]}>
                            <Col span={8}>
                                <Tooltip title="图片上传">
                                    <Button type="primary" onClick={this.addImageUploader} icon={<span className="iconfont icon-tupian" />} size='large' />
                                </Tooltip>
                            </Col>
                            <Col span={8}>
                                <Tooltip title="文件上传">
                                    <Button type="primary" onClick={this.addFileUploader} icon={<span className="iconfont icon-wenjian" />} size='large' />
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
    handleTitleEdit = (content) => {
        let {task} = this.state
        task.title = content
        this.setState({task})
    }
    handleDescEdit = (content) => {
        let {task} = this.state
        task.description = content
        this.setState({task})
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
            let {questions, deletedQuestion} = this.state
            if (questions[index].status !== 3) {
                questions[index].status = 2
                deletedQuestion.push(questions[index])
            }
            questions.splice(index, 1)
            this.setState({questions, visible: false, deletedQuestion})
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
        let {questions, deletedQuestion} = this.state
        questions.forEach(item => {
            if (item.selected) {
                item.status = 2
                deletedQuestion.push(item)
            }
        })

        questions = questions.filter((question) => !question.selected)
        this.setState({questions, visible: false, deletedQuestion})
    }
    handleCancel = () => {
        this.setState({visible: false})
    }
    handleCheckPublic = (e) => {
        let { task } = this.state
        task.private = !e.target.checked
        this.setState({task})
    }
    handleManySubmit = (e) => {
        let {task} = this.state
        task.manySubmit = e.target.checked
        this.setState({task})
    }
    // 任务创建
    handleSaveTask = async () => {
        let {task, questions, deletedQuestion, modify} = this.state
        task.creator = memoryUtils.userInfo.userId
        task.status = 2

        if (modify) {
            const result = await api.updateTaskDetail(task, questions, deletedQuestion)
            if (!result) {
                message.error("任务更新失败！")
                return
            } else if (result === "token") {
                memoryUtils.isSignedIn = false
                storageUtils.removeIsSignedIn()
                message.info("登录授权过期，请重新登录！")
                this.props.history.push("/login")
                return
            }
            message.success("任务更新成功！")
            this.props.history.replace("/main/tasks")
            return
        }

        const result = await api.createTask(task, questions)
        if (!result) {
            message.error("任务创建失败！")
            return
        } else if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权过期，请重新登录！")
            this.props.history.push("/login")
            return
        }
        message.success("任务创建成功！")
        this.props.history.replace("/main/tasks")
    }
    // 存入草稿
    handleSaveToDraft = async () => {
        let {task, questions, deletedQuestion, modify} = this.state
        task.creator = memoryUtils.userInfo.userId
        task.status = 5

        if (modify) {
            const result = await api.updateTaskDetail(task, questions, deletedQuestion)
            if (!result) {
                message.error("任务保存失败！")
                return
            } else if (result === "token") {
                memoryUtils.isSignedIn = false
                storageUtils.removeIsSignedIn()
                message.info("登录授权过期，请重新登录！")
                this.props.history.push("/login")
                return
            }
            message.success("任务保存成功！")
            this.props.history.replace("/main/drafts")
            return
        }

        const result = await api.createTask(task, questions)
        if (!result) {
            message.error("任务保存失败！")
            return
        } else if (result === "token") {
            memoryUtils.isSignedIn = false
            storageUtils.removeIsSignedIn()
            message.info("登录授权过期，请重新登录！")
            this.props.history.push("/login")
            return
        }
        message.success("任务保存成功！")
        this.props.history.replace("/main/drafts")
    }

    // 表单插入函数
    addInput = () => { 
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个单行输入框",
            type: "text-input",
            choices: "non",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addTextArea = () => {
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个多行输入框",
            type: "text-area",
            choices: "non",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addDateInput = () => {
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个日期选择框",
            type: "date-input",
            choices: "non",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addRadio = () => {
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个单项选择",
            type: "radio",
            choices: "选项一;选项二",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addCheckbox = () => {
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个多项选择",
            type: "checkbox",
            choices: "选项一;选项二",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addImageUploader = () => {
        let { questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个图片上传",
            type: "image-uploader",
            choices: "1",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
    addFileUploader = () => {
        let {questions} = this.state
        let newQuestion = {
            id: nanoid(),
            question: "这是一个文件上传",
            type: "file-uploader",
            choices: "non",
            required: true,
            selected: false,
            status: 3
        }
        questions.push(newQuestion)
        this.setState({questions})
    }
}
