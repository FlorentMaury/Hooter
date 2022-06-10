// Librairies
import React, { useEffect, useState } from 'react';
import { Link }                       from 'react-router-dom';
import routes                         from '../../config/routes';
import axios                          from '../../config/axios-firebase';

// Composants
import ManageHowls    from '../Admin/ManageHowls/ManageHowls';
import DisplayedHowls from '../../Components/DisplayedHowls/DisplayedHowls';

export default function Dashboard() {

    // State
    const [howls, setHowls] = useState([]);

    // ComponentDidMount ?
    useEffect(() => {
        axios.get('/howls.json')
            .then(response => {
                console.log(response);
                let howlsArray = [];
                for (let key in response.data) {
                    howlsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                // Chronologie
                howlsArray.reverse();

                setHowls(howlsArray);
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
            <ManageHowls />
            <h2>Howls</h2>
            <DisplayedHowls howls={howls} />
        </>
    );
};