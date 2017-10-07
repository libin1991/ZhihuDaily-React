import React from 'react';
import {Icon} from 'antd';
import Avatar from './avatar';
import {NavLink} from 'react-router-dom';
import '../css/drawer.styl'

const Drawer = (props) => {
    let {isShow, themes, toggleDrawer} = props;
    // console.log(isShow);
    return (
        <div className={isShow ? "drawer show" : "drawer"}>
            <div className="drawer-header">
                <div className="user">
                    <Avatar url="https://images.weserv.nl/?url=pic1.zhimg.com/bc7608c26_m.jpg"/>
                    <span className="nickName">我爱吃莴苣</span>
                </div>
                <div className="setting">
                    <p><Icon type="star"/><span>我的收藏</span></p>
                    <p><Icon type="download"/><span>离线下载</span></p>
                </div>
            </div>
            <div className="drawer-body">
                <p onClick={toggleDrawer}><NavLink to={`/`}  activeClassName="selected"><Icon type="home"/>首页</NavLink></p>
                {
                    themes.map((theme, i) => {
                        return (
                            <p onClick={toggleDrawer} key={theme.id}>
                                <NavLink to={`/topics/${theme.id}`}  activeClassName="selected">
                                    {theme.name}
                                    <Icon type="plus"/>
                                </NavLink>
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Drawer;

