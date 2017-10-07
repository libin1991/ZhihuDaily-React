import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon, Tabs, Modal} from 'antd';
import {Link} from 'react-router-dom';

const TabPane = Tabs.TabPane;

class Header extends Component {
    constructor() {
        super();
        this.state = {
            current: 'latest',
            modalVisible: false,
        };
        if (sessionStorage.getItem('menuKey')) {
            let key = sessionStorage.getItem(('menuKey'));
            this.setState({
                current: key,
            })
        }
    };

    setModalVisible = (value) => {
        this.setState({
            modalVisible: value
        })
    };

    handleClick = (e) => {
        this.setState({
            current: e.key
        });
        sessionStorage.setItem('menuKey', e.key);
        if (e.key === "about") {
            this.setModalVisible(true);
        }
    };

    render() {
        return (
            <header>
                <Row>
                    <Col span={2}/>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={require('../images/icon_zhihu.png')} alt="logo"/>
                            <span>ZhihuDaily</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                            <Menu.Item key="latest">
                                <Link to="/"><Icon type="appstore"/>最新消息</Link>
                            </Menu.Item>
                            <Menu.Item key="themes">
                                <Link to="/topics"><Icon type="book"/>主题日报</Link>
                            </Menu.Item>
                            <Menu.Item key="about" className="about">
                                <Icon type="user"/>关于
                            </Menu.Item>
                        </Menu>
                        <Modal title="关于" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                               onOk={() => this.setModalVisible(false)}
                               onCancel={() => this.setModalVisible(false)}
                               okText="关闭">
                            <Tabs type="card">
                                <TabPane tab="项目" key="1">
                                    <p><Icon type="smile-o" />   框架：react</p>
                                    <p><Icon type="smile-o" />   路由：react-router 4.0</p>
                                    <p><Icon type="smile-o" />   HTTP请求：whatwg-fetch</p>
                                    <p><Icon type="smile-o" />   设备判断：react-responsive</p>
                                    <p><Icon type="smile-o" />   UI：antd</p>
                                    <p><Icon type="smile-o" />   样式：stylus</p>
                                    <p><Icon type="smile-o" />   移动端布局：flexible.js</p>
                                    <p><Icon type="smile-o" />   去Github了解更多<a href="">[点我]</a></p>
                                </TabPane>
                                <TabPane tab="作者" key="2">
                                    <p>本科大四狗</p>
                                    <p>待业中</p>
                                    <p>求救赎</p>
                                    <p>有好的建议请指出</p>
                                    <p>去我的博客<a href="">[点我]</a></p>
                                    <p>去我的简书<a href="">[点我]</a></p>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}/>
                </Row>
            </header>
        );
    };
}

export default Header;