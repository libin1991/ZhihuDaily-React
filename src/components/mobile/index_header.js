import React, {Component} from 'react';
import {Icon,message} from 'antd';
import Drawer from './drawer';
import './index_header.styl'

class IndexHeader extends Component {
    constructor() {
        super();
        this.state = {
            showDrawer: false,
            themes: [],
        }
    };

    componentDidMount() { // 获取themes导航内容
        if (sessionStorage.getItem('themes')) {
            const data = JSON.parse(sessionStorage.getItem(('themes')));
            this.setState((preState) => ({
                themes: preState.themes.concat(data.others)
            }));
            return;
        }
        fetch('http://112.74.202.2:9999/api/4/themes')
            .then((response) => response.json())
            .then((data) => {
                sessionStorage.setItem('themes', JSON.stringify(data)); // themes导航基本不会变，拉取一次后存入sessionStorage,无需每次渲染时都拉取一次
                this.setState((preState) => ({
                    themes: preState.themes.concat(data.others)
                }));
            });
    }

    toggleDrawer = () => {
        this.setState({ // 异步操作
            showDrawer: !this.state.showDrawer,
        });
        const html = document.getElementsByTagName('html')[0];
        html.className = !this.state.showDrawer ? 'noscroll' : '';// 此处的showDrawer还未改变
    };

    render() {
        const {title, isIndex} = this.props;
        const {showDrawer, themes} = this.state;
        return (
            <header className="index-header">
                <Icon className="menu" onClick={this.toggleDrawer} type="bars"/>
                <span className="title">{title}</span>
                {isIndex && <div className="more" onClick={()=>{message.info('开发中')}}><Icon type="bell"/><Icon type="ellipsis"/></div>}
                <Drawer isShow={showDrawer} themes={themes} toggleDrawer={this.toggleDrawer}/>
                {showDrawer && <div className={"mask"} onClick={this.toggleDrawer}/>}
            </header>
        )
    }
}

export default IndexHeader;

