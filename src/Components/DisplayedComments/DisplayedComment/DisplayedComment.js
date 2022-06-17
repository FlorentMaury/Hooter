import React from 'react';

export default function DisplayedComment(props) {
    return (
            <>
                <div>
                    <p>{props.comment.contenu}</p>
                    <small>{props.comment.auteur}</small>
                    <i>{props.comment.date}</i>
                </div>
            </>
        );
};