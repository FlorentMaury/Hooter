// Librairies.
import React from 'react';

// Composants.
import DisplayedFollower from './DisplayedFollower/DisplayedFollower';

export default function DisplayedFollowers(props) {

    let follow = props.follow.map(element => (
        <DisplayedFollower
            key     = {element.id} 
            element = {element} 
        />
    ));
    
    return (
        <section>
            {follow}
        </section>
    );
};