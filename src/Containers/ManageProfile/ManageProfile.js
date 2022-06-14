// Librairies
import React     from 'react';
import fire      from '../../config/firebase';
import { toast } from 'react-toastify';


export default function ManageProfile(props) {

    // Fonctions
    // const updateProfile = () => {
    //     props.user.updateProfile({
    //         displayName: "Pomme",
    //         photoURL: "https://example.com/jane-q-user/profile.jpg"
    //       }).then(() => {
    //         console.log(props.user.displayName)
    //         console.log(props.user.photoURL)
    //       }).catch((error) => {
    //         console.log(error)
    //       });
    // };

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
            console.log(props.user.displayName)
            console.log(props.user.photoURL)
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <div>
            <h2>Modifier votre profil</h2>
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

            {userName}
        </div>
    );
};