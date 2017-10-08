import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Carousel} from 'antd';
import IndexHeader from './/index_header';
import {replaceUrl, formatDate} from "../../js/util";
import '../../css/latest.styl'
import List from './list';

class Latest extends Component {
    constructor() {
        super();
        this.state = {
            topStories: [],
            storiesQue: [], // 故事列表数组 一个stories用于渲染一个List
            date4FetchQue: [], // 用于fetch的date 格式为'20171007'
            formattedDateQue: [], // 用于显示格式化时间的date 格式为 '10月7日 星期四'
            scrollTitles: [{point: 220, title: '今日要闻'}], // 动态改变header title的数组 存放对象 {point:scrollHeigh,title:formattedDate} 当scrollTop===scrollHeight(fetch时的屏幕总高度)时改变标题
            headerTitle: '首页',
        }
    }

    componentDidMount() {
        const LATEST_URL = 'http://112.74.202.2:9999/api/4/news/latest';
        if (sessionStorage.getItem('mb_latest')) { // 如果本地保存了数据状态 直接从本地获取
            Latest.scrollPoint = JSON.parse(sessionStorage.getItem('scrollPoint'));
            // this.setState({
            //     topStories:JSON.parse(sessionStorage.getItem('topStories')),
            //     storiesQue:JSON.parse(sessionStorage.getItem('storiesQue')),
            //     date4FetchQue:JSON.parse(sessionStorage.getItem('date4FetchQue')),
            //     formattedDateQue:JSON.parse(sessionStorage.getItem('formattedDateQue')),
            //     scrollTitles:JSON.parse(sessionStorage.getItem('scrollTitles'))
            // }, () => {
            //     this.contentNode.scrollTop = Latest.scrollPoint;
            // }); // 回调 保证数据读取成功再滚动容器 简化如下
            this.setState((preState) => {
                const obj = {};
                for (let k in preState) {
                    obj[k] = JSON.parse(sessionStorage.getItem(k));
                }
                return obj;
            }, () => {
                this.contentNode.scrollTop = Latest.scrollPoint;
            });// 回调 保证数据读取成功再滚动容器
        } else { // 如果本地没有保存状态直接从服务器拉取
            this.fetchNews(LATEST_URL, 'latest');
        }
        if (this.contentNode) { // 给容器元素绑定滚动监听事件
            this.contentNode.addEventListener('scroll', this.onScrollHandle);
        }

    }

    // 组件销毁后
    // 1. 解除绑定的事件
    // 2. 保存当前的数据状态 避免每次返回重新拉取数据且造成除latest外的数据(before)丢失
    // 3. 记录当前的鼠标位置
    componentWillUnmount() {
        if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle);
        }
        sessionStorage.setItem('mb_latest', '1');
        for (let k in this.state) { // 存储数据，保存状态
            sessionStorage.setItem(k, JSON.stringify(this.state[k]));
        }
        if (Latest.scrollPoint) { // 存储鼠标当前滚动条的位置
            sessionStorage.setItem('scrollPoint', Latest.scrollPoint.toString());
        }
    }


    onScrollHandle = (event) => { // 监听滚动事件
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const isBottom = (clientHeight + scrollTop === scrollHeight);
        Latest.scrollPoint = scrollTop;// 全局的
        if (isBottom) {// 到达底部 fetch 前一天数据 并记录scrollHeight（滚动点）
            const date4Fetch = this.state.date4FetchQue[this.state.date4FetchQue.length - 1];
            this.fetchNews('http://112.74.202.2:9999/api/4/news/before/' + date4Fetch, 'before', scrollHeight);
        }
        // 根据滚动点判断标题显示内容
        this.changeTitle(scrollTop);
    };

    changeTitle = (scrollTop) => {
        const {scrollTitles} = this.state;
        for (let i = 0; i < scrollTitles.length; i++) {
            let obj = scrollTitles[i];
            if (scrollTop - obj.point < 15 && scrollTop - obj.point > 0) {
                this.setState({
                    headerTitle: obj.title,
                })
            } else if (obj.point - scrollTop < 100 && obj.point - scrollTop > 0 && i > 0) {
                this.setState({
                    headerTitle: scrollTitles[i - 1].title,
                })
            } else if (scrollTop < 220) {
                this.setState({
                    headerTitle: '首页',
                })
            }
        }
    };

    fetchNews = (url, type, point) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data))); // 将data里面的图片链接全部处理一次
                this.setState((preState) => {
                    const {storiesQue, date4FetchQue, formattedDateQue} = preState;
                    const _storiesQue = storiesQue.slice();
                    _storiesQue.push(data.stories);
                    const _date4FetchQue = date4FetchQue.slice();
                    _date4FetchQue.push(data.date);
                    const _formattedDateQue = formattedDateQue.slice();
                    _formattedDateQue.push(formatDate(data.date));
                    if (type === 'latest') { // 如果是获取latest
                        return {
                            topStories: data.top_stories,
                            storiesQue: _storiesQue,// 不能直接用push 会把返回值length当成state的
                            date4FetchQue: _date4FetchQue,
                            formattedDateQue: _formattedDateQue,
                        };
                    } else { // 如果是获取beforeNews
                        const _scrollTitles = this.state.scrollTitles.slice();
                        _scrollTitles.push({point: point, title: formatDate(data.date)}); // 记录滚动点以及title
                        return {
                            storiesQue: _storiesQue,
                            date4FetchQue: _date4FetchQue,
                            formattedDateQue: _formattedDateQue,
                            scrollTitles: _scrollTitles,
                        };
                    }
                });
            });
    };

    renderList = () => {
        const {storiesQue, formattedDateQue} = this.state;
        return storiesQue.map((stories, i) => { // 遍历数组，渲染每一天的List
            return <List key={i} stories={stories} date={formattedDateQue[i]}/>
        })
    };

    render() {
        const {topStories} = this.state;
        const setting = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div className="latest" ref={node => this.contentNode = node}>
                <IndexHeader title={this.state.headerTitle} isIndex={true}/>
                <div className="carousel">
                    <Carousel {...setting}>
                        {
                            topStories.map((topStory) => {
                                const bgc = topStory.image;
                                return (
                                    <div key={topStory.id}>
                                        <Link to={`/news/${topStory.id}`}>
                                            <div className='car-img' style={{backgroundImage: `url(${bgc})`, backgroundSize: '100% 100%'}}>
                                                <h1 className="car-img-title">{topStory.title}</h1>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                {this.state.storiesQue.length ? this.renderList() : 'waiting'}
            </div>
        )
    }
}

export default Latest;