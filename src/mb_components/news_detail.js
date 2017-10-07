import React, {Component} from 'react';
import NewsHeader from './news_header';
import LowDetail from '../pc_components/news_detail'
import {replaceUrl} from '../js/util';
import '../css/news_detail.styl';
class NewsDetail extends Component {
    constructor() {
        super();
        this.state={
           data:{}
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('http://112.74.202.2:9999/api/4/story-extra/' + id) // 获取附加信息 点赞与评论数量
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    data: data,
                }));
            });
    }
    render() {
        const {popularity, comments} = this.state.data;
        const path = this.props.match.url;
        const id = this.props.match.params.id;
        return (
            <div className="news-detail">
                <NewsHeader popularity={popularity} comments={comments} id={id}/>
                <LowDetail path = {path} mbMode={true} id={id} />
            </div>
        )
    }
}

export default NewsDetail;