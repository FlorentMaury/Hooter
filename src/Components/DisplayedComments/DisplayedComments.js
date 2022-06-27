// Librairies.
import React from 'react';

// Composants.
import DisplayedComment from './DisplayedComment/DisplayedComment';

// Displayed Comments.
export default function DisplayedComments(props) {

    let comments = props.comments.map(comment => (
        <DisplayedComment
            key    = {comment.id} 
            comment= {comment} 
            state  = {props.state}
        />
    ));

    // Render.
    return (

        <section>
            {comments}
        </section>

    );
};