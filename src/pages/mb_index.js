import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LatestNews from '../components/mobile/latest_news';
import Topic from '../components/mobile/topic';
import NewsDetail from '../components/mobile/news_detail';
import Comments from '../components/mobile/comments';


class MBIndex extends Component {
    render() {
        return (
            <div id="mobile">
                <Switch>
                    <Route exact path="/" component={LatestNews}/>
                    <Route exact path="/topics/:id" component={Topic}/>
                    <Route exact path="/news/:id" component={NewsDetail}/>
                    <Route exact path="/comments/:id" component={Comments}/>
                </Switch>
            </div>
        )
    }
}

export default MBIndex;