import React,{Component} from 'react';
import '../css/avatar.styl';

class Avatar extends Component {
    render(){
        const url = this.props.url;
        return(
            <div id="avatar" style={{backgroundImage: `url(${url})`, backgroundSize: '100% 100%'}}/>
        )
    }
}

export default Avatar;