import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Latest from '../mb_components/latest';
import Topic from '../mb_components/topic';
import NewsDetail from '../mb_components/news_detail';
import Comments from '../mb_components/comments';


class MBIndex extends Component {
    render() {
        return (
            <div id="mobile">
                <Switch>
                    <Route exact path="/" component={Latest}/>
                    <Route exact path="/topics/:id" component={Topic}/>
                    <Route exact path="/news/:id" component={NewsDetail}/>
                    <Route exact path="/comments/:id" component={Comments}/>
                </Switch>
            </div>
        )
    }
}

export default MBIndex;