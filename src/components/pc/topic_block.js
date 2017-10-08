import React, {Component} from 'react';
import {Row, Col, Avatar} from 'antd';
import {replaceUrl} from '../../js/util'; // 知乎图片防盗链解决方法
import PCNewsBlock from './news_block'; // 展示组件|函数定义组建|无状态组件

class TopicBlock extends Component {
    constructor() {
        super();
        this.state = {
            theme: null,
        }
    }

    componentDidMount() {
        let {id} = this.props;
        fetch(`http://112.74.202.2:9999/api/4/theme/${id}`)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(replaceUrl(JSON.stringify(data)));
                this.setState((preState) => ({
                    theme: data,
                }))
            });
    }

    render() {
        let {theme} = this.state;
        if (theme) {
            const style = {
                editor: {
                    display: 'inline-block',
                    marginLeft: '16px',
                    marginTop: '24px'
                },
                topContainer: {
                    marginBottom: '24px'
                },
                bg: {
                    width: '100%',
                    height: '224px',
                    backgroundImage: `url(${theme.image})`,
                }
            };
            let editors = theme.editors.map((editor, index) =>
                <div style={style.editor} key={editor.id}>
                    <a target="_blank" href={editor.url}>
                        <Avatar src={editor.avatar}/>
                        <div className="nickName">{editor.name}</div>
                    </a>
                </div>
            );
            return (
                <div className="stories">
                    <div style={style.topContainer}>
                        <Row gutter={24}>
                            <Col span={16}>
                                <div style={style.bg}/>
                            </Col>
                            <Col span={8}>
                                <div className="info">
                                    <h2>{theme.name}</h2>
                                    <p>{theme.description}</p>
                                    <div className="editors">
                                        {editors}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="bottomContainer">
                        <PCNewsBlock type={1} stories={theme.stories}/>
                    </div>
                </div>
            )
        } else {
            return (
                <h1>wating...</h1>
            )
        }
    }
}

export default TopicBlock;