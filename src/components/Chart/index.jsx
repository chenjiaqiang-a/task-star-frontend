import * as echarts from 'echarts';
import React, { Component } from 'react'

export default class Chart extends Component {
    componentDidMount() {
        const { chartId, options } = this.props
        let chart = echarts.init(document.getElementById(chartId))
        chart.setOption(options)
    }
    render() {
        const { chartId } = this.props
        return (
            <div id={chartId} style={{width: "100%", height: "100%"}}>
            </div>
        )
    }
}
