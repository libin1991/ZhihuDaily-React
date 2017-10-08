import React, {Component} from 'react';
import {Tabs} from 'antd';
import 'whatwg-fetch';
import PCTopicBlock from './topic_block';

const TabPane = Tabs.TabPane;

class Topics extends Component {
    constructor() {
        super();
        this.state = {
            themes: [],
        };
        if (sessionStorage.getItem('topicPaneKey')) {
            let key = sessionStorage.getItem(('topicPaneKey'));
            this.setState({
                current: key,
            })
        }
    }

    componentDidMount() {
        fetch('http://112.74.202.2:9999/api/4/themes')
            .then((response) => response.json())
            .then((data) => {
                this.setState((preState) => ({
                    themes: preState.themes.concat(data.others)
                }));
            });
    }

    changePane = (key) => { // 记录当前面板的key，存入sessionStorage 当后退时从本地存储中读取,避免每次后退都返回第一个面板
        this.setState({
            current: key,
        });
        sessionStorage.setItem('topicPaneKey', key);
    };

    render() {
        const {themes, current} = this.state;
        // console.log(current);
        const themeTab =
            <Tabs tabPosition='right' defaultActiveKey={current} onTabClick={this.changePane}>
                {
                    themes.map((theme, index) => <TabPane tab={theme.name} key={theme.id}>
                        <PCTopicBlock id={theme.id}/>
                        {/*只渲染了第一个！*/}
                    </TabPane>)
                }
            </Tabs>;
        return (
            <div className="topics">
                {themeTab}
            </div>
        )
    }

};
export default Topics;