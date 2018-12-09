
import React, { Component } from 'react'

import Articles from '../components/Articles';
import ApiMusic from '../utils/apiMusic';



export default class ArticleListView extends Component {

    state = {
        articles: []
    }

    componentDidMount() {

        ApiMusic.get().then(response => {

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
