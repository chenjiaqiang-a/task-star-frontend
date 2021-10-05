import React, { Component } from 'react'
import { List } from 'antd';

import Header from '../../components/Header'
import Footer from "../../components/Footer";
import './search.less'
import { Link, Redirect } from 'react-router-dom';


const resultsList = [
    {
        title: "测试数据1",
        id: "1",
        desc: "测试数据1的描述",
    },
    {
        title: "测试数据2",
        id: "2",
        desc: "测试数据2的描述",
    },
    {
        title: "测试数据3",
        id: "3",
        desc: "测试数据3的描述",
    },
    {
        title: "测试数据4",
        id: "4",
        desc: "测试数据4的描述",
    },
    {
        title: "测试数据5",
        id: "5",
        desc: "测试数据5的描述",
    },
]

export default class Search extends Component {
    state = {
        loading: true,
        results: [],
        searchText: ""
    }

    componentDidUpdate() {
        const { search } = this.props.location
        const { searchText } = this.state;
        const kw = new URLSearchParams(search).get('kw')
        if (kw !== searchText) {
            this.setState({searchText: kw, loading: true})
            setTimeout(() => {
                this.setState({
                    loading: false,
                    results: resultsList
                })
            }, 1000)
        }
    }
    componentDidMount() {
        const { search } = this.props.location
        const kw = new URLSearchParams(search).get('kw')
        setTimeout(() => {
            this.setState({
                searchText: kw,
                loading: false,
                results: resultsList
            })
        }, 1000)
    }
    
    render() {
        const { loading, results } = this.state
        const { search } = this.props.location
        const kw = new URLSearchParams(search).get('kw')
        if (!kw) {
            return (
                <Redirect to="/home" />
            )
        }
        return (
            <div className="search-container">
                <Header history={this.props.history} />
                <div className="body">
                    <div className="search-content">
                        <div className="search-header">“{kw}”的搜索结果</div>
                        <div className="search-body">
                            <List
                            style={{ width: "100%"}}
                                dataSource={results}
                                itemLayout="vertical"
                                loading={loading}
                                pagination={{
                                    pageSize: 4
                                }}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<Link to="/dotask">{item.title}</Link>}
                                            description={item.desc}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
