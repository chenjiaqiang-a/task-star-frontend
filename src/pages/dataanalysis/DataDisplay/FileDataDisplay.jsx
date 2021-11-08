import { Empty } from 'antd'
import React, { Component } from 'react'

export default class FileDataDisplay extends Component {
    render() {
        return (
            <div className="data-display" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Empty 
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{height: 150}}
                    description={
                        <span>该任务没有文件提交项</span>
                    }
                />
            </div>
        )
    }
}
