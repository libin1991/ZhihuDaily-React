import React from 'react';
import {Card, Row, Col,BackTop} from 'antd';
import {
    Link
} from 'react-router-dom';

const NewsBlock = (props) => {
    let {stories, date, type} = props;

    const newsList = stories.map((story, i) => {
            return (
                <Col key={i} span={6}>
                    <Link to={`/news/${story.id}`}>
                        <Card style={story.image ? {width: 240} : {width: 200}} bodyStyle={{padding: 0}}>
                            {!type && <div className="custom-image">
                                <img alt="example" width="100%" src={story.image ? story.image : story.images[0]}/>
                            </div>}
                            <div className="custom-card">
                                <h3>{story.title}</h3>
                                {date && <p>{date}</p>}
                            </div>
                        </Card>
                    </Link>
                </Col>
            )
        }
    );
    return (
        <div className="storiesList">
            <Row type="flex" gutter={24}>
                {newsList}
            </Row>
            <BackTop />
        </div>
    )
};

export default NewsBlock;