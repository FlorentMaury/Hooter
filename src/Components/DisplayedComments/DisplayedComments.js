import React from 'react';
import DisplayedComment from './DisplayedComment/DisplayedComment';

export default function DisplayedComments(props) {

    let comments = props.comments.map(comment => (
        <DisplayedComment
            key    = {comment.id} 
            comment= {comment} 
            state  = {props.state}
        />
    ));

    return (

        <section>
            {comments}
        </section>

    );
};