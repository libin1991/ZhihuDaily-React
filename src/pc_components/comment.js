import React from 'react';
import {Icon} from 'antd';
import Avatar from '../mb_components/avatar';
import {formatTimeStamp} from "../js/util";

const Comment = (props) => {
    const {comment} = props;
    return (
        <div key={comment.id} className="comment-box">
            <div className="comment-user">
                <Avatar url={comment.avatar}/>
                <p className="username">{comment.author}</p>
                <span className="like"><Icon type="like-o"/>{comment.likes}</span>
            </div>
            {comment.reply_to && <div className="comment-reply">
                -回复：{comment.reply_to.author ? comment.reply_to.author : 'null'}<br/>{comment.reply_to.content ? comment.reply_to.content : '该评论已删除'}
            </div>}
            <p className="comment-content">{comment.content}</p>
            <p className="comment-time">{formatTimeStamp(comment.time)}</p>
        </div>
    )
};

export default Comment;