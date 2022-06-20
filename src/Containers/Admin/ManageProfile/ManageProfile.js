// Librairies
import React     from 'react';
import fire      from '../../../config/firebase';
import { toast } from 'react-toastify';
import styled    from 'styled-components';

// Styled Components
const StyledH2 = styled.h2`
    padding: 30px;
    font-size: 2rem;
`; 

const StyledDiv = styled.div`
    background: #FCF8E8;
    height: 100%;
`;

const StyledP = styled.p`
    font-size: 1.5rem;
    padding: 30px;
`;

export default function ManageProfile(props) {

    let userName = fire.auth().currentUser.displayName;
    let userImg = fire.auth().currentUser.photoURL;


    const formHandler = event => {
        event.preventDefault();

        let userName = document.getElementById('userName').value;
        let userImg = document.getElementById('userImg').value;

        console.log(userName)

        props.user.updateProfile({
            displayName: userName,
            photoURL: userImg
          }).then(() => {
            toast.success('Pseudo/image modifié avec succès !')
            console.log(props.user.displayName)
            console.log(props.user.photoURL)
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <StyledDiv>
            <StyledH2>Modifier votre profil</StyledH2>
            <form onSubmit={formHandler} method='post'>
                <input 
                    type="text" 
                    placeholder={props.user.displayName}
                    name="userName"
                    id="userName"
                    maxLength='18'
                    minLength='3'
                    autoFocus
                />
                <input type="file" name="userImg" id="userImg"/>
                <input type='submit'  value='Confirmer' />
            </form>

            <StyledP>Votre pseudo actuel est : <b>{userName}</b></StyledP>
            {userImg}
        </StyledDiv>
    );
};