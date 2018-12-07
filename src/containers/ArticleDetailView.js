
import React, { Component } from 'react'
import { Card } from 'antd'
import ApiService from '../services/api'

export default class ArticleDetailView extends Component {

    state = {
        article: {}
    }

    

    componentDidMount() {
       

        ApiService.getId(this.props.match.params.articleID).then(response => {

            this.setState({
                article: response
            });

        })
    }


    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <p>{this.state.article.description}</p>
                </Card>
            </div>
        )
    }
}
