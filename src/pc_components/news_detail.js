import React, {Component} from 'react';
import NewsComment from './comments';
import Avatar from '../mb_components/avatar'
import {replaceUrl} from '../js/util';
import {BackTop} from 'antd';

import '../css/pc_news_detail.styl'

class PCNewsDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        let path = this.props.match ? this.props.match.url : this.props.path; // PC端作为路由组件传递路由信息 移动端作为普通组件传递参数
        fetch('http://112.74.202.2:9999/api/4' + path) // 获取正文
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    data: data,
                }));
            });
    }


    renderRecommenders() { // 如果是theme下的文章，则隐藏img，渲染推荐者
        const {recommenders = []} = this.state.data;
        if (recommenders.length === 0) return;
        return (
            <div className="recommenders">
                <span className="title">推荐者</span>
                {
                    recommenders.map((rec, index) => <Avatar className="rec" key={rec.avatar} url={rec.avatar}/>)
                }
            </div>
        )
    }

    renderImg() { // 如果是移动端就渲染题图 PC端则不渲染
        const {image = '', title = ''} = this.state.data;
        return (
            <div style={{backgroundImage: `url(${image})`, backgroundSize: '100% 100%'}} className="detail-pic">
                <h1 className="detail-title">{title}</h1>
            </div>
        )
    }

    render() {
        const {body = '', css = [], theme = ''} = this.state.data;
        const id = this.props.match ? this.props.match.params.id : this.props.id; // 移动端与pc端判断获取id
        return (
            <div className="details">
                {theme ? this.renderRecommenders() : this.props.mbMode ? this.renderImg() : ''}
                <div dangerouslySetInnerHTML={{__html: body}}/>
                <link rel="stylesheet" href={css[0]}/>
                {!this.props.mbMode && <NewsComment id={id}/>}
                <BackTop/>
            </div>
        )
    }
}

export default PCNewsDetail;