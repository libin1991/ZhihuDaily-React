import React, {Component} from 'react';
import Avatar from '../avatar';
import IndexHeader from './/index_header';
import {replaceUrl} from "../../js/util";
import List from './list';
import '../../css/topic.styl'

class Latest extends Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchTheme(id);
    }

    componentWillReceiveProps(nextProps) { // 处理组件相同路由切换页面不刷新的问题
        const id = nextProps.match.params.id;
        this.fetchTheme(id);
    }

    fetchTheme(id) {
        fetch(`http://112.74.202.2:9999/api/4/theme/${id}`)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState({
                    data: data
                })
            })
    }

    render() {
        const {stories = [], name, description, background = '', editors = []} = this.state.data;
        const Editors = editors.map((editor, index) =>
            <a target="_blank" className="editor" key={editor.id} href={editor.url}>
                <Avatar url={editor.avatar}/>
            </a>
        );
        return (
            <div className="topic_block">
                <IndexHeader isIndex={false} title={name}/>
                <div style={{backgroundImage: `url(${background})`, backgroundSize: '100% 100%'}} className="topic-pic"><h1 className="topic-title">{description}</h1></div>
                <div className="editors">
                    <span>主编</span>{Editors}
                </div>
                <List stories={stories}/>
            </div>
        )
    }
}

export default Latest;