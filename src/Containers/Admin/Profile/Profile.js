// Librairies
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams }     from 'react-router-dom';
import axios                          from '../../../config/axios-firebase';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';
import routes                         from '../../../config/routes';

// Composants
import DisplayedHoots from '../../../Components/DisplayedHoots/DisplayedHoots';


export default function Profile(props) {

    const navigate          = useNavigate();
    const { id }            = useParams();
    const [hoots, setHoots] = useState([]);

    // ComponentDidMount pour les hoots.
    useEffect(() => {
        axios.get('/hoots.json?orderBy="auteur"&equalTo="' + id + '"')
            .then(response => {

                let profileArray = [];

                if(Object.keys(response.data).length === 0) {
                    toast.error('Ce profil n\'existe pas !', {position: 'bottom-right'});
                    navigate(routes.HOME);
                }

                for(let key in response.data) {
                    profileArray.push({
                        ...response.data[key],
                        id: key
                    })
                }
                profileArray.reverse()
                setHoots(profileArray);
            })
            .catch(error => {
                console.log(error)
            });
    }, [id, navigate]);


    // ComponentDidMount pour le follow.
    useEffect(() => {
        axios.get('/follow/following.json')
            .then(response => {
             
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    const subscribe = event => {
        event.preventDefault();
        // const following = {
        //     suivi: id,
        //     suiveur: fire.auth().currentUser.displayName,
        //     action: true
        // };
    
        // axios.post('/follow/following/' + fire.auth().currentUser.uid + '.json', following)
        //     .then(() => {
        //         toast('Vous suivez ' + id + ' !', {position: 'bottom-right'});
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     }); 

        axios.get('/follow/following.json')
            .then(response => {
                let followingArray = [];
                for (let key in response.data) {
                    followingArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                console.log(followingArray);
            })
            .catch(error => {
                console.log(error)
            })
    };


    return (
        <>
            <h1>Profil de {id}</h1>
            <button onClick={subscribe}>S'abonner</button>
            <DisplayedHoots 
                hoots={hoots} 
                user={props.user}
            />
        </>
    );
};