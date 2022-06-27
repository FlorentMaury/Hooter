// Librairies.
import React, { useEffect, useState } from 'react';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';
import styled                         from 'styled-components';
import axios                          from '../../../config/axios-firebase';
import { useNavigate }                from 'react-router-dom';
import routes                         from '../../../config/routes';


// Componsants.
import Button  from '../../../Components/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';

// Styled Components.
const StyledH2 = styled.h2`
    padding  : 30px;
    font-size: 2rem;
`; 

const StyledDiv = styled.div`
    background     : #FCF8E8;
    height         : 100%;
    background     : #EFEFEF;
    display        : flex;
    justify-content: center;
`;

const StyledP = styled.p`
    font-size: 1.5rem;
    padding  : 30px;
`;

const StyledInput = styled.input`
    padding      : 8px;
    border-radius: 5px;
    background   : white;
    border       : 1px solid #205375;
    margin-bottom: 15px;
`;

const StyledManageProfileCard = styled.div`
    background   : white;
    border-radius: 10px;
    width        : 65vw;

    @media (max-width: 815px) {
           width: 80vw;
        }

    @media (max-width: 400px) {
           width: 90vw;
        }
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 100px;
    height        : 100px;
    border-radius : 50%;
`;

// Manage Profile.
export default function ManageProfile(props) {

    // Variables.
    let currentUser               = fire.auth().currentUser.displayName;
    let navigate                  = useNavigate();
    const [photoURL, setPhotoURL] = useState('https://urlz.fr/iDgB');
    const [userName, setUserName] = useState(currentUser);
    const [loading, setLoading]   = useState(false);


    // Use Effect pour récupérer l'image de profil de l'utilisateur.
    useEffect(() => {
        axios.get('/auteurImg/' + fire.auth().currentUser.uid + '.json')
        .then(() => {
        })
        .catch(error => {
            console.log(error);
        })
    }, []);


    // Formulaire pour modifier son profil.
    const formHandler = event => {
        event.preventDefault();
        setLoading(true);
        let userNewName = document.getElementById('userNewName').value;
        let userNewImg  = document.getElementById('userNewImg').value;

        if (userNewName !== '') {

            const newInfos = {
                name: userName,
                img : userNewImg
            };

        axios.delete('/auteurImg/' + fire.auth().currentUser.uid + '.json')
        .then(response => {
            console.log(response);
            axios.post('/auteurImg/' + fire.auth().currentUser.uid + '.json', newInfos)
                .then(() => {
                    setLoading(false);
                }) 
                .catch(error => {
                    console.log(error);        
                    setLoading(false);

                });
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        })

        props.user.updateProfile({
            displayName: userNewName,
            photoURL: userNewImg
          }).then(() => {
            setUserName(userNewName);
            setPhotoURL(userNewImg);
            toast.success('Pseudo/image modifié avec succès !')
            navigate(routes.DASHBOARD);
          }).catch((error) => {
            console.log(error)
          });
          setLoading(false);
        }
    }

    // Render.
    return (
        <>
            {loading ? 
                <Spinner /> 
            :
                <StyledDiv>
                    <StyledManageProfileCard>
                        <StyledH2>Modifier votre profil</StyledH2>
                        <form onSubmit={formHandler} method='post'>
                            <StyledInput 
                                type       = "text" 
                                placeholder= {props.user.displayName}
                                name       = "userNewName"
                                id         = "userNewName"
                                maxLength  = '18'
                                minLength  = '3'
                                autoFocus
                            /><br />
                            <StyledInput type='text' placeholder='Lien vers votre image' id='userNewImg' /><br />
                            <Button type='submit' value='Confirmer'>Confirmer</Button>
                        </form>

                        <StyledP>Votre pseudo actuel est : <b>{userName}</b></StyledP>
                        <StyledImg 
                            src={fire.auth().currentUser.photoURL} 
                            alt='Image du profil'
                        />
                    </StyledManageProfileCard>
                </StyledDiv>
            }
        </>
    );
};