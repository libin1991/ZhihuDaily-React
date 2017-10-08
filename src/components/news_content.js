import React from 'react';
import Avatar from './avatar';

import '../css/news_content.styl'

const NewsContent = (props) => {
    const {body, css, theme, recommenders, image, title} = props.data;
    const {mbMode = false} = props;
    return (
        <div className="news-content">
            {
                theme ? <Recommenders recs={recommenders}/>
                    : mbMode ?
                    <Image image={image} title={title}/>
                    : ''
            }
            <div dangerouslySetInnerHTML={{__html: body}}/>
            <link rel="stylesheet" href={css[0]}/>
        </div>
    )
};

const Image = (props) => {// 如果是移动端就渲染题图 PC端则不渲染
    const {image, title} = props;
    return (
        <div style={{backgroundImage: `url(${image})`, backgroundSize: '100% 100%'}} className="detail-pic">
            <h1 className="detail-title">{title}</h1>
        </div>
    )
};

const Recommenders = (props) => { // 如果是theme下的文章，则隐藏img，渲染推荐者
    const {recs} = props;
    if (recs.length === 0) return;
    return (
        <div className="recs">
            <span className="title">推荐者</span>
            {
                recs.map((rec, index) => <Avatar className="rec" key={rec.avatar} url={rec.avatar}/>)
            }
        </div>
    )
};


export default NewsContent;