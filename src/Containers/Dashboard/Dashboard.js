// Librairies
import React, { useEffect, useState } from 'react';
import { Link }                       from 'react-router-dom';
import routes                         from '../../config/routes';
import axios                          from '../../config/axios-firebase';

// Composants
import ManageHoots    from '../Admin/ManageHoots/ManageHoots';
import DisplayedHoots from '../../Components/DisplayedHoots/DisplayedHoots';

export default function Dashboard(props) {

    // State
    const [hoots, setHoots]   = useState([]);
    const [hootin, setHootin] = useState(false);

    // ComponentDidMount ?
    useEffect(() => {
        axios.get('/hoots.json')
            .then(response => {
                let hootsArray = [];
                for (let key in response.data) {
                    hootsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                // Chronologie
                hootsArray.reverse();

                setHoots(hootsArray);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    useEffect(() => {
        document.title = 'Article';
    });

    // Fonctions 
    const hootinClickedhandler = () => {
        if (hootin) {
            setHootin(false)
        } else {
            setHootin(true)
        }
    };

    return (
        <>
            <h1>Dashboard</h1>
                <button onClick={hootinClickedhandler}>
                    { !hootin ? 'Hoot' : 'Fermer' }
                </button>
            {hootin && <ManageHoots /> }
            <h2>Hoots</h2>
            <DisplayedHoots 
                hoots={hoots} 
                user={props.user}
            />
        </>
    );
};