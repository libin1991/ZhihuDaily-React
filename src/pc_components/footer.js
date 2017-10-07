import React from 'react';
import {Row, Col} from 'antd';

const Footer = () => {

    return (
        <footer>
            <Row>
                <Col span={2}></Col>
                <Col span={20}>
                    &copy;&nbsp;2017-10 ReactNews All Rights Reserved.
                </Col>
                <Col span={2}></Col>
            </Row>
        </footer>
    )
}


export default Footer