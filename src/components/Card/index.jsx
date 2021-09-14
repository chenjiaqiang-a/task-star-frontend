import { StarFilled } from '@ant-design/icons'
import React, { Component } from 'react'

import './index.less'

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="icon">
                    <StarFilled />
                </div>
                <div className="title">
                    任务的名称（20字左右）
                </div>
                <div className="description">
                    任务的简介（60字左右）
                </div>
                <button onClick={this.handelTurnToTask} className="button">前往做任务</button>
            </div>
        )
    }

    handelTurnToTask = () => {
        this.props.history.push("/dotask")
    }
}
