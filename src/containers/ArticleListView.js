
import React, { Component } from 'react'

import Articles from '../components/Articles';
import ApiService from '../services/api'



export default class ArticleListView extends Component {

    state = {
        articles: []
    }

    componentDidMount() {
       

        ApiService.get().then(response => {

            this.setState({
                articles: response
            });

        })



    }


    render() {
        return (
            <div>
                <Articles data={this.state.articles} />
            </div>
        )
    }
}
