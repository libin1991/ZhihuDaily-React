import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive'; // 移动端适配
import {
	BrowserRouter as Router
} from 'react-router-dom';
import 'antd/dist/antd.css';
import 'lib-flexible';
import PCIndex from './pages/pc_index';
import MBIndex from './pages/mb_index';

ReactDOM.render(
	<Router>
        <div>
            <MediaQuery query='(min-device-width:1224px)'>
                <PCIndex/>
            </MediaQuery>
            <MediaQuery query='(max-device-width:1224px)'>
                <MBIndex/>
            </MediaQuery>
        </div>
    </Router>,
	document.getElementById('root')
);