
import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'antd'


export default class ArticleDetailView extends Component {

    state = {
        article: {}
    }

    componentDidMount() {

        const articleID = this.props.match.params.articleID;

        axios.get(`http://127.0.0.1:8000/api/${articleID}`).then(res => {

            console.log(res.data)

            this.setState({
                article: res.data
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
