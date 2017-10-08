import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Row, Col} from 'antd';
import PCHeader from '../components/pc/header';
import PCFooter from '../components/pc/footer';
import Latest from '../components/pc/latest_news';
import Topics from '../components/pc/topics';
import NewsDetail from '../components/news_detail';

import '../css/pc.css'
class PCIndex extends Component {
    render() {
        return (
            <div id="pc">
                <PCHeader/>
                <Row>
                    <Col span={2}/>
                    <Col span={20} className="container">
                        <Route exact path="/" component={Latest}/>
                        <Route exact path="/topics" component={Topics}/>
                        <Route exact path="/news/:id" component={NewsDetail}/>
                    </Col>
                    <Col span={2}/>
                </Row>
                <PCFooter/>
            </div>
        )
    }
}

export default PCIndex;