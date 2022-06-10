// Librairies
import React            from 'react';
import DisplayedHowl    from './DisplayedHowl/DisplayedHowl';

export default function DisplayedHowls(props) {

    let howls = props.howls.map(howl => (
        <DisplayedHowl 
            key={howl.id} 
            howl={howl} 
        />
    ));

    return (
        <section className='container'>
            {howls}
        </section>
    );
};