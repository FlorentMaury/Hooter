// Librairies.
import React         from 'react';

// Composants.
import DisplayedHoot from './DisplayedFollowersHoot/DisplayedFollowersHoot';


// Displayed Hoots.
export default function DisplayedHoots(props) {

    let hoots = props.hoots.map(hoot => (
        <DisplayedHoot 
            key  = {hoot.id} 
            hoot = {hoot} 
        />
    ));

    // Render.
    return (
        <article className='container'>
            {hoots}
        </article>
    );
};