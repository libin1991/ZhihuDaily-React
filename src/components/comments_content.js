import React from 'react';
import {Collapse} from 'antd';
import Comment from './comment';

import '../css/comments_content.styl';

const Panel = Collapse.Panel;

const CommentsContent = (props) =>{
    const {s_comments, l_comments} = props;
    if (!l_comments.length && !s_comments.length) return (<div>暂无评论</div>);
    return (
        <div className="comments">
            <Collapse defaultActiveKey={['1']} className="Collapse">
                <Panel header={`${l_comments.length}条长评`} key="1">
                    {l_comments.length ? l_comments.map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment}/>
                        )
                    }) : <p>0条长评</p>}
                </Panel>
                <Panel header={`${s_comments.length}条短评`} key="2">
                    {s_comments.length ? s_comments.map((comment) => {
                        return (
                            <Comment key={comment.id} comment={comment}/>
                        )
                    }) : <p>0条短评</p>}
                </Panel>
            </Collapse>
        </div>
    )
};

export default CommentsContent;