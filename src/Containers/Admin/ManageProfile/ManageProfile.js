// Librairies
import React     from 'react';
import fire      from '../../../config/firebase';
import { toast } from 'react-toastify';
import styled    from 'styled-components';

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
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <StyledDiv>
            <StyledManageProfileCard>
                <StyledH2>Modifier votre profil</StyledH2>
                <form onSubmit={formHandler} method='post'>
                    <StyledInput 
                        type       = "text" 
                        placeholder= {props.user.displayName}
                        name       = "userName"
                        id         = "userName"
                        maxLength  = '18'
                        minLength  = '3'
                        autoFocus
                    /><br />
                    <StyledInput type="file" name="userImg" id="userImg"/><br />
                    <Button type='submit'  value='Confirmer'>Confirmer</Button>
                </form>

                <StyledP>Votre pseudo actuel est : <b>{userName}</b></StyledP>
                {/* <img src={userImg} alt='Image du profil'>{userImg}</img> */}
            </StyledManageProfileCard>
        </StyledDiv>
    );
};