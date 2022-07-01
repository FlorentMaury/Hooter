// Librairies.
import React, { useEffect, useState } from 'react';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';
import styled                         from 'styled-components';
import axios                          from '../../../config/axios-firebase';
import { Link, useNavigate }          from 'react-router-dom';
import routes                         from '../../../config/routes';


// Componsants.
import Button  from '../../../Components/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Modal   from '../../../Components/UI/Modal/Modal';

// Styled Components.
const StyledH2 = styled.h2`
    font-size: 2rem;
    padding  : 30px 0;

    @media (max-width: 660px) {
           font-size: 2rem;
           padding  : 10px;
        }
`; 

const StyledDiv = styled.div`
    background     : #EFEFEF;
    height         : 100%;
    display        : flex;
    justify-content: center;
`;

const StyledP = styled.p`
    font-size: 1.5rem;
    padding  : 10px;
`;

const StyledInput = styled.input`
    border-radius: 5px;
    background   : white;
    border       : 3px solid #EFEFEF;
    margin       : 10px;
    padding      : 10px;
    width        : 100%;
    display      : block;
    align-self: center;

        @media (max-width: 450px) {
            width: 80%;
        }

        @media (max-width: 3500px) {
            width: 65%;
        }
`; 

const StyledManageProfileCard = styled.div`
    background     : white;
    width          : 60vw;
    display        : flex;
    flex-direction : column;
    align-items    : center;
    justify-content: center;
    border-radius  : 10px;
    background     : white;
    box-shadow     : 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    margin         : 20px;

        @media (max-width: 815px) {
            width: 80vw;
            }

        @media (max-width: 400px) {
            width: 90vw;
            }
`;

const StyledForm = styled.form`
    height        : 40vh;
    display       : flex;
    flex-direction: column;
    width         : 60%;
    align-items   : center;
`;

const StyledImg = styled.img`
    width         : 100px;
    height        : 100px;
    border-radius : 50%;
    margin        : 60px;
    display       : block;
    margin-bottom : 10px;
`;

// Manage Profile.
export default function ManageProfile(props) {

    // Nom de la page.
    useEffect(() => {
        document.title = 'Hooter | Gestion de profil';
    });

    // Variables.
    let currentUser               = fire.auth().currentUser.displayName;
    let navigate                  = useNavigate();

    // State.
    const [photoURL, setPhotoURL] = useState('https://urlz.fr/iDgB');
    const [userName, setUserName] = useState(currentUser);
    const [loading, setLoading]   = useState(false);
    const [modal, setModal]       = useState(false);


    // Use Effect pour récupérer l'image de profil de l'utilisateur.
    useEffect(() => {
        axios.get('/auteurImg/' + fire.auth().currentUser.uid + '.json')
        .then((response) => {
            setPhotoURL(response)
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    // Déclenchement modale. 
    const toggleModalHandler = () => {
        setModal(!modal);
    };

    // Fonction de suppression du compte.
    const deleteAccountHandler = () => {
        setLoading(true);
        fire.auth().currentUser.delete().then(() => {
            navigate(routes.home);
            toast.success('Compte supprimé, au revoir !');
            setLoading(false);
          }).catch((error) => {
            console.log(error)
            setLoading(false);
          });
          
    }

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
            toast.success('Pseudo/image modifié avec succès !', {position: 'bottom-right'})
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
                    <StyledImg 
                            src = {fire.auth().currentUser.photoURL} 
                            alt = 'Image du profil'
                        />
                                                <StyledP>{userName}</StyledP>

                        <StyledH2>Modifier votre profil</StyledH2>
                        <StyledForm onSubmit={formHandler} method='post'>
                            <label>Nouveau pseudo</label><br />
                            <StyledInput 
                                type       = "text" 
                                placeholder= {props.user.displayName}
                                name       = "userNewName"
                                id         = "userNewName"
                                maxLength  = '18'
                                minLength  = '3'
                                autoFocus                             
                            /><br />
                            <label>Image du profil</label><br />
                            <StyledInput type='text' placeholder='Lien vers votre image' id='userNewImg' /><br />
                            <Button
                                style = {{display: 'block', width: '60%', border: '2px solid #205375', color: '#205375', margin: '15px'}}
                                type='submit' 
                                value='Confirmer'>Confirmer
                            </Button>
                            <Button 
                            style = {{display: 'block', width: '60%', background: '#F66B0E', color:'white', margin: '15px'}}
                            onClick = {toggleModalHandler}
                        >
                            Supprimer mon compte
                        </Button>
                        </StyledForm>


                    </StyledManageProfileCard>

                    {modal &&
                            <Modal>    
                                {/* <ManageHoots modal={modal} setModal={setModal} /> */}
                                <StyledP>Voulez-vous vraiment supprimer votre compte ?</StyledP>
                                <Button 
                                    onClick={deleteAccountHandler} 
                                    style = {{border: '2px solid #205375', color: '#205375', margin: '10px'}} 
                                >
                                    Confirmer
                                </Button>
                                <Button onClick = {toggleModalHandler}>Annuler</Button>
                                <Button 
                                    onClick={toggleModalHandler}
                                    style={{color: '#205375', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', border: 'none'}}
                                >
                                    <span class="material-symbols-outlined">close</span>
                                </Button>
                            </Modal>
                        }

                </StyledDiv>
            }
        </>
    );
};