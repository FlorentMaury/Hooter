// Librairies
import React, { useEffect, useState } from 'react';
import { Link }                       from 'react-router-dom';
import routes                         from '../../config/routes';
import axios                          from '../../config/axios-firebase';

// Composants
import ManageHolws    from '../Admin/ManageHolws/ManageHolws';
import DisplayedHolws from '../../Components/DisplayedHolws/DisplayedHolws';

export default function Dashboard() {

    // State
    const [holws, setHolws] = useState([]);

    // ComponentDidMount ?
    useEffect(() => {
        axios.get('/holws.json')
            .then(response => {
                let holwsArray = [];
                for (let key in response.data) {
                    holwsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                // Chronologie
                holwsArray.reverse();

                // Trier
                holwsArray = holwsArray.filter(holw => holw.brouillon === 'false');

                setHolws(holwsArray);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        document.title = 'Article';
    });


    return (
        <>
            <h1>Dashboard</h1>
            <Link to={routes.MANAGEHOWLS}>
                <button>Howlin</button>
            </Link>
            <ManageHolws />
            <h2>Holws</h2>
            <DisplayedHolws holws={holws} />
        </>
    );
};