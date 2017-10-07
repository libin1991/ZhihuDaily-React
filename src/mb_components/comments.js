import React from 'react';
import PCComments from '../pc_components/comments';

const Comments = (props) => {
    const id = props.match.params.id;
    return (
        <PCComments id={id} mbMode={true}/>
    )
};

export default Comments;