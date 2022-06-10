// Librairies
import React            from 'react';
import DisplayedHolw    from './DisplayedHowl/DisplayedHowl';

export default function DisplayedHolws(props) {

    let holws = props.holws.map(holw => (
        <DisplayedHolw 
            key={holw.id} 
            holw={holw} 
        />
    ));

    return (
        <section className='container'>
            {holws}
        </section>
    );
};