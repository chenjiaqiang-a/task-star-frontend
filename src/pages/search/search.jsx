import React, { Component } from 'react'
import { List } from 'antd';

import Header from '../../components/Header'
import Footer from "../../components/Footer";
import './search.less'
import { Link, Redirect } from 'react-router-dom';
import api from '../../api';

export default class Search extends Component {
    state = {
        loading: true,
        results: [],
        searchText: ""
    }

    async componentDidUpdate() {
        const { search } = this.props.location
        const { searchText } = this.state;
        const kw = new URLSearchParams(search).get('kw')
        if (kw !== searchText) {
            this.setState({searchText: kw, loading: true})
            const result = await api.searchTasks(kw)
            this.setState({
                loading: false,
                results: result
            })
        }
    }
    async componentDidMount() {
        const { search } = this.props.location
        const kw = new URLSearchParams(search).get('kw')
        const result = await api.searchTasks(kw)
        this.setState({
            searchText: kw,
            loading: false,
            results: result
        })
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
                                            title={<Link to={`/dotask/${item.id}`}>{item.title}</Link>}
                                            description={item.description}
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
