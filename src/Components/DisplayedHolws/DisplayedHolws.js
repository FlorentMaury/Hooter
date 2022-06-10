// Librairies
import React            from 'react';
import DisplayedHolw    from './DisplayedHolw/DisplayedHolw';

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