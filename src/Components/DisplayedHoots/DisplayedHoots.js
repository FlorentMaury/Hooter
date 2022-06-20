// Librairies
import React            from 'react';
import DisplayedHoot    from './DisplayedHoot/DisplayedHoot';

export default function DisplayedHoots(props) {

    let hoots = props.hoots.map(hoot => (
        <DisplayedHoot 
            key={hoot.id} 
            hoot={hoot} 
        />
    ));

    return (
        <article className='container'>
            {hoots}
        </article>
    );
};