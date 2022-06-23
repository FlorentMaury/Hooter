// Librairies
import React, { useEffect, useState }     from 'react';
import fire      from '../../../config/firebase';
import { toast } from 'react-toastify';
import styled    from 'styled-components';
import axios from '../../../config/axios-firebase';

// Componsants
import Button from '../../../Components/Button/Button';

// Styled Components
const StyledH2 = styled.h2`
    padding: 30px;
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
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 5% solid gray;
`;

export default function ManageProfile(props) {

    let currentUser = fire.auth().currentUser.email;

    const [photoURL, setPhotoURL] = useState('https://urlz.fr/iDgB');
    const [userName, setUserName] = useState(currentUser);

    // let userName = fire.auth().currentUser.displayName;
    // let userImg = fire.auth().currentUser.photoURL;

    useEffect(() => {
        axios.get('/userImg/' + fire.auth().currentUser.uid + '.json')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    }, []);


    const formHandler = event => {
        event.preventDefault();

        let userNewName = document.getElementById('userNewName').value;
        let userNewImg  = document.getElementById('userNewImg').value;

        if (userNewName !== '') {

            const newInfos = {
                name: userName,
                img : userNewImg
            };

        axios.delete('/userImg/' + fire.auth().currentUser.uid + '.json')
        .then(response => {
            console.log(response);
            axios.post('/userImg/' + fire.auth().currentUser.uid + '.json', newInfos)
                .then(response => {
                    console.log(response);
                }) 
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        })

        props.user.updateProfile({
            displayName: userNewName,
            photoURL: userNewImg
          }).then(() => {
            setUserName(userNewName);
            setPhotoURL(userNewImg);
            toast.success('Pseudo/image modifié avec succès !')
          }).catch((error) => {
            console.log(error)
          });
        }
    }

    return (
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
                    <StyledInput type='file' id='userNewImg' /><br />
                    <Button type='submit' value='Confirmer'>Confirmer</Button>
                </form>

                <StyledP>Votre pseudo actuel est : <b>{userName}</b></StyledP>
                <StyledImg 
                    src={fire.auth().currentUser.photoURL} 
                    alt='Image du profil'
                />
            </StyledManageProfileCard>
        </StyledDiv>
    );
};