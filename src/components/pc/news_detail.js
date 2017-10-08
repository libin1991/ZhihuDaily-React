import React, {Component} from 'react';
import {BackTop} from 'antd';
import Comments from './comments';
import NewsContent from '../news_content';
import {replaceUrl} from '../../js/util';


class NewsDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }

    componentDidMount() {
        let path = this.props.match.url;
        fetch('http://112.74.202.2:9999/api/4' + path) // 获取正文
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    data,
                }));
            });
    }

    render() {
        const id = this.props.match.params.id;
        const {data} = this.state;
        return (
            <div>
                {Object.keys(data).length && <NewsContent data={data}/>}
                <Comments id={id}/>
                <BackTop />
            </div>
        )
    }
}

export default NewsDetail;