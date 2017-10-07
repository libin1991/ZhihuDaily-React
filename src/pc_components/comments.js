import React, {Component} from 'react';
import {Collapse, Icon} from 'antd';
import {replaceUrl} from '../js/util';
import Comment from './comment';
import createBrowserHistory from 'history/createBrowserHistory';
import '../css/comments.styl';

const history = createBrowserHistory();
const Panel = Collapse.Panel;


class NewsComment extends Component {
    constructor() {
        super();
        this.state = {
            shortComments: [],
            longComments: [],
        }
    }

    componentDidMount() {
        const {id} = this.props;
        fetch(`http://112.74.202.2:9999/api/4/story/${id}/short-comments`) // 获取短评论
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    shortComments: preventState.shortComments.concat(data.comments)
                }));
            });

        fetch(`http://112.74.202.2:9999/api/4/story/${id}/long-comments`) // 获取长评论
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preventState) => ({
                    longComments: preventState.longComments.concat(data.comments)
                }));
            });
    }

    renderHeader() { // 如果是移动端就渲染头部导航
        const {shortComments, longComments} = this.state;
        const length = longComments.length + shortComments.length;
        return (
            <header className="comments-header">
                <Icon type="arrow-left" onClick={() => {
                    history.goBack()
                }}/>
                <span className="length">{length}条点评</span>
                <Icon type="edit" className="edit"/>
            </header>
        )
    }

    render() {
        const {shortComments, longComments} = this.state;
        const mbMode = this.props.mbMode || false; // 判断是否是移动端
        const length = longComments.length + shortComments.length;
        if (longComments.length === 0 && shortComments.length === 0) return (<div>暂无评论</div>);
        return (
            <div className="comments">
                {mbMode ? this.renderHeader() : <p>{length}条点评</p>}
                <Collapse defaultActiveKey={['1']} className="Collapse">
                    <Panel header={`${longComments.length}条长评`} key="1">
                        {longComments.length ? longComments.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment}/>
                            )
                        }) : <p>0条长评</p>}
                    </Panel>
                    <Panel header={`${shortComments.length}条短评`} key="2">
                        {shortComments.length ? shortComments.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment}/>
                            )
                        }) : <p>0条短评</p>}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default NewsComment;