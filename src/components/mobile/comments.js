import React from 'react';
import PCComments from '../comments';

const Comments = (props) => {
    const id = props.match.params.id;
    return (
        <PCComments id={id} mbMode={true}/>
    )
};

export default Comments;