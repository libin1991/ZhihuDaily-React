import React, {Component} from 'react';
import {Tabs, Button, message} from 'antd';
import NewsBlock from './news_block'; // 展示组件|函数定义组建|无状态组件

import {replaceUrl, formatDate} from '../../js/util'; // 知乎图片防盗链解决方法

const TabPane = Tabs.TabPane;

class Latest extends Component {
    constructor() {
        super();
        this.state = ({
            topStories: [],
            stories: [],
            date: '',
            topDate: '',
        })
    }

    componentDidMount() { // 请求今日数据
        if (sessionStorage.getItem('pc_latest')) {
            const data = JSON.parse(sessionStorage.getItem(('pc_latest')));
            this.setState({
                topStories: data.top_stories,
                stories: data.stories,
                date: data.date,
            });
            return;
        }
        fetch('http://112.74.202.2:9999/api/4/news/latest')
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                sessionStorage.setItem('pc_latest',JSON.stringify(data));
                this.setState({
                    topStories: data.top_stories,
                    stories: data.stories,
                    date: data.date,
                    topDate: data.date,
                })
            })
    }

    fetchNews = (date) => {
        fetch('http://112.74.202.2:9999/api/4/news/before/' + date)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                sessionStorage.setItem('pc_latest',JSON.stringify(data));
                this.setState({
                    stories: data.stories,
                    date: data.date,
                })
            })
    };

    getNextNews = () => {
        let date = (parseInt(this.state.date,10) + 1);
        if (date > parseInt(this.state.topDate,10)) {
            message.warning('没有更多啦');
            return;
        }
        this.fetchNews((date + 1).toString());
    };

    render() {
        const {topStories = [], stories = []} = this.state;
        let date = formatDate(this.state.date),
            topDate = formatDate(this.state.topDate);
        return (
            <div>
                <h1>
                    <Button type="dashed" onClick={() => {
                        this.fetchNews(this.state.date)
                    }}>前一天</Button>
                    {date}
                    <Button type="dashed" onClick={this.getNextNews}>后一天</Button>
                </h1>
                <Tabs>
                    <TabPane tab="Stories" key="1"><NewsBlock date={date} stories={stories}/></TabPane>
                    <TabPane tab="Top-Stories" key="2"><NewsBlock date={topDate} stories={topStories}/></TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Latest;