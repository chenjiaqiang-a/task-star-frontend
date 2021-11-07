import { StarFilled } from '@ant-design/icons'
import React, { Component } from 'react'

import './index.less'

export default class Card extends Component {

    render() {
        let {task} = this.props
        
        return (
            <div className="card">
                <div className="icon">
                    <StarFilled />
                </div>
                <div className="task-title">
                    {task.title}
                </div>
                <div className="task-description">
                    <div className="task-desc">{task.description.replace("\n", "")}</div>
                </div>
                <button onClick={this.handelTurnToTask} className="button">前往做任务</button>
            </div>
        )
    }

    handelTurnToTask = () => {
        let {task} = this.props
        this.props.history.push(`/dotask/${task.id}`)
    }
}
