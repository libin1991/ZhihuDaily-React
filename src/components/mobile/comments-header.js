import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import {Icon} from 'antd';

import './comments-header.styl';

const history = createBrowserHistory();

const CommentsHeader = (props) => { // 渲染头部导航（移动端）
    const {length} = props;
    return (
        <header className="comments-header">
            <Icon type="arrow-left" onClick={() => {
                history.goBack()
            }}/>
            <span className="length">{length}条点评</span>
            <Icon type="edit" className="edit"/>
        </header>
    )
};

export default CommentsHeader;