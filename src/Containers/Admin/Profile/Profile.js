// Librairies
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation }     from 'react-router-dom';
import axios                          from '../../../config/axios-firebase';
import { toast }                      from 'react-toastify';
import routes                         from '../../../config/routes';
import styled                         from 'styled-components';
import fire                           from '../../../config/firebase';

// Composants
import DisplayedHoots from '../../../Components/DisplayedHoots/DisplayedHoots';
import Button from '../../../Components/Button/Button';

// Styled Components
const StyledH2 = styled.h2`
    padding: 10px;
    font-size: 2rem;
`; 

const StyledDiv = styled.div`
    background: #FCF8E8;
    height: 100%;
    background: #EFEFEF;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export default function Profile(props) {

    const navigate                = useNavigate();
    const location                = useLocation();
    const { id }                  = useParams();
    const [hoots, setHoots]       = useState([]);
    const [followed, setFollowed] = useState(false);

    
    // ComponentDidMount pour les hoots.
    useEffect(() => {
        axios.get('/hoots.json?orderBy="auteur"&equalTo="' + id + '"')
            .then(response => {
                let profileArray = [];
                if(Object.keys(response.data).length === 0) {
                    toast.error('Ce profil n\'existe pas !', {position: 'bottom-right'});
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
        axios.get('/follow/' + fire.auth().currentUser.uid + '/'+ location.state + '.json')
        // axios.get('/follow/' + fire.auth().currentUser.uid + '.json')
            .then(response => {
                if (response.data !== null) {
                    let followingArray = [];
                    for (let key in response.data) {
                        followingArray.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    if(followingArray[0].action === true) {
                        setFollowed(true);
                    };
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [followed, location.state]);


    const subscribe = event => {
        event.preventDefault();
        setFollowed(!followed);
        const following = {
            suivi  : id,
            suiveur: fire.auth().currentUser.uid,
            action : true
        };

        axios.post('/follow/' + fire.auth().currentUser.uid + '/'+ location.state + '.json', following)
        // axios.post('/follow/' + fire.auth().currentUser.uid + '.json', following)
            .then(() => {
                toast('Vous suivez ' + id + ' !', {position: 'bottom-right'});
            })
            .catch(error => {
                console.log(error);
            }); 
    };


    const unsubscribe = event => {
        event.preventDefault();
        setFollowed(!followed);
        axios.delete('/follow/' + fire.auth().currentUser.uid + '/'+ location.state + '.json')
        // axios.delete('/follow/' + fire.auth().currentUser.uid + '.json')
            .then(() => {
                toast('Vous ne suivez plus ' + id + ' !', {position: 'bottom-right'});
            })
            .catch(error => {
                console.log(error);
            }); 
    };


    return (
        <StyledDiv>
            <StyledH2>Profil de {id}</StyledH2>
            { !followed ?
                <Button onClick={subscribe}>S'abonner</Button>
            :
                <Button onClick={unsubscribe}>Se désabonner</Button>
            }
            <DisplayedHoots 
                hoots={hoots} 
                user={props.user}
            />
        </StyledDiv>
    );
};