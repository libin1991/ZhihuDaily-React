import React, {Component} from 'react';
import NewsHeader from './news_header';
import NewsContent from '../news_content';
import {replaceUrl} from '../../js/util';

import './news_detail.styl';

class NewsDetail extends Component {
    constructor() {
        super();
        this.state = {
            extra: {},
            data: {},
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        const path = this.props.match.url;
        fetch('http://112.74.202.2:9999/api/4/story-extra/' + id) // 获取附加信息 点赞与评论数量
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState({
                    extra: data,
                });
            });

        fetch('http://112.74.202.2:9999/api/4' + path) // 获取正文
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState({
                    data,
                })
            });
    }

    render() {
        const id = this.props.match.params.id;
        const {popularity, comments} = this.state.extra;
        return (
            <div className="news-detail">
                <NewsHeader popularity={popularity} comments={comments} id={id}/>
                <NewsContent data={this.state.data} mbMode={true}/>
            </div>
        )
    }
}

export default NewsDetail;