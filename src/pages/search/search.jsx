import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from "../../components/Footer";

import './search.less'

export default class Search extends Component {
    render() {
        return (
            <div className="search-container">
                <Header history={this.props.history} />

                <Footer />
            </div>
        )
    }
}
