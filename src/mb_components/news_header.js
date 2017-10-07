import React from 'react';
import {Icon} from 'antd';
import createBrowserHistory from 'history/createBrowserHistory';
import {Link} from 'react-router-dom';
import '../css/news_header.styl';

const history = createBrowserHistory();

const NewsHeader = (props) => {
    const {popularity, comments, id} = props;
    // console.log(props);
    return (
        <header className="news-header">
            <Icon type="arrow-left" onClick={() => {
                history.goBack()
            }}/>
            <span><Icon type="like-o"/>{popularity}</span>
            <span>
                <Link to={`/comments/${id}`} className="comments">
                    <Icon type="inbox"/>{comments}
                </Link>
            </span>
            <Icon type="star-o"/>
            <Icon type="share-alt"/>
        </header>
    )
};

export default NewsHeader;

